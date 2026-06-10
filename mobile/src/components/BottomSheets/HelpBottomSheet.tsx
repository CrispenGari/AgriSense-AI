import { COLORS, FONTS } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Constants from "expo-constants";

const HelpBottomSheet = React.forwardRef<BottomSheetModal, {}>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["50%"], []);
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
              Help
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
          }}
        >
          Help
        </Text>

        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 18,
          }}
        >
          AgriSense AI is a mobile-based agricultural decision-support app
          created to help users identify crop types and detect possible plant
          diseases from leaf images.
          {"\n\n"}The app allows you to capture or upload a leaf image and
          receive an AI-powered prediction. It first identifies the plant, such
          as Cashew, Cassava, Maize, or Tomato, and then uses the correct
          plant-specific model to detect the disease, pest, or healthy
          condition.
          {"\n\n"}AgriSense AI also provides prediction confidence scores to
          help users understand how certain the model is about its result. When
          enabled, the app can show Grad-CAM visual explanations that highlight
          the image regions that influenced the prediction.
          {"\n\n"}The system is designed to support farmers, students,
          researchers, and agricultural extension workers by making crop health
          assessment faster, more accessible, and easier to use through a mobile
          device.
          {"\n\n"}AgriSense AI is intended to support agricultural
          decision-making, but it does not replace expert agronomic advice,
          laboratory testing, or professional plant disease diagnosis.
        </Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontFamily: FONTS.regular,
            marginTop: 50,
            textAlign: "center",
          }}
        >
          {Constants.default.expoConfig?.name} • Version:{" "}
          {Constants.default.expoConfig?.version}
        </Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default HelpBottomSheet;
