import { ImageBackground, ScrollView } from "react-native";
import React from "react";
import { COLORS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import DailyTip from "@/src/components/DailyTip/DailyTip";
import Form from "@/src/components/Form/Form";

const Page = () => {
  const { settings } = useSettingsStore();

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={6}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.transparent,
        }}
        contentContainerStyle={{
          paddingBottom: 300,
          padding: 10,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <DailyTip />
        <Form />
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;
