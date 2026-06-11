from fastapi import APIRouter, File, Form
from fastapi.responses import JSONResponse
from typing import Annotated
from models import (
    predict_crop_and_disease,
    device,
    plant_model,
    disease_models,
    all_image_transforms,
    class_names_dict,
)
from utils import get_image_size
import time
from uuid import uuid4

predictCropAndDiseaseRouter = APIRouter(prefix="/api/v1/crop")

@predictCropAndDiseaseRouter.post("/predict")
def predict_crop(
    image: Annotated[bytes, File()],
    explain: Annotated[bool, Form()] = False
):
    start = time.monotonic()
    try:
        prediction = predict_crop_and_disease(
            image,
            plant_model,
            disease_models,
            all_image_transforms,
            class_names_dict,
            device,
            explain = bool(explain)
        )
        return JSONResponse(
            {
                "time": time.monotonic() - start,
                "ok": True,
                "status": "ok",
                "prediction": prediction,
                "size":  get_image_size(image),
                "id": str(uuid4())
                
            },
            status_code=200,
        )
    except Exception:
        JSONResponse(
            {
                "time": time.monotonic() - start,
                "ok": False,
                "field": "server",
                "status": "error",
                "message": "Internal Server Error.",
            },
            status_code=500,
        )
