export interface TPrediction {
  plant_prediction: TPlantprediction;
  plant_probabilities: TPlantprediction[];
  disease_prediction: TPlantprediction;
  disease_probabilities: TPlantprediction[];
  pipeline: TPipeline;
  explanation: TExplanation;
}

export interface TExplanation {
  gradcam: string;
  bbox: string;
  original: string;
}

export interface TPipeline {
  predicted_plant: string;
  selected_disease_model: string;
}

export interface TPlantprediction {
  label: number;
  class_label: string;
  probability: number;
}

export interface TInferenceResponse {
  time: number;
  ok: boolean;
  status: string;
  prediction: TPrediction;
  size: string;
  id: string;
}

export type THistory = TInferenceResponse & {
  date: Date;
  uri: string;
};
