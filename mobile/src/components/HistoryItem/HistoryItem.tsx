import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
  APP_NAME,
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { PieChart } from "react-native-gifted-charts";
import LegendItem from "../LegendItem/LegendItem";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useHistoryStore } from "../../store/historyStore";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItem = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();
  const { remove } = useHistoryStore();

  const plotsData = React.useMemo(() => {
    const { disease_probabilities, plant_probabilities } = item.prediction;
    const plant = plant_probabilities.map((plant) => {
      const probability = plant.probability * 100;
      return {
        value: probability,
        plant: `${plant.class_label} (${plant.label}) • ${probability.toFixed(0)}%`,
        frontColor: PLOT_COLORS[plant.label],
        color: PLOT_COLORS[plant.label],
      };
    });
    const disease = disease_probabilities.map((disease) => {
      const probability = disease.probability * 100;
      return {
        value: probability,
        disease: `${disease.class_label} (${disease.label}) • ${probability.toFixed(0)}%`,
        frontColor: PLOT_COLORS[disease.label],
        color: PLOT_COLORS[disease.label],
      };
    });

    return {
      plant,
      disease,
    };
  }, [item]);
  return (
    <Card
      style={{
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
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
          }}
        >
          {dayjs(new Date(item.date)).fromNow()} ago
        </Text>
      </View>
      <TouchableOpacity
        style={{}}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(common)/results",
            params: {
              result: JSON.stringify(item),
            },
          });
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            width: "100%",
            gap: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Animated.Image
              source={{
                uri: item.uri,
              }}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Based on the provided images, {APP_NAME} predict a plant leaf as
              of "{item.prediction.plant_prediction.class_label}".{" "}
            </Text>
          </View>
          <View
            style={{
              gap: 5,
              flexDirection: "row",
              maxWidth: "100%",
            }}
          >
            <View style={{ flex: 1 }}>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={25}
                data={plotsData.plant}
                radius={40}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                        }}
                      >
                        Plant
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.plant.map((data, index) => (
                  <LegendItem
                    label={data.plant}
                    key={index}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 10,
                    }}
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={25}
                data={plotsData.disease}
                radius={40}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                        }}
                      >
                        Disease
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.disease.map((data, index) => (
                  <LegendItem
                    label={data.disease}
                    key={index}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 10,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          hitSlop={30}
          style={{
            backgroundColor: COLORS.secondary,
            justifyContent: "center",
            alignItems: "center",
            width: 45,
            height: 45,
            borderRadius: 45,
          }}
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              APP_NAME,
              "Are you sure you want to remove this item from history?",
              [
                {
                  text: "Yes",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    remove(item);
                  },
                },

                {
                  text: "No",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false },
            );
          }}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItem;
