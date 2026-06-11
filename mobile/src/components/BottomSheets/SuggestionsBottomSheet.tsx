import { COLORS, FONTS, IMAGES } from "@/src/constants";
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
import { THistory } from "@/src/types";
import Animated from "react-native-reanimated";
import Card from "../Card/Card";
import {
  CLASS_EXPLANATIONS,
  TPlantIdentificationKey,
} from "@/src/constants/explanations";

const SuggestionsBottomSheet = React.forwardRef<
  BottomSheetModal,
  {
    data: THistory;
  }
>(({ data }, ref) => {
  const snapPoints = React.useMemo(() => ["80%"], []);
  const { dismiss } = useBottomSheetModal();
  const { settings } = useSettingsStore();

  const identifiedCrop = React.useMemo(
    () =>
      CLASS_EXPLANATIONS["Plant_Identification"][
        data.prediction.plant_prediction.class_label as TPlantIdentificationKey
      ],
    [data],
  );
  const identifiedDisease = React.useMemo<any>(
    () =>
      (
        CLASS_EXPLANATIONS[
          data.prediction.plant_prediction
            .class_label as TPlantIdentificationKey
        ] as any
      )[data.prediction.disease_prediction.class_label],
    [data],
  );

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
        contentContainerStyle={{
          flex: 1,
          backgroundColor: COLORS.secondary,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
                {data.prediction.disease_prediction.class_label}
              </Text>
              <Animated.Image
                source={{
                  uri: data.uri,
                }}
                style={{
                  width: "100%",
                  height: 200,
                  alignSelf: "center",
                  marginVertical: 10,
                  borderRadius: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 16,
                  textAlign: "center",
                  color: COLORS.red,
                }}
              >
                {data.size} • {data.time.toFixed(2)}s
              </Text>
            </Card>
            <Card style={[styles.card, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                {identifiedCrop.crop}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.italic,
                  fontSize: 16,
                }}
              >
                {identifiedCrop.meaning}
              </Text>
              <View
                style={{
                  paddingLeft: 20,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 5,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    fontSize: 16,
                    color: COLORS.red,
                    textAlign: "center",
                  }}
                >
                  {identifiedCrop.appInsight}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                What should I check?
              </Text>
              <View
                style={{
                  paddingLeft: 20,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 10,
                  width: "100%",
                  maxWidth: "85%",
                }}
              >
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color={COLORS.secondary}
                />
                <Text
                  style={{
                    fontFamily: FONTS.bold,
                    fontSize: 16,
                    color: COLORS.secondary,
                  }}
                >
                  {identifiedCrop.whatToCheck}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                What are the good practices?
              </Text>

              {identifiedCrop.goodPractices?.map((practice, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      paddingLeft: 20,
                      flexDirection: "row",
                      alignItems: "flex-start",
                      gap: 10,
                      width: "100%",
                      maxWidth: "85%",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="flower"
                      size={24}
                      color={COLORS.black}
                    />
                    <Text
                      style={{
                        fontFamily: FONTS.regular,
                        fontSize: 16,
                        color: COLORS.black,
                      }}
                    >
                      {practice}
                    </Text>
                  </View>
                );
              })}
            </Card>

            <Card style={[styles.card, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                {identifiedDisease.displayName}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.italic,
                  fontSize: 16,
                }}
              >
                {identifiedDisease.meaning}
              </Text>

              <View
                style={{
                  paddingLeft: 20,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 5,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    fontSize: 16,
                    color: COLORS.red,
                    textAlign: "center",
                  }}
                >
                  {identifiedDisease.appMessage}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                What are some visible signs I can check?
              </Text>
              {identifiedDisease.visibleSigns?.map(
                (sign: string, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        paddingLeft: 20,
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 10,
                        width: "100%",
                        maxWidth: "85%",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="eye"
                        size={24}
                        color={COLORS.tertiary}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          fontSize: 16,
                          color: COLORS.tertiary,
                        }}
                      >
                        {sign}
                      </Text>
                    </View>
                  );
                },
              )}
              {!!identifiedDisease.possibleCauses ? (
                <>
                  <Text
                    style={{
                      fontFamily: FONTS.bold,
                      fontSize: 20,
                    }}
                  >
                    What are possible causes?
                  </Text>
                  {identifiedDisease.possibleCauses?.map(
                    (cause: string, index: number) => {
                      return (
                        <View
                          key={index}
                          style={{
                            paddingLeft: 20,
                            flexDirection: "row",
                            alignItems: "flex-start",
                            gap: 10,
                            width: "100%",
                            maxWidth: "85%",
                          }}
                        >
                          <MaterialIcons
                            name="warning"
                            size={24}
                            color={COLORS.black}
                          />
                          <Text
                            style={{
                              fontFamily: FONTS.regular,
                              fontSize: 16,
                              color: COLORS.black,
                            }}
                          >
                            {cause}
                          </Text>
                        </View>
                      );
                    },
                  )}
                </>
              ) : null}
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 20,
                }}
              >
                How can I prevent disease?
              </Text>
              {identifiedDisease.prevention?.map(
                (solution: string, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        paddingLeft: 20,
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 10,
                        width: "100%",
                        maxWidth: "85%",
                      }}
                    >
                      <MaterialIcons
                        name="block"
                        size={24}
                        color={COLORS.black}
                      />
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          fontSize: 16,
                          color: COLORS.black,
                        }}
                      >
                        {solution}
                      </Text>
                    </View>
                  );
                },
              )}
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
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default SuggestionsBottomSheet;

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
