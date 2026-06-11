import { View, Text, TouchableOpacity } from "react-native";
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
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItemHome = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();

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
        padding: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
            fontSize: 10,
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
            flexDirection: "row",
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
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Based on the provided images, {APP_NAME} predict a plant leaf as
              of "{item.prediction.plant_prediction.class_label}".
            </Text>

            <View>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={20}
                data={plotsData.plant}
                radius={30}
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
                          fontFamily: FONTS.bold,
                          fontSize: 10,
                          textAlign: "center",
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
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.plant.map((data, index) => (
                  <LegendItem
                    label={data.plant}
                    key={index}
                    color={data.frontColor}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <View style={{}}>
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
                          fontFamily: FONTS.bold,
                          fontSize: 10,
                          textAlign: "center",
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
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.disease.map((data, index) => (
                  <LegendItem
                    label={data.disease}
                    key={index}
                    color={data.frontColor}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItemHome;
