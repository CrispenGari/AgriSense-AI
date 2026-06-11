import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { THistory } from "@/src/types";
import {
  IMAGES,
  COLORS,
  relativeTimeObject,
  FONTS,
  PLOT_COLORS,
  APP_NAME,
} from "@/src/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import Card from "@/src/components/Card/Card";
import { BarChart, CurveType } from "react-native-gifted-charts";
import LegendItem from "@/src/components/LegendItem/LegendItem";
import Button from "@/src/components/Button/Button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SuggestionsBottomSheet from "@/src/components/BottomSheets/SuggestionsBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Page = () => {
  const { result } = useLocalSearchParams<{ result: string }>();
  const data = React.useMemo<THistory>(() => JSON.parse(result), [result]);
  const suggestionsBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const router = useRouter();

  const plotsData = React.useMemo(() => {
    const { disease_probabilities, plant_probabilities } = data.prediction;

    const plant = plant_probabilities.map((plant) => {
      const probability = plant.probability * 100;
      return {
        value: probability,
        plant: `${plant.class_label} (${plant.label}) • ${probability.toFixed(0)}%`,
        frontColor: PLOT_COLORS[plant.label],
      };
    });
    const disease = disease_probabilities.map((disease) => {
      const probability = disease.probability * 100;
      return {
        value: probability,
        disease: `${disease.class_label} (${disease.label}) • ${probability.toFixed(0)}%`,
        frontColor: PLOT_COLORS[disease.label],
      };
    });

    return {
      plant,
      disease,
    };
  }, [data]);

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={80}
    >
      <SuggestionsBottomSheet ref={suggestionsBottomSheetRef} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS.transparent,
          paddingBottom: 100,
          paddingHorizontal: 10,
          gap: 5,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card, { marginTop: 30 }]}>
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
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <View style={[styles.badge, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                Image
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Leaf Image
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              The image that was used for the predictions response.
            </Text>

            <Animated.Image
              source={{
                uri: data.uri,
              }}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Plant Prediction
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.black,
              }}
            >
              Based on the provided images, {APP_NAME} predict a plant leaf as
              of "{data.prediction.plant_prediction.class_label}".
            </Text>

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray}
                data={plotsData.plant}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData.plant.map((data, index) => (
                <LegendItem
                  label={data.plant}
                  key={index}
                  color={data.frontColor}
                />
              ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Disease Prediction for "
              {data.prediction.plant_prediction.class_label}"
            </Text>

            {data.prediction.disease_prediction.class_label
              .toLowerCase()
              .trim() === "healthy" ? (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 14,
                  color: COLORS.tertiary,
                }}
              >
                Based on the leaf of "
                {data.prediction.plant_prediction.class_label}", the leaf does
                not have pest or disease symptoms.
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 14,
                  color: COLORS.red,
                }}
              >
                Based on the leaf of "
                {data.prediction.plant_prediction.class_label}", the predicted
                disease is "{data.prediction.disease_prediction.class_label}".
              </Text>
            )}

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray}
                data={plotsData.disease}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData.disease.map((data, index) => (
                <LegendItem
                  label={data.disease}
                  key={index}
                  color={data.frontColor}
                />
              ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card]}>
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
                {dayjs(new Date(data.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Prediction Summary
            </Text>

            {data.prediction.disease_prediction.class_label
              .trim()
              .toLocaleLowerCase() === "healthy" ? (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 14,
                  color: COLORS.tertiary,
                }}
              >
                {`Based on the "${data.prediction.plant_prediction.class_label}" image provided, the "${data.prediction.plant_prediction.class_label}" is "${data.prediction.disease_prediction.class_label}" with ${(data.prediction.disease_prediction.probability * 100).toFixed(0)}% confidence.`}
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 14,
                  color: COLORS.red,
                }}
              >
                {`Based on the "${data.prediction.plant_prediction.class_label}" image provided, the "${data.prediction.plant_prediction.class_label}" has "${data.prediction.disease_prediction.class_label}" with ${(data.prediction.disease_prediction.probability * 100).toFixed(0)}% confidence.`}
              </Text>
            )}

            <Button
              title="Suggest for me"
              Icon={
                <MaterialIcons
                  name="online-prediction"
                  size={26}
                  color={COLORS.white}
                />
              }
              style={{
                width: "100%",
                backgroundColor: COLORS.tertiary,
                marginVertical: 10,
                borderColor: COLORS.tertiary,
                height: 60,
              }}
              titleStyle={{ marginLeft: 5 }}
              onPress={() => {
                suggestionsBottomSheetRef.current?.present();
              }}
            />
          </Card>
        </Animated.View>

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
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 20,
              }}
            >
              Want to try another Leaf Image?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.black,
                fontSize: 14,
              }}
            >
              Change the leaf image or try to take another clear image and see
              the results.
            </Text>
          </View>
          <Button
            title="Scan another Leaf"
            Icon={
              <MaterialIcons
                name="online-prediction"
                size={26}
                color={COLORS.white}
              />
            }
            style={{
              width: "100%",
              backgroundColor: COLORS.tertiary,
              marginVertical: 10,
              borderColor: COLORS.tertiary,
              height: 60,
            }}
            titleStyle={{ marginLeft: 5 }}
            onPress={() => {
              if (router.canGoBack()) router.back();
              router.navigate({
                pathname: "/(common)/predict",
              });
            }}
          />
        </Card>
        <Text>{JSON.stringify({ data }, null, 2)}</Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.main,
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
  badge: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: COLORS.tertiary,
    borderRadius: 999,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    top: -10,
    paddingHorizontal: 30,
  },
});
