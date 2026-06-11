import torch
from torch.nn import functional as F
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import os


class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.activations = None
        self.gradients = None

        self.fwd_hook = target_layer.register_forward_hook(self.save_activations)
        self.bwd_hook = target_layer.register_full_backward_hook(self.save_gradients)

    def save_activations(self, module, inp, out):
        self.activations = out.detach().clone()

    def save_gradients(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach().clone()

    def generate(self, x, class_idx=None):
        self.model.eval()
        self.model.zero_grad(set_to_none=True)
        output = self.model(x)
        if isinstance(output, tuple):
            output = output[0]

        if class_idx is None:
            class_idx = output.argmax(dim=1).item()

        if isinstance(class_idx, torch.Tensor):
            class_idx = int(class_idx.detach().cpu().item())

        if output.shape[1] == 1:
            if class_idx == 1:
                score = output[:, 0].sum()
            else:
                score = (-output[:, 0]).sum()
        else:
            score = output[:, class_idx].sum()
        score.backward(retain_graph=True)

        if self.activations is None:
            raise RuntimeError(
                "Activations were not captured. Check the selected target layer."
            )

        if self.gradients is None:
            raise RuntimeError(
                "Gradients were not captured. Check the selected target layer."
            )

        grads = self.gradients[0]  # [C, H, W]
        acts = self.activations[0]  # [C, H, W]

        weights = grads.mean(dim=(1, 2), keepdim=True)  # [C, 1, 1]

        cam = (weights * acts).sum(dim=0)
        cam = F.relu(cam)

        cam_min = cam.min()
        cam_max = cam.max()

        cam = (cam - cam_min) / (cam_max - cam_min + 1e-8)

        return cam.detach().cpu().numpy(), class_idx

    def remove_hooks(self):
        self.fwd_hook.remove()
        self.bwd_hook.remove()


def tensor_to_numpy_image(image):
    """
    Convert a PyTorch tensor image to a NumPy image for plotting.
    Supports image tensors in shape:
    - [C, H, W]
    - [H, W, C]
    """
    if isinstance(image, torch.Tensor):
        image = image.detach().cpu()

    if image.ndim == 3:
        if image.shape[0] in [1, 3]:
            image = image.permute(1, 2, 0)
    image = image.numpy() if isinstance(image, torch.Tensor) else image
    image = image.astype(np.float32)
    image = (image - image.min()) / (image.max() - image.min() + 1e-8)
    if image.ndim == 3 and image.shape[-1] == 1:
        image = image.squeeze(-1)
    return image


def resize_cam_to_image(cam, image):
    """
    Resize a Grad-CAM heatmap to match the image height and width.
    """
    if isinstance(cam, torch.Tensor):
        cam = cam.detach().cpu().float()
    cam = np.array(cam, dtype=np.float32)
    if isinstance(image, torch.Tensor):
        if image.ndim == 3:
            h, w = image.shape[-2], image.shape[-1]
        else:
            h, w = image.shape
    else:
        h, w = image.shape[:2]

    if cam.shape != (h, w):
        cam_tensor = torch.tensor(cam).unsqueeze(0).unsqueeze(0)
        cam_tensor = F.interpolate(
            cam_tensor, size=(h, w), mode="bilinear", align_corners=False
        )
        cam = cam_tensor.squeeze().numpy()
    cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
    return cam


def gradcam_bbox(cam, threshold=0.55):
    """
    Generate a bounding box around the most activated Grad-CAM region.
    """
    mask = cam >= threshold
    if mask.sum() == 0:
        return None
    y_indices, x_indices = np.where(mask)
    x_min = x_indices.min()
    x_max = x_indices.max()
    y_min = y_indices.min()
    y_max = y_indices.max()
    return x_min, y_min, x_max, y_max


def predict_multiclass(model, x):
    """
    Predict the class label and confidence score for a multi-class model.
    """
    model.eval()
    with torch.no_grad():
        output = model(x)
        if isinstance(output, tuple):
            output = output[0]
        probs = torch.softmax(output, dim=1)
        pred = torch.argmax(probs, dim=1).item()
        prob = torch.max(probs, dim=1).values.item()
    return pred, prob


def save_gradcam_original_cam_bbox(
    image,
    pred_label,
    gradcam,
    device,
    save_dir,
    filename_prefix="sample",
    show_bbox=True,
    bbox_threshold=0.55,
    overlay_threshold=0.25,
    dpi=300,
):
    if isinstance(image, torch.Tensor):
        x = image.unsqueeze(0).to(device)
    else:
        x = torch.tensor(image).permute(2, 0, 1).unsqueeze(0).float().to(device)
    cam, _ = gradcam.generate(x, class_idx=pred_label)

    img = tensor_to_numpy_image(image)
    cam = resize_cam_to_image(cam, image)

    original_path = os.path.join(
        save_dir, "original", f"{filename_prefix}_original.png"
    )
    gradcam_path = os.path.join(save_dir, "gradcam", f"{filename_prefix}_gradcam.png")
    overlay_path = os.path.join(save_dir, "bbox", f"{filename_prefix}_bbox.png")
    plt.imsave(original_path, img)
    plt.imsave(gradcam_path, cam, cmap="jet")

    fig, ax = plt.subplots(figsize=(4, 4), dpi=dpi)
    ax.imshow(img)

    cam_masked = np.ma.masked_where(cam < overlay_threshold, cam)
    ax.imshow(cam_masked, cmap="jet", alpha=0.6)

    bbox = None
    if show_bbox:
        bbox = gradcam_bbox(cam, threshold=bbox_threshold)
        if bbox is not None:
            x_min, y_min, x_max, y_max = bbox
            rect = patches.Rectangle(
                (x_min, y_min),
                x_max - x_min,
                y_max - y_min,
                linewidth=2,
                edgecolor="yellow",
                facecolor="none",
            )
            ax.add_patch(rect)

    ax.axis("off")
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)
    plt.savefig(overlay_path, dpi=dpi, bbox_inches="tight", pad_inches=0)
    plt.close(fig)

    return {
        "original": str(original_path),
        "gradcam": str(gradcam_path),
        "overlay_bbox": str(overlay_path),
        "bbox": bbox,
    }
