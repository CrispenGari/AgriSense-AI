// import { TPredictionResponse } from "@/src/types";
// import { ReactNativeFile } from "apollo-upload-client";
// import { SERVER_BASE_URL } from "../constants";

// export const predictTomatoQualityAndMaturity = async ({
//   tomato,
// }: {
//   tomato: ReactNativeFile;
// }) => {
//   const formData = new FormData();
//   formData.append("tomato", tomato);
//   const res = await fetch(`${SERVER_BASE_URL}/api/v1/tomato/predict`, {
//     method: "POST",
//     body: formData,
//   });
//   const data = await res.json();
//   return data as TPredictionResponse;
// };
