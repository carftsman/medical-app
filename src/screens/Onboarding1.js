import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONT } from "../config/constants";
import { scale, verticalScale } from "../utils/styling";

const { width, height } = Dimensions.get("window");

export default function Onboarding1({ navigation }) {
  const goNext = () => navigation.navigate("Onboarding2");

  return (
    <TouchableWithoutFeedback onPress={goNext}>
      <View style={{ flex: 1 }}>
        {/* Transparent Status Bar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Background Image */}
        <Image
          source={require("../../assets/Doctors.png")}
          style={{
            width: width,
            height: height,
            position: "absolute",
          }}
          resizeMode="cover"
        />

        {/* Dark Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
          style={{
            position: "absolute",
            width: width,
            height: height,
          }}
        />

        <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Skip Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding3")}
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

          {/* Bottom Text Content */}
         <View
  style={{
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(90),
    alignItems: "center",
  }}
>
  <Text
    style={{
      color: COLORS.white,
      fontFamily: FONT.bold,
      fontSize: scale(22),
      marginBottom: verticalScale(12),
      textAlign: "center",
    }}
  >
    Quality Hospitals, One Platform
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
    Find hospitals you can trust for consultations, treatments, and
    emergency care, anytime you need.
  </Text>
</View>


          {/* Next Arrow Button (still works) */}
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
