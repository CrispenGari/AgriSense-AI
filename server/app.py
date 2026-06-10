from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from torchvision import models
import warnings
from routers.predictCropAndDisease import predictCropAndDiseaseRouter
from models import device

warnings.filterwarnings("ignore")


def download_add_cache_models():
    print(f"🖥️ --------------- Running the models on: {device} --------------- \n")
    print(" *  DOWNLOADING AND CACHING MODELS")
    models.mobilenet_v3_large(weights=False)
    print(" *  DONNE DOWNLOADING AND CACHING MODELS")


@asynccontextmanager
async def lifespan(app: FastAPI):
    download_add_cache_models()
    yield


app = FastAPI(
    title="AgriSense AI API",
    description="API for crop identification and disease detection using deep learning.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predictCropAndDiseaseRouter)
app.mount("/api/v1/crop/storage", StaticFiles(directory="storage"), name="storage")

@app.get("/")
def root():
    return JSONResponse(
        {
            "title": "AgriSense AI API",
            "description": "API for crop identification and disease detection using deep learning.",
            "version": "1.0.0",
        },
        status_code=200,
    )
