import { COLORS, FONTS, IMAGES } from "@/src/constants";
import { useSettingsStore } from "@/src/store/settingsStore";
import { onImpact } from "@/src/utils";
import { Ionicons } from "@expo/vector-icons";
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

const SuggestionsBottomSheet = React.forwardRef<BottomSheetModal, {}>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["80%"], []);
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
  },
);

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
});
