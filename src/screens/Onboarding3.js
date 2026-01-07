import React from "react";
import {
  View,
  Text,
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
import PrimaryButton from "../components/PrimaryButton";

const { width, height } = Dimensions.get("window");

export default function Onboarding3({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Onboarding2")}>
      <View style={styles.container}>
        {/* Status Bar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Background Image */}
        <Image
          source={require("../../assets/GetStarted.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Dark Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
          style={styles.gradientOverlay}
        />

        <SafeAreaView style={styles.safeArea}>
          {/* Bottom Text */}
          <View style={styles.bottomContent}>
            <Text style={styles.heading}>End to End Pharmacy Services</Text>

            <Text style={styles.subText}>
              Manage all your pharmacy needs quickly and securely from your mobile,
              with doorstep delivery.
            </Text>
          </View>

          {/* Primary Button */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Get Started"
              onPress={() => navigation.replace("Login")}
            />
          </View>
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

  bottomContent: {
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(140),
    alignItems: "center",
  },

  heading: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: scale(24),
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

  buttonWrapper: {
    position: "absolute",
    bottom: verticalScale(60),
    width: "100%",
    paddingHorizontal: scale(20),
  },
});
