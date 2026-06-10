from pathlib import Path
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

IMAGE_DIR = Path("images")

SUPPORTED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".bmp"
}

EXPECTED_CROPS = {
    "cashew": "Cashew",
    "cassava": "Cassava",
    "maize": "Maize",
    "tomato": "Tomato",
}


class TestAPI:
    def test_root(self):
        res = client.get("/")

        assert res.status_code == 200
        assert res.json() == {
            "title": "AgriSense AI API",
            "description": "API for crop identification and disease detection using deep learning.",
            "version": "1.0.0",
        }

    def test_prediction_without_image(self):
        res = client.post("/api/v1/crop/predict")

        assert res.status_code == 422

    def test_all_crop_predictions_without_explanation(self):
        for crop_folder, expected_crop_name in EXPECTED_CROPS.items():
            crop_dir = IMAGE_DIR / crop_folder

            assert crop_dir.exists(), f"Missing image folder: {crop_dir}"

            image_paths = [
                path for path in crop_dir.iterdir()
                if path.is_file() and path.suffix.lower() in SUPPORTED_IMAGE_EXTENSIONS
            ]

            assert len(image_paths) > 0, f"No test images found in {crop_dir}"

            for image_path in image_paths:
                with open(image_path, "rb") as image:
                    files = {
                        "image": (
                            image_path.name,
                            image,
                            "image/jpeg"
                        )
                    }

                    res = client.post(
                        "/api/v1/crop/predict",
                        files=files
                    )

                data = res.json()

                assert res.status_code == 200, f"Failed on image: {image_path}"
                assert data["ok"] is True
                assert data["status"] == "ok"

                assert "time" in data
                assert "size" in data
                assert "prediction" in data

                prediction = data["prediction"]

                assert "plant_prediction" in prediction
                assert "plant_probabilities" in prediction
                assert "disease_prediction" in prediction
                assert "disease_probabilities" in prediction
                assert "pipeline" in prediction
                assert "explanation" in prediction

                assert prediction["plant_prediction"]["class_label"] == expected_crop_name
                assert prediction["pipeline"]["predicted_plant"] == expected_crop_name
                assert (
                    prediction["pipeline"]["selected_disease_model"]
                    == f"{expected_crop_name} MobileNetV3"
                )

                assert prediction["disease_prediction"]["class_label"] is not None
                assert prediction["disease_prediction"]["probability"] >= 0
                assert prediction["disease_prediction"]["probability"] <= 1

                assert prediction["explanation"] is None

    def test_all_crop_predictions_with_explanation(self):
        for crop_folder, expected_crop_name in EXPECTED_CROPS.items():
            crop_dir = IMAGE_DIR / crop_folder

            assert crop_dir.exists(), f"Missing image folder: {crop_dir}"

            image_paths = [
                path for path in crop_dir.iterdir()
                if path.is_file() and path.suffix.lower() in SUPPORTED_IMAGE_EXTENSIONS
            ]

            assert len(image_paths) > 0, f"No test images found in {crop_dir}"

            for image_path in image_paths:
                with open(image_path, "rb") as image:
                    files = {
                        "image": (
                            image_path.name,
                            image,
                            "image/jpeg"
                        )
                    }

                    form_data = {
                        "explain": "true"
                    }

                    res = client.post(
                        "/api/v1/crop/predict",
                        files=files,
                        data=form_data
                    )

                data = res.json()

                assert res.status_code == 200, f"Failed on image: {image_path}"
                assert data["ok"] is True
                assert data["status"] == "ok"

                prediction = data["prediction"]

                assert prediction["plant_prediction"]["class_label"] == expected_crop_name
                assert prediction["pipeline"]["predicted_plant"] == expected_crop_name
                assert (
                    prediction["pipeline"]["selected_disease_model"]
                    == f"{expected_crop_name} MobileNetV3"
                )

                assert prediction["disease_prediction"]["class_label"] is not None
                assert prediction["disease_prediction"]["probability"] >= 0
                assert prediction["disease_prediction"]["probability"] <= 1

                assert prediction["explanation"] is not None
                assert "original" in prediction["explanation"]
                assert "gradcam" in prediction["explanation"]
                assert "bbox" in prediction["explanation"]

                assert prediction["explanation"]["original"].endswith(".png")
                assert prediction["explanation"]["gradcam"].endswith(".png")
                assert prediction["explanation"]["bbox"].endswith(".png")