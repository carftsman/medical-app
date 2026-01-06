import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
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
      <View style={styles.container}>
        {/* Transparent Status Bar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Background Image */}
        <Image
          source={require("../../assets/Doctors.png")}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding3")}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Bottom Text Content */}
          <View style={styles.bottomContent}>
            <Text style={styles.heading}>
              Quality Hospitals, One Platform
            </Text>

            <Text style={styles.subText}>
              Find hospitals you can trust for consultations, treatments, and
              emergency care, anytime you need.
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
