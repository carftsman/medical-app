import React from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
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
      <View style={{ flex: 1 }}>
        {/* Status Bar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        {/* Background Image */}
        <Image
  source={require("../../assets/GetStarted.png")}
  style={{
    width,
    height,
    position: "absolute",
  }}
  resizeMode="cover"
/>


        {/* Dark Overlay */}
        <LinearGradient
          colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.85)"]}
          style={{
            position: "absolute",
            width,
            height,
          }}
        />

        <SafeAreaView style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Bottom Text */}
         <View
  style={{
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(140),
    alignItems: "center",
  }}
>
  <Text
    style={{
      color: COLORS.white,
      fontFamily: FONT.bold,
      fontSize: scale(24),
      marginBottom: verticalScale(12),
      textAlign: "center",
    }}
  >
    End to End Pharmacy Services
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
    Manage all your pharmacy needs quickly and securely from your mobile,
    with doorstep delivery.
  </Text>
</View>


          {/* Primary Button */}
          <View
  style={{
    position: "absolute",
    bottom: verticalScale(60), // increase this
    width: "100%",
    paddingHorizontal: scale(20),
  }}
>
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
