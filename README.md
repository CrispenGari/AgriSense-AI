# 🌿 AgriSense AI

**Mobile-Based Plant Identification and Crop Disease Detection System**

<p align="center">
  <img src="/screenshots/0.png" width="220" alt="AgriSense AI splash screen">
</p>

AgriSense AI is a mobile-based agricultural decision-support system that uses deep learning to identify crop types and detect possible plant diseases, pest damage, or healthy conditions from leaf images. The system follows a two-stage prediction pipeline: first, it identifies the crop, and then it routes the image to the correct crop-specific disease detection model.

The project is designed to support farmers, students, agricultural extension workers, researchers, and smart agriculture solutions by making crop health assessment faster, more accessible, and more explainable through a mobile interface.

<p align="center">
  <a href="https://typescriptlang.org/">
    <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="Language: TypeScript">
  </a>
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/language-Python-blue.svg" alt="Language: Python">
  </a>
  <a href="https://fastapi.tiangolo.com/">
    <img src="https://img.shields.io/badge/API-FastAPI-green.svg" alt="FastAPI">
  </a>
  <a href="https://pytorch.org/">
    <img src="https://img.shields.io/badge/model-PyTorch-orange.svg" alt="PyTorch">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License: MIT">
  </a>
    <a href="https://github.com/crispengari/AgriSense-AI/actions/workflows/ci.yml">
    <img src="https://github.com/crispengari/AgriSense-AI/actions/workflows/ci.yml/badge.svg" alt="CI Status">
  </a>
</p>

## 📌 Repository Structure

This repository contains two main sub-projects:

1. **`mobile`** – The React Native/Expo mobile application used to capture or upload leaf images, send prediction requests, display crop health results, show prediction history, and view Grad-CAM explanations.
2. **`server`** – The FastAPI backend that loads the trained MobileNetV3 models, performs crop identification, runs crop-specific disease detection, generates optional Grad-CAM explanations, and serves prediction results to the mobile app.

```text
AgriSense AI/
├── mobile/
│   └── React Native / Expo mobile application
├── server/
│   └── FastAPI prediction server
├── screenshots/
│   └── App screenshots used in this README
├── LICENSE
└── README.md
```

## 🧠 Prediction Pipeline

AgriSense AI uses a two-stage model pipeline:

```text
Input Leaf Image
        ↓
Plant Identification Model
        ↓
Crop-Specific Disease Detection Model
        ↓
Disease / Pest / Healthy Prediction
        ↓
Confidence Scores + Optional Grad-CAM Explanation
```

The first model identifies the crop type:

- Cashew
- Cassava
- Maize
- Tomato

After identifying the crop, the system automatically selects the correct crop-specific disease model.

| Predicted Crop | Selected Model              |
| -------------- | --------------------------- |
| Cashew         | Cashew Disease MobileNetV3  |
| Cassava        | Cassava Disease MobileNetV3 |
| Maize          | Maize Disease MobileNetV3   |
| Tomato         | Tomato Disease MobileNetV3  |

## ✨ Key Features

- 📷 Capture or upload crop leaf images
- 🌿 Identify crop type automatically
- 🦠 Detect disease, pest damage, or healthy condition
- 📊 Display prediction confidence scores
- 🔍 Optional Grad-CAM visual explanations
- 🧠 Two-stage AI prediction workflow
- 🕘 Save and view prediction history
- ⚙️ Settings for haptics, sound, notifications, explainable AI, and history
- 🌐 FastAPI backend for model inference
- 📱 Mobile-first design for practical field use

## 📱 Mobile App Preview

The screenshots below are located in the [`screenshots`](./screenshots) folder.

### Launch and Onboarding

The app introduces AgriSense AI, explains the image upload workflow, describes the two-stage AI prediction process, and highlights explainable crop health support.

<p align="center">
  <img src="/screenshots/0.png" alt="Splash screen" width="185"/>
  <img src="/screenshots/1.png" alt="Welcome screen" width="185"/>
  <img src="/screenshots/2.png" alt="Capture or upload onboarding screen" width="185"/>
  <img src="/screenshots/3.png" alt="Two-stage AI prediction onboarding screen" width="185"/>
  <img src="/screenshots/4.png" alt="Explainable AI onboarding screen" width="185"/>
</p>

