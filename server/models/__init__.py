import torch
import os
import io
from torch.nn import functional as F
from torchvision import transforms
import numpy as np
from PIL import Image
from torchvision import models
from torch import nn
from gradcam import save_gradcam_original_cam_bbox, GradCAM
from uuid import uuid4

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

CWD = os.getcwd()

class_names_dict = {
    "Plant_Identification": ["Cashew", "Cassava", "Maize", "Tomato"],
    "Cashew": ["anthracnose", "gumosis", "healthy", "leaf miner", "red rust"],
    "Cassava": ["bacterial blight", "brown spot", "green mite", "healthy", "mosaic"],
    "Maize": [
        "fall armyworm",
        "grasshoper",
        "healthy",
        "leaf beetle",
        "leaf blight",
        "leaf spot",
        "streak virus",
    ],
    "Tomato": [
        "healthy",
        "leaf blight",
        "leaf curl",
        "septoria leaf spot",
        "verticulium wilt",
    ],
}


def load_stats(name):
    stats_path = os.path.join(CWD, "models/static", f"{name.lower()}_stats.txt")
    means = torch.zeros(3)
    stds = torch.zeros(3)
    with open(stats_path, encoding="utf8") as stats:
        for line in stats:
            records = line.split()
            word = records[0]
            if word == "means":
                means = torch.from_numpy(np.asarray(records[1:], dtype=np.float32))
            elif word == "stds":
                stds = torch.from_numpy(np.asarray(records[1:], dtype=np.float32))
    return means, stds


dataset_stats = {}
for name in [
    "cashew",
    "cassava",
    "maize",
    "plant_identification",
    "tomato",
]:
    means, stds = load_stats(name)
    dataset_stats[name] = {"means": means, "stds": stds}


def get_image_transforms(means, stds):
    image_transforms = {
        "test": transforms.Compose(
            [
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(mean=means, std=stds, inplace=False),
            ]
        )
    }
    return image_transforms


all_image_transforms = {}
for dataset_name, stats in dataset_stats.items():
    all_image_transforms[dataset_name] = get_image_transforms(
        means=stats["means"], stds=stats["stds"]
    )


def create_mobilenetv3(num_classes, mobilenetv3_path, device):
    model = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.DEFAULT)
    in_features = model.classifier[-1].in_features
    model.classifier[-1] = nn.Linear(in_features, num_classes)
    model = model.to(device)
    model.load_state_dict(torch.load(mobilenetv3_path, map_location=device))
    return model


print(" *  LOADING MODELS")
mobilenetv3_models = {}
for dataset_name, class_names in class_names_dict.items():
    OUTPUT_DIM = 1 if len(class_names) == 2 else len(class_names)
    mobilenetv3_models[dataset_name] = create_mobilenetv3(
        num_classes=OUTPUT_DIM,
        mobilenetv3_path=os.path.join(
            CWD, f"models/static/{dataset_name.lower()}_mobilenetv3.pt"
        ),
        device=device,
    )

print("\n *  LOADING MODELS COMPLETE")


def preprocess_img(img, image_transforms) -> torch.Tensor:
    """
    takes in an image path and pre process it
    """
    img = image_transforms["test"](Image.open(io.BytesIO(img)).convert("RGB"))
    return img


def replace_relu_inplace(module):
    for name, child in module.named_children():
        if isinstance(child, nn.ReLU):
            setattr(module, name, nn.ReLU(inplace=False))
        else:
            replace_relu_inplace(child)
    return module


for dataset_name, model in mobilenetv3_models.items():
    mobilenetv3_models[dataset_name] = replace_relu_inplace(model)
    mobilenetv3_models[dataset_name].to(device).eval()


gradcam_objects = {}
for dataset_name, model in mobilenetv3_models.items():
    target_layer = model.features[-2]
    gradcam_objects[dataset_name] = GradCAM(model, target_layer)


def predict_with_model(
    model,
    image,
    transform,
    class_names,
    device,
    filename_prefix: str,
    model_name: str,
    explain: bool = True,
):
    """
    Predict a class using one MobileNetV3 model.
    Used for both plant identification and plant-specific disease detection.
    """
    model.eval()
    image_tensor = preprocess_img(image, transform)
    original_tensor_image = image_tensor

    image_tensor = image_tensor.unsqueeze(0).to(device)
    with torch.no_grad():
        logits = model(image_tensor)
        probs = F.softmax(logits, dim=1).cpu().numpy().squeeze()
    predicted_label = int(np.argmax(probs))
    if explain:
        _explanation = save_gradcam_original_cam_bbox(
            original_tensor_image,
            predicted_label,
            gradcam_objects[model_name],
            device,
            save_dir=os.path.join(CWD, "storage"),
            filename_prefix=filename_prefix,
        )

    predictions = [
        {
            "label": i,
            "class_label": class_names[i],
            "probability": float(np.round(probs[i], 4)),
        }
        for i in range(len(probs))
    ]

    top_prediction = {
        "label": predicted_label,
        "class_label": class_names[predicted_label],
        "probability": float(np.round(probs[predicted_label], 4)),
    }
    return {"top_prediction": top_prediction, "predictions": predictions}


plant_model = mobilenetv3_models["Plant_Identification"]

disease_models = {
    "Cashew": mobilenetv3_models["Cashew"],
    "Cassava": mobilenetv3_models["Cassava"],
    "Maize": mobilenetv3_models["Maize"],
    "Tomato": mobilenetv3_models["Tomato"],
}


def predict_crop_and_disease(
    image_path,
    plant_model,
    disease_models,
    all_image_transforms,
    class_names_dict,
    device,
    explain: bool = True,
):
    """
    Full two-stage prediction pipeline:
    Input Image
        → Plant Identification Model
        → Plant-Specific Disease Model
        → Final Disease/Pest/Healthy Prediction
    """
    image_id = str(uuid4())
    plant_result = predict_with_model(
        model=plant_model,
        image=image_path,
        transform=all_image_transforms["plant_identification"],
        class_names=class_names_dict["Plant_Identification"],
        device=device,
        model_name="Plant_Identification",
        filename_prefix=f"{'Plant_Identification'.lower()}_{image_id}",
        explain=explain,
    )
    predicted_plant = plant_result["top_prediction"]["class_label"]
    disease_model = disease_models[predicted_plant]
    disease_result = predict_with_model(
        model=disease_model,
        image=image_path,
        transform=all_image_transforms[predicted_plant.lower()],
        class_names=class_names_dict[predicted_plant],
        device=device,
        model_name=predicted_plant,
        filename_prefix=f"{predicted_plant.lower()}_{image_id}",
        explain=explain,
    )

    return {
        "plant_prediction": plant_result["top_prediction"],
        "plant_probabilities": plant_result["predictions"],
        "disease_prediction": disease_result["top_prediction"],
        "disease_probabilities": disease_result["predictions"],
        "pipeline": {
            "predicted_plant": predicted_plant,
            "selected_disease_model": f"{predicted_plant} MobileNetV3",
        },
        "explanation": {
            "gradcam": f"{image_id}_gradcam.png",
            "bbox": f"{image_id}_bbox.png",
            "original": f"{image_id}_original.png",
        }
        if explain
        else None,
    }
