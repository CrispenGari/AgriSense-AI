import { View, Text } from "react-native";
import React from "react";
import Button from "../Button/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants";
import Card from "../Card/Card";
import { useRouter } from "expo-router";

const Form = () => {
  const router = useRouter();
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
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 25,
          }}
        >
          Check Plant Health
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.black,
          }}
        >
          Snap or upload a leaf image, and AgriSense AI will identify the crop
          and detect possible disease, pest, or healthy conditions using AI. Get
          fast predictions, confidence scores, and visual explanations to
          support smarter crop health decisions.
        </Text>
      </View>
      <Button
        title="Check Plant Health"
        Icon={
          <MaterialIcons
            name="online-prediction"
            size={26}
            color={COLORS.black}
          />
        }
        style={{
          width: "100%",
          backgroundColor: COLORS.primary,
          marginVertical: 25,
          borderColor: COLORS.primary,
          gap: 10,
        }}
        titleStyle={{
          color: COLORS.black,
          marginLeft: 10,
        }}
        onPress={() => {
          router.navigate({
            pathname: "/(common)/predict",
          });
        }}
      />
    </Card>
  );
};

export default Form;