### Home and Settings

The home screen provides quick access to crop health prediction, recent history, and daily crop health tips. The settings screen allows users to manage preferences such as haptics, in-app sounds, notifications, explainable AI, and saved history.

<p align="center">
  <img src="/screenshots/5.png" alt="Home screen with tip of the day" width="195"/>
  <img src="/screenshots/6.png" alt="Settings preferences" width="195"/>
  <img src="/screenshots/7.png" alt="Settings support and legal options" width="195"/>
</p>

### Leaf Image Selection and Prediction

Users can select a leaf image from their device or capture a live photo using the camera. When explainable AI is enabled, the backend also returns Grad-CAM explanation images.

<p align="center">
  <img src="/screenshots/8.png" alt="Predict crop health screen" width="195"/>
  <img src="/screenshots/9.png" alt="Gallery image picker" width="195"/>
  <img src="/screenshots/10.png" alt="Selected leaf image with explain toggle" width="195"/>
</p>

### Crop Health Results

The results screen shows the uploaded leaf image, plant prediction, disease or pest prediction, confidence scores, and a summary of the model output.

<p align="center">
  <img src="/screenshots/11.png" alt="Crop health results plant prediction" width="195"/>
  <img src="/screenshots/12.png" alt="Disease prediction chart" width="195"/>
  <img src="/screenshots/13.png" alt="Prediction summary" width="195"/>
</p>

### Grad-CAM Explanations and Crop Guidance

When explainable AI is enabled, the app displays Grad-CAM heatmaps, bounding-box visualizations, and the original image. It also provides crop and disease explanation content to help users interpret the prediction.

<p align="center">
  <img src="/screenshots/14.png" alt="Grad-CAM explanation modal" width="195"/>
  <img src="/screenshots/15.png" alt="Crop and prediction guidance screen" width="195"/>
</p>

### Prediction History

Users can save and review previous crop health predictions from the history screen.

<p align="center">
  <img src="/screenshots/16.png" alt="Recent history on home screen" width="195"/>
  <img src="/screenshots/17.png" alt="History screen" width="195"/>
</p>

## 🧪 Supported Classes

### Plant Identification Classes

```ts
["Cashew", "Cassava", "Maize", "Tomato"];
```

### Disease and Pest Classes

| Crop    | Classes                                                                               |
| ------- | ------------------------------------------------------------------------------------- |
| Cashew  | anthracnose, gumosis, healthy, leaf miner, red rust                                   |
| Cassava | bacterial blight, brown spot, green mite, healthy, mosaic                             |
| Maize   | fall armyworm, grasshoper, healthy, leaf beetle, leaf blight, leaf spot, streak virus |
| Tomato  | healthy, leaf blight, leaf curl, septoria leaf spot, verticulium wilt                 |

> The class names are kept consistent with the trained model labels to preserve class-index mapping.

## 🛠️ Technology Stack

| Layer              | Technology                                     |
| ------------------ | ---------------------------------------------- |
| Mobile App         | React Native, Expo, TypeScript                 |
| Backend API        | FastAPI, Python                                |
| Deep Learning      | PyTorch, TorchVision                           |
| Model Architecture | MobileNetV3                                    |
| Explainability     | Grad-CAM                                       |
| Image Processing   | PIL, NumPy                                     |
| Testing            | Pytest                                         |
| Storage            | Local storage for uploaded and Grad-CAM images |

## 🚀 Getting Started

Clone the repository:

```shell
git clone https://github.com/YOUR_USERNAME/AgriSense-AI.git
cd AgriSense-AI
```

## 🖥️ Running the Server

Navigate to the server directory:

```shell
cd server
```

Install dependencies:

```shell
pip install -r requirements.txt
```

Start the FastAPI server:

```shell
uvicorn app:app --host 0.0.0.0 --port 8000
```

The API will be available locally at:

```shell
http://127.0.0.1:8000
```

To access the API from another device on the same network, use your machine's local IPv4 address:

```shell
http://192.168.1.50:8000
```

## 📲 Running the Mobile App

Navigate to the mobile directory:

```shell
cd mobile
```

Install dependencies:

```shell
npm install
```

Start the Expo development server:

```shell
npx expo start
```

Make sure the mobile app points to the correct server base URL. For physical devices, use your computer's network IP address instead of `127.0.0.1`.

