import { COLORS, FONTS, IMAGE_BASE_URL, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Constants from "expo-constants";
import { TExplanation, THistory } from "@/src/types";
import Animated from "react-native-reanimated";
import Card from "../Card/Card";
import { useRouter } from "expo-router";

const ExplanationBottomSheet = React.forwardRef<
  BottomSheetModal,
  {
    data: TExplanation;
    plant: string;
    disease: string;
  }
>(({ data, plant, disease }, ref) => {
  const snapPoints = React.useMemo(() => ["80%"], []);
  const { dismiss } = useBottomSheetModal();
  const { settings } = useSettingsStore();
  const router = useRouter();

  const explanation = React.useMemo(() => {
    return {
      plant: {
        gradcam: `${IMAGE_BASE_URL}/gradcam/plant_identification_${data.gradcam}`,
        bbox: `${IMAGE_BASE_URL}/bbox/plant_identification_${data.bbox}`,
        original: `${IMAGE_BASE_URL}/original/plant_identification_${data.original}`,
      },
      disease: {
        gradcam: `${IMAGE_BASE_URL}/gradcam/${plant}_${data.gradcam}`,
        bbox: `${IMAGE_BASE_URL}/bbox/${plant}_${data.bbox}`,
        original: `${IMAGE_BASE_URL}/original/${plant}_${data.original}`,
      },
    };
  }, [data]);

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
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: COLORS.secondary,
        }}
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 10,
            flex: 1,
            paddingBottom: 100,
          }}
        >
          <ImageBackground
            style={{
              flex: 1,
              padding: 10,
              gap: 10,
            }}
            source={IMAGES.background}
            blurRadius={80}
          >
            <View
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: 20,
                paddingTop: 10,
              }}
            >
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
            <Card style={[styles.card]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                Plant Prediction: {plant}
              </Text>

              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 16,
                  marginVertical: 5,
                  color: COLORS.red,
                  textAlign: "center",
                }}
              >
                Model's explanations
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                {Object.entries(explanation.plant).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                      dismiss();
                      router.navigate({
                        pathname: "/(common)/image-viewer",
                        params: {
                          uri: value,
                          title: `Plant: ${key}`,
                        },
                      });
                    }}
                  >
                    <Animated.Image
                      source={{
                        uri: value,
                      }}
                      style={{
                        width: 115,
                        height: 115,
                        alignSelf: "center",
                        marginVertical: 10,
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: FONTS.bold,
                      }}
                    >
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            <Card style={[styles.card]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                Plant Prediction: {disease}
              </Text>

              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 16,
                  marginVertical: 5,
                  color: COLORS.red,
                  textAlign: "center",
                }}
              >
                Model's explanations
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                {Object.entries(explanation.disease).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                      dismiss();
                      router.navigate({
                        pathname: "/(common)/image-viewer",
                        params: {
                          uri: value,
                          title: `Disease: ${key}`,
                        },
                      });
                    }}
                  >
                    <Animated.Image
                      source={{
                        uri: value,
                      }}
                      style={{
                        width: 115,
                        height: 115,
                        alignSelf: "center",
                        marginVertical: 10,
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: FONTS.bold,
                      }}
                    >
                      {key}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>
          </ImageBackground>

          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTS.regular,
              marginTop: 50,
              textAlign: "center",
            }}
          >
            {Constants.default.expoConfig?.name} • Version:{" "}
            {Constants.default.expoConfig?.version}
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ExplanationBottomSheet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: COLORS.tertiary,
  },
  card: {
    backgroundColor: COLORS.white,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    padding: 20,
    overflow: "hidden",
  },
});
