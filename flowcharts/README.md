## 1. Full System Architecture

```shell
flowchart TD
    A[User opens AgriSense AI mobile app] --> B[Capture or upload leaf image]
    B --> C[Mobile app prepares multipart form data]
    C --> D{Explainable AI enabled?}

    D -- No --> E[Send image to FastAPI endpoint]
    D -- Yes --> F[Send image + explain=true to FastAPI endpoint]

    E --> G[FastAPI backend receives image]
    F --> G

    G --> H[Preprocess image]
    H --> I[Plant Identification MobileNetV3]

    I --> J{Predicted crop}
    J -- Cashew --> K[Cashew Disease MobileNetV3]
    J -- Cassava --> L[Cassava Disease MobileNetV3]
    J -- Maize --> M[Maize Disease MobileNetV3]
    J -- Tomato --> N[Tomato Disease MobileNetV3]

    K --> O[Disease / pest / healthy prediction]
    L --> O
    M --> O
    N --> O

    O --> P{Explainable AI requested?}
    P -- No --> Q[Return plant prediction, disease prediction, confidence scores]
    P -- Yes --> R[Generate Grad-CAM heatmap, bbox image, original image]
    R --> S[Store explanation images in server storage]
    S --> T[Return predictions + explanation image filenames]

    Q --> U[Mobile app displays crop health results]
    T --> U
    U --> V{Save history enabled?}
    V -- Yes --> W[Save prediction to local history]
    V -- No --> X[End]
    W --> X
```

## 2. Two-Stage AI Prediction Pipeline

```shell
flowchart LR
    A[Input leaf image] --> B[Image preprocessing]
    B --> C[Stage 1: Plant Identification MobileNetV3]
    C --> D{Crop identified}

    D -- Cashew --> E[Stage 2: Cashew disease model]
    D -- Cassava --> F[Stage 2: Cassava disease model]
    D -- Maize --> G[Stage 2: Maize disease model]
    D -- Tomato --> H[Stage 2: Tomato disease model]

    E --> I[Classify disease / pest / healthy]
    F --> I
    G --> I
    H --> I

    I --> J[Prediction confidence scores]
    J --> K[Final crop health result]
```

## 3. Notebook Training Workflow

```shell
flowchart TD
    A[Start notebook] --> B[Set seed and device]
    B --> C[Load CCMT Raw Data]
    C --> D[Clean unsupported or corrupted images]
    D --> E[Create Plant Identification dataset]

    E --> F[Count class distribution]
    F --> G[Compute class weights]
    G --> H[Compute dataset-specific RGB means and standard deviations]
    H --> I[Create image transforms per dataset]

    I --> J[Load datasets with ImageFolder]
    J --> K[Split into train, validation, and test sets]
    K --> L[Create DataLoaders]

    L --> M[Create MobileNetV3 models]
    M --> N[Modify classifier output layer per dataset]
    N --> O[Define weighted CrossEntropyLoss and Adam optimizer]

    O --> P[Train Plant Identification model]
    O --> Q[Train Cashew disease model]
    O --> R[Train Cassava disease model]
    O --> S[Train Maize disease model]
    O --> T[Train Tomato disease model]

    P --> U[Save best checkpoints]
    Q --> U
    R --> U
    S --> U
    T --> U

    U --> V[Evaluate best checkpoints on test sets]
    V --> W[Compute accuracy, loss, inference time]
    W --> X[Generate confusion matrices and classification reports]
    X --> Y[Analyze misclassified samples]
    Y --> Z[Apply Grad-CAM explanations]
```

## 4. Dataset Preparation Flow

```shell
flowchart TD
    A[Raw Data folder] --> B[Crop folders]
    B --> C[Cashew disease classes]
    B --> D[Cassava disease classes]
    B --> E[Maize disease and pest classes]
    B --> F[Tomato disease classes]

    C --> G[Clean unsupported images]
    D --> G
    E --> G
    F --> G

    G --> H[Plant-specific disease datasets remain unchanged]
    G --> I[Create Plant Identification dataset]

    I --> J[Copy all Cashew images into Plant_Identification/Cashew]
    I --> K[Copy all Cassava images into Plant_Identification/Cassava]
    I --> L[Copy all Maize images into Plant_Identification/Maize]
    I --> M[Copy all Tomato images into Plant_Identification/Tomato]

    H --> N[Train disease models]
    I --> O[Train plant identification model]
```

## 5. Model Training and Evaluation Flow

```shell
flowchart TD
    A[Dataset] --> B[Train / validation / test split]
    B --> C[Training DataLoader]
    B --> D[Validation DataLoader]
    B --> E[Test DataLoader]

    C --> F[MobileNetV3 model]
    D --> F

    F --> G[Forward pass]
    G --> H[Weighted CrossEntropyLoss]
    H --> I[Backward pass]
    I --> J[Adam optimizer update]

    J --> K[Record train loss and accuracy]
    D --> L[Evaluate validation loss and accuracy]
    L --> M{Validation loss improved?}

    M -- Yes --> N[Save best checkpoint]
    M -- No --> O[Continue training]

    N --> O
    O --> P{More epochs?}
    P -- Yes --> G
    P -- No --> Q[Load best checkpoint]

    Q --> R[Test set evaluation]
    R --> S[Accuracy, loss, inference time]
    S --> T[Wilson score confidence intervals]
    T --> U[Confusion matrix]
    U --> V[Classification report]
    V --> W[Misclassified samples]
    W --> X[Grad-CAM interpretation]
```

