import { ReactNativeFile } from "apollo-upload-client";
import { SERVER_BASE_URL } from "../constants";
import { TInferenceResponse } from "../types";

export const predictCropDiseaseMutation = async ({
  image,
  explain,
}: {
  image: ReactNativeFile;
  explain: boolean;
}) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("explain", String(explain));
  const res = await fetch(`${SERVER_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data as TInferenceResponse;
};
