import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONT } from "../config/constants";
import { scale, verticalScale } from "../utils/styling";

const { width, height } = Dimensions.get("window");

export default function Onboarding2({ navigation }) {
  const goPrevious = () => navigation.navigate("Onboarding1");
  const goNext = () => navigation.navigate("Onboarding3");

  return (
    <TouchableWithoutFeedback onPress={goPrevious}>
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Image
          source={require("../../assets/Labs.png")}
          style={{ width, height, position: "absolute" }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
          style={{ position: "absolute", width, height }}
        />

        <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Skip */}
          <TouchableOpacity
            onPress={goNext}
            style={{
              position: "absolute",
              top: verticalScale(50),
              right: scale(20),
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONT.bold,
                fontSize: scale(18),
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>

          {/* Bottom Content */}
        <View
  style={{
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(90),
    alignItems: "center",          // center horizontally
  }}
>
  <Text
    style={{
      color: COLORS.white,
      fontFamily: FONT.bold,
      fontSize: scale(22),
      marginBottom: verticalScale(12), // more space between title & text
      textAlign: "center",
    }}
  >
    Get Reports by Best Labs
  </Text>

  <Text
    style={{
      color: "rgba(255,255,255,0.9)",
      fontFamily: FONT.regular,
      fontSize: scale(14),
      lineHeight: verticalScale(20),
      textAlign: "center",
    }}
  >
    Access all your test results in one place with secure, real-time
    updates delivered directly to your device.
  </Text>
</View>

          {/* Arrow */}
          <TouchableOpacity
            onPress={goNext}
            style={{
              position: "absolute",
              bottom: verticalScale(30),
              right: scale(20),
              width: scale(50),
              height: scale(50),
              borderRadius: scale(25),
              backgroundColor: COLORS.primary,
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: scale(24),
                fontWeight: "bold",
              }}
            >
              ➔
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}