## 6. FastAPI Server Inference Flow

```shell
flowchart TD
    A[POST /api/v1/crop/predict] --> B[Receive image file]
    B --> C[Read image bytes]
    C --> D[Convert image to RGB]
    D --> E[Run plant identification transform]
    E --> F[Plant Identification MobileNetV3]

    F --> G[Plant probabilities]
    G --> H[Select top plant class]

    H --> I{Predicted plant}
    I -- Cashew --> J[Load / use Cashew MobileNetV3]
    I -- Cassava --> K[Load / use Cassava MobileNetV3]
    I -- Maize --> L[Load / use Maize MobileNetV3]
    I -- Tomato --> M[Load / use Tomato MobileNetV3]

    J --> N[Run disease prediction]
    K --> N
    L --> N
    M --> N

    N --> O[Disease probabilities]
    O --> P[Select top disease / pest / healthy class]

    P --> Q{explain == true?}
    Q -- No --> R[Return JSON response with explanation=null]
    Q -- Yes --> S[Generate Grad-CAM for plant prediction]
    Q -- Yes --> T[Generate Grad-CAM for disease prediction]
    S --> U[Save explanation images]
    T --> U
    U --> V[Return JSON response with explanation filenames]
```

## 7. Mobile App User Flow

```shell
flowchart TD
    A[Open AgriSense AI] --> B{First launch?}
    B -- Yes --> C[View onboarding screens]
    C --> D[Accept Terms and Privacy Policy]
    B -- No --> E[Home screen]
    D --> E

    E --> F[View tip of the day]
    E --> G[Check Plant Health]
    E --> H[Open History]
    E --> I[Open Settings]

    G --> J[Select image from gallery or camera]
    J --> K[Preview selected leaf image]
    K --> L{Explainable AI enabled?}
    L -- Yes --> M[Send image + explain=true]
    L -- No --> N[Send image only]

    M --> O[Wait for API response]
    N --> O

    O --> P[Show crop health results]
    P --> Q[Show plant prediction chart]
    P --> R[Show disease prediction chart]
    P --> S[Show prediction summary]

    S --> T{Explanation available?}
    T -- Yes --> U[View Grad-CAM explanation modal]
    T -- No --> V[Prompt user to enable Explainable AI]

    P --> W{Save history enabled?}
    W -- Yes --> X[Save result locally]
    W -- No --> Y[Do not save result]

    X --> Z[Scan another leaf]
    Y --> Z
```

## 8. Grad-CAM Explanation Flow

```shell
flowchart TD
    A[Prediction completed] --> B{Explainable AI enabled?}
    B -- No --> C[Return predictions only]
    B -- Yes --> D[Select predicted class index]

    D --> E[Forward pass through MobileNetV3]
    E --> F[Capture target layer activations]
    F --> G[Backward pass for predicted class score]
    G --> H[Capture gradients]
    H --> I[Compute channel weights]
    I --> J[Generate Grad-CAM heatmap]
    J --> K[Resize heatmap to image size]
    K --> L[Create heatmap image]
    K --> M[Create overlay with bounding box]
    K --> N[Save original image]

    L --> O[Store gradcam.png]
    M --> P[Store bbox.png]
    N --> Q[Store original.png]

    O --> R[Return explanation filenames]
    P --> R
    Q --> R

    R --> S[Mobile app displays explanation images]
```

## 9. Prediction History Flow

```shell
flowchart TD
    A[Prediction response received] --> B{Save History setting enabled?}
    B -- No --> C[Do not persist result]
    B -- Yes --> D[Prepare history item]

    D --> E[Store leaf image URI]
    D --> F[Store plant prediction]
    D --> G[Store disease prediction]
    D --> H[Store confidence scores]
    D --> I[Store timestamp]
    D --> J[Store explanation filenames if available]

    E --> K[Save to local app storage]
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K

    K --> L[Display in recent history]
    L --> M[Open full history screen]
    M --> N{User clears history?}
    N -- Yes --> O[Delete saved predictions]
    N -- No --> P[Keep history]
```

## 10. Mobile and Server Communication Flow

```shell
sequenceDiagram
    participant U as User
    participant M as Mobile App
    participant API as FastAPI Server
    participant PM as Plant Model
    participant DM as Disease Model
    participant G as Grad-CAM Module
    participant S as Storage

    U->>M: Selects or captures leaf image
    M->>API: POST /api/v1/crop/predict with image and explain flag
    API->>PM: Run plant identification
    PM-->>API: Plant probabilities and top crop
    API->>DM: Route image to crop-specific disease model
    DM-->>API: Disease probabilities and top disease class

    alt explain=true
        API->>G: Generate Grad-CAM explanations
        G->>S: Save original, heatmap, and bbox images
        S-->>API: Return explanation filenames
    else explain=false
        API-->>API: Set explanation to null
    end

    API-->>M: Return prediction JSON
    M-->>U: Display crop health results
```