Example:

```ts
const SERVER_BASE_URL = "http://192.168.1.50:8000/api/v1/crop";
```

## 📡 API Usage

### Predict Crop and Disease

```http
POST /api/v1/crop/predict
```

### Request Fields

| Field     | Type    | Required | Description                                           |
| --------- | ------- | -------- | ----------------------------------------------------- |
| `image`   | File    | Yes      | Leaf image to classify                                |
| `explain` | Boolean | No       | Set to `true` to generate Grad-CAM explanation images |

### Prediction Without Grad-CAM

```shell
curl -X POST \\
  -F image=@maize_leaf.jpg \\
  http://127.0.0.1:8000/api/v1/crop/predict
```

### Prediction With Grad-CAM

```shell
curl -X POST \\
  -F image=@maize_leaf.jpg \\
  -F explain=true \\
  http://127.0.0.1:8000/api/v1/crop/predict
```

## ✅ Example API Response

```json
{
  "time": 1.3611246000000392,
  "ok": true,
  "status": "ok",
  "prediction": {
    "plant_prediction": {
      "label": 2,
      "class_label": "Maize",
      "probability": 1.0
    },
    "disease_prediction": {
      "label": 1,
      "class_label": "grasshoper",
      "probability": 1.0
    },
    "pipeline": {
      "predicted_plant": "Maize",
      "selected_disease_model": "Maize MobileNetV3"
    },
    "explanation": {
      "gradcam": "maize_example_gradcam.png",
      "bbox": "maize_example_bbox.png",
      "original": "maize_example_original.png"
    }
  },
  "size": "54.46 KB"
}
```

## 🔍 Accessing Grad-CAM Images

When `explain=true`, the server saves explanation images and returns their filenames. These images can be accessed through the storage endpoint:

```shell
BASE_URL/api/v1/crop/storage/gradcam/FILENAME
```

Example:

```shell
http://127.0.0.1:8000/api/v1/crop/storage/gradcam/maize_example_gradcam.png
```

| Image Type | Description                                |
| ---------- | ------------------------------------------ |
| `original` | The uploaded image used for prediction     |
| `gradcam`  | Grad-CAM heatmap showing activated regions |
| `bbox`     | Grad-CAM-based bounding-box visualization  |

## 🧬 Dataset

The models were trained using crop leaf images organized by crop and disease/pest class. The project uses the original **Raw Data** images without augmented samples for training and evaluation.

Expected dataset structure:

```text
Raw Data/
├── Cashew/
│   ├── anthracnose/
│   ├── gumosis/
│   ├── healthy/
│   ├── leaf miner/
│   └── red rust/
├── Cassava/
│   ├── bacterial blight/
│   ├── brown spot/
│   ├── green mite/
│   ├── healthy/
│   └── mosaic/
├── Maize/
│   ├── fall armyworm/
│   ├── grasshoper/
│   ├── healthy/
│   ├── leaf beetle/
│   ├── leaf blight/
│   ├── leaf spot/
│   └── streak virus/
└── Tomato/
    ├── healthy/
    ├── leaf blight/
    ├── leaf curl/
    ├── septoria leaf spot/
    └── verticulium wilt/
```

A separate plant identification dataset is created by grouping images by crop:

```text
Plant Identification/
├── Cashew/
├── Cassava/
├── Maize/
└── Tomato/
```

## 🧾 Testing

Run server tests from the `server` directory:

```shell
pytest
```

For verbose output:

```shell
pytest -s -vv
```

## 🧹 Git Ignore Notes

Generated images inside nested `storage` folders can be ignored using:

```gitignore
storage/**/*.jpg
storage/**/*.jpeg
storage/**/*.png
storage/**/*.webp
storage/**/*.bmp
```

This keeps uploaded images and Grad-CAM outputs out of Git while preserving the folder structure if needed.

## ⚠️ Important Note

AgriSense AI is intended for agricultural decision support. It does not replace expert agronomic advice, laboratory testing, or professional plant disease diagnosis. Predictions should be interpreted together with field inspection, local extension guidance, and crop management knowledge.

## Notebooks

The notebook for training the models can be found [here](https://github.com/CrispenGari/cv-torch/tree/main/22_CCMT_TWO_STAGE_PLANT_DISEASE).

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
