import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Constants from "expo-constants";

const TnCBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["60%"], []);
  const { dismiss } = useBottomSheetModal();
  const { settings } = useSettingsStore();

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      enableOverDrag={false}
      handleComponent={null}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        StickyHeaderComponent={(props) => (
          <View
            style={{
              paddingTop: 50,
              paddingBottom: 10,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONTS.bold,
                marginBottom: 10,
              }}
            >
              Terms & Conditions
            </Text>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLORS.main,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
              hitSlop={20}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                dismiss();
              }}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.bold,
            marginBottom: 10,
            color: COLORS.transparent,
          }}
        >
          Terms & Conditions
        </Text>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 18,
            lineHeight: 26,
          }}
        >
          AgriSense AI is a mobile-based agricultural decision-support
          application designed to support crop identification and plant disease
          detection using AI-powered image analysis.
          {"\n\n"}
          By using AgriSense AI, you agree to use the app responsibly and only
          for agricultural, educational, research, or decision-support purposes.
          The app should not be used to upload harmful, misleading, offensive,
          unlawful, or unrelated content.
          {"\n\n"}
          AgriSense AI allows users to capture or upload leaf images for crop
          identification and disease detection. The system first identifies the
          plant type, such as Cashew, Cassava, Maize, or Tomato, and then uses
          the relevant plant-specific model to predict the disease, pest, or
          healthy condition.
          {"\n\n"}
          The predictions, confidence scores, and Grad-CAM visual explanations
          provided by AgriSense AI are intended to support decision-making. They
          should not be treated as final or professional agricultural diagnosis.
          {"\n\n"}
          Users remain responsible for how they interpret and use the results
          provided by the app. Where crop damage, pest outbreaks, or disease
          symptoms are severe, users should consult qualified agricultural
          extension officers, plant pathologists, or relevant experts.
          {"\n\n"}
          AgriSense AI does not guarantee that all predictions will be correct,
          complete, or suitable for every farming condition. Model performance
          may be affected by image quality, lighting, background noise, plant
          growth stage, disease severity, and visual similarity between disease
          classes.
          {"\n\n"}
          When Grad-CAM explanation is enabled, the app may generate and display
          visual outputs such as the original image, heatmap, and highlighted
          attention region. These explanations are provided for interpretability
          and may not represent the exact biological boundary of a disease or
          pest-affected area.
          {"\n\n"}
          You may not use AgriSense AI to upload images that infringe copyright,
          violate privacy, contain harmful material, or disrupt the operation of
          the platform or backend service.
          {"\n\n"}
          AgriSense AI does not require user authentication. However, users are
          expected to use the app in a lawful and respectful manner and avoid
          uploading private, personal, or unrelated images.
          {"\n\n"}
          We reserve the right to restrict, suspend, or modify access to the app
          or its services if misuse, abuse, technical risk, or violation of
          these Terms & Conditions is identified.
          {"\n\n"}
          By continuing to use AgriSense AI, you agree to these Terms &
          Conditions. These terms may be updated from time to time to reflect
          improvements to the app, changes in services, legal requirements, or
          platform policies.
        </Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default TnCBottomSheet;
