import HelpBottomSheet from "@/src/components/BottomSheets/HelpBottomSheet";
import Card from "@/src/components/Card/Card";
import PPBottomSheet from "@/src/components/BottomSheets/PPBottomSheet";
import TCBottomSheet from "@/src/components/BottomSheets/TnCBottomSheet";
import SettingItem from "@/src/components/SettingItem/SettingItem";
import { APP_NAME, COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onFetchUpdateAsync, onImpact, rateApp } from "@/src/utils";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Constants from "expo-constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ImageBackground,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  Text,
} from "react-native";
import { useHistoryStore } from "@/src/store/historyStore";

const Page = () => {
  const { settings, update, restore } = useSettingsStore();
  const tnCBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const ppBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const router = useRouter();
  const { clear } = useHistoryStore();

  return (
    <ImageBackground
      style={{
        flex: 1,
      }}
      source={IMAGES.background}
      blurRadius={6}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <TCBottomSheet ref={tnCBottomSheetRef} />
        <PPBottomSheet ref={ppBottomSheetRef} />
        <HelpBottomSheet ref={helpBottomSheetRef} />

        <Text style={[styles.headerText, { marginTop: 20 }]}>Preferences</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            hasSwitch
            onPress={(isOn) => {
              update({ ...settings, haptics: !!isOn });
            }}
            title={"Haptics"}
            value={settings.haptics}
            Icon={
              <MaterialCommunityIcons
                name={settings.haptics ? "vibrate" : "vibrate-off"}
                size={24}
                color={COLORS.black}
              />
            }
            subTitle={settings.haptics ? "ON" : "OFF"}
          />

          <SettingItem
            onPress={(isOn) => {
              update({ ...settings, sound: !!isOn });
            }}
            value={settings.sound}
            hasSwitch
            title={"In-App Sounds"}
            subTitle={settings.sound ? "ON" : "OFF"}
            Icon={
              <MaterialCommunityIcons
                name={settings.sound ? "speaker" : "speaker-off"}
                size={24}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={(isOn) => {
              update({ ...settings, notifications: !!isOn });
            }}
            value={settings.notifications}
            hasSwitch
            title={"Notifications"}
            subTitle={settings.notifications ? "ON" : "OFF"}
            Icon={
              <Ionicons
                name={
                  settings.notifications
                    ? "notifications-outline"
                    : "notifications-off-outline"
                }
                size={24}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={(isOn) => {
              update({ ...settings, explain: !!isOn });
            }}
            value={settings.explain}
            hasSwitch
            title={"Explainable AI (xAI)"}
            subTitle={settings.explain ? "ON" : "OFF"}
            Icon={
              <MaterialIcons
                name={settings.explain ? "auto-fix-high" : "auto-fix-off"}
                size={24}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={(isOn) => {
              update({ ...settings, keepHistory: !!isOn });
            }}
            value={settings.sound}
            hasSwitch
            title={"Save History"}
            labelStyle={{
              color: COLORS.red,
            }}
            subTitleStyle={{
              color: COLORS.red,
            }}
            subTitle={settings.keepHistory ? "ON" : "OFF"}
            Icon={<Feather name="activity" size={24} color={COLORS.red} />}
          />
        </Card>

        <Text style={[styles.headerText, { marginTop: 20 }]}>Storage</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                APP_NAME,
                `Are you sure you want to history data?`,
                [
                  {
                    text: "YES",
                    style: "default",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }

                      clear();
                    },
                  },
                  {
                    text: "NO",
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
            labelStyle={{
              color: COLORS.red,
            }}
            title="Clear History"
            Icon={
              <MaterialIcons name="clear-all" size={24} color={COLORS.red} />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              Alert.alert(
                APP_NAME,
                `Are you sure you want to reset ${APP_NAME}?`,
                [
                  {
                    text: "YES",
                    style: "default",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                      restore();
                      clear();
                      router.dismissAll();
                      router.replace("/");
                    },
                  },
                  {
                    text: "NO",
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
            labelStyle={{
              color: COLORS.red,
            }}
            title="Restore Settings"
            Icon={
              <MaterialIcons name="reset-tv" size={24} color={COLORS.red} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Support & Feedback</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await Share.share(
                {
                  url: "https://github.com/CrispenGari/AgriSense-AI",
                  message:
                    "An application for crop disease detection: Download at https://github.com/CrispenGari/AgriSense-AI",
                  title: "Share AgriSense AI with a Friend",
                },
                {
                  dialogTitle: "Share AgriSense AI",
                  tintColor: COLORS.tertiary,
                },
              );
            }}
            title="Share with a Friend"
            Icon={
              <Ionicons name="heart-outline" size={24} color={COLORS.black} />
            }
          />

          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await rateApp();
            }}
            title={"Rate AgriSense AI"}
            Icon={
              <Ionicons name="star-outline" size={24} color={COLORS.black} />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              helpBottomSheetRef.current?.present();
            }}
            title={"How does AgriSense AI work"}
            Icon={<Ionicons name="help" size={24} color={COLORS.black} />}
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              await onFetchUpdateAsync();
            }}
            title={"Check for Updates"}
            Icon={
              <MaterialIcons name="update" size={24} color={COLORS.black} />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              const res = await Linking.canOpenURL(
                "https://github.com/CrispenGari/AgriSense-AI/issues",
              );
              if (res) {
                Linking.openURL(
                  "https://github.com/CrispenGari/AgriSense-AI/issues",
                );
              }
            }}
            title={"Report an Issue"}
            Icon={
              <Ionicons name="logo-github" size={24} color={COLORS.black} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Legal</Text>
        <Card
          style={{
            marginHorizontal: 10,
            paddingVertical: 10,
            paddingHorizontal: 0,
            maxWidth: "100%",
            backgroundColor: COLORS.primary,
          }}
        >
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              tnCBottomSheetRef.current?.present();
            }}
            title={"Terms & Conditions"}
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingItem
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              ppBottomSheetRef.current?.present();
            }}
            title={"Privacy Policy"}
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
        </Card>
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.black,
            padding: 10,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          {Constants.default.expoConfig?.name}
          {" version: "}
          {Constants.default.expoConfig?.version}
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 20,
    color: COLORS.black,
    marginBottom: 5,
    textTransform: "uppercase",
  },
});
