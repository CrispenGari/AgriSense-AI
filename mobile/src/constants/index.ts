export const COLORS = {
  main: "#F2EDC2",
  primary: "#9FCB98",
  secondary: "#79AE6F",
  tertiary: "#346739",
  black: "#000000",
  white: "#ffffff",
  red: "#FF0000",
  gray: "#E8EDF2",
  transparent: "transparent",
};

export const PLOT_COLORS = [
  "#281C59",
  "#4E8D9C",
  "#D97A2B",
  "#C44A3A",
  "#25671E",
  "#F075AE",
  "#36656B",
  "#F6F0D7",
  "#5B532C",
  "#253900",
];
export const Fonts = {
  "JosefinSans-Bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
  "JosefinSans-Regular": require("@/assets/fonts/JosefinSans-Regular.ttf"),
  "JosefinSans-Italic": require("@/assets/fonts/JosefinSans-Italic.ttf"),
  "JosefinSans-BoldItalic": require("@/assets/fonts/JosefinSans-BoldItalic.ttf"),
};
export const FONTS = {
  regular: "JosefinSans-Regular",
  bold: "JosefinSans-Bold",
  italic: "JosefinSans-Italic",
  boldItalic: "JosefinSans-BoldItalic",
};

export const IMAGES = {
  background: require("@/assets/images/background.png"),
  logo: require("@/assets/images/icon.png"),
};

export const STORAGE_NAME = {
  SETTINGS: "agrisenseai:settings",
  HISTORY: "agrisenseai:history",
  TIP_NOTIFICATION_FLAG_KEY: "agrisenseai:tip_flag",
  DAILY_TIP: "agrisenseai:tip",
};

export const AUDIOS = {
  diagnosing: require("@/assets/sounds/diagnosing.wav"),
  results: require("@/assets/sounds/results.wav"),
};

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};
export const APP_NAME = "AgriSense AI";

export const LANDING_MESSAGES = [
  {
    id: 1,
    image: require("@/assets/images/0.png"),
    title: "Welcome to AgriSense AI",
    message:
      "AgriSense AI is a mobile-based agricultural decision-support app that helps identify crop types and detect plant diseases using lightweight deep learning models.",
  },
  {
    id: 2,
    image: require("@/assets/images/1.png"),
    title: "Capture or Upload Leaf Images",
    message:
      "Take a photo or upload a leaf image from your device. The app sends the image to an AI-powered backend for plant identification and disease detection.",
  },
  {
    id: 3,
    image: require("@/assets/images/2.png"),
    title: "Two-Stage AI Prediction",
    message:
      "The system first identifies the crop, such as Cashew, Cassava, Maize, or Tomato, then uses the correct plant-specific model to detect the disease, pest, or healthy condition.",
  },
  {
    id: 4,
    image: require("@/assets/images/3.png"),
    title: "Explainable Crop Health Support",
    message:
      "AgriSense AI can provide Grad-CAM visual explanations to show image regions that influenced the prediction, supporting transparent and practical crop health decision-making.",
  },
];
