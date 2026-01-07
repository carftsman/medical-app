import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  Dimensions,
  StyleSheet,
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
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Background Image */}
        <Image
          source={require("../../assets/Labs.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Dark Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
          style={styles.gradientOverlay}
        />

        <SafeAreaView style={styles.safeArea}>
          {/* Skip Button */}
          <TouchableOpacity onPress={goNext} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Bottom Text Content */}
          <View style={styles.bottomContent}>
            <Text style={styles.heading}>Get Reports by Best Labs</Text>

            <Text style={styles.subText}>
              Access all your test results in one place with secure, real-time
              updates delivered directly to your device.
            </Text>
          </View>

          {/* Next Arrow Button */}
          <TouchableOpacity onPress={goNext} style={styles.nextButton}>
            <Text style={styles.nextArrow}>➔</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    width: width,
    height: height,
    position: "absolute",
  },

  gradientOverlay: {
    position: "absolute",
    width: width,
    height: height,
  },

  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },

  skipButton: {
    position: "absolute",
    top: verticalScale(50),
    right: scale(20),
  },

  skipText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: scale(18),
  },

  bottomContent: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(90),
    alignItems: "center",
  },

  heading: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: scale(22),
    marginBottom: verticalScale(12),
    textAlign: "center",
  },

  subText: {
    color: "rgba(255,255,255,0.9)",
    fontFamily: FONT.regular,
    fontSize: scale(14),
    lineHeight: verticalScale(20),
    textAlign: "center",
  },

  nextButton: {
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
  },

  nextArrow: {
    color: COLORS.white,
    fontSize: scale(24),
    fontWeight: "bold",
  },
});
