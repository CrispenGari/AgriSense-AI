import { View, Text } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { COLORS, FONTS } from "@/src/constants";
import { useDailyTipStore } from "@/src/store/dailyTipStore";

const DailyTip = () => {
  const { tip } = useDailyTipStore();
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
        gap: 20,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          position: "absolute",
          backgroundColor: COLORS.tertiary,
          borderRadius: 999,
          shadowOffset: { width: 2, height: 2 },
          elevation: 1,
          shadowColor: COLORS.tertiary,
          shadowOpacity: 0.35,
          shadowRadius: 2,
          width: 120,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
          top: -10,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.white,
          }}
        >
          Today's tip
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 25,
            marginVertical: 15,
          }}
        >
          Tip of the day
        </Text>
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.tertiary,
            fontSize: 16,
          }}
        >
          {tip.text}
        </Text>
      </View>
    </Card>
  );
};

export default DailyTip;
