import React, { useEffect } from "react";
import {
  Text,
  Image,
  StatusBar,
  View,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONT } from "../config/constants";

export default function SplashScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding1");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Full immersive mode */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        hidden={false}
      />

      <LinearGradient
        colors={["#e6f2ff", "#ffffff", "#cde3ff"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Push content down so it doesn't overlap status bar */}
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 110, height: 110 }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 24,
              marginTop: 8,
              color: COLORS.primary,
              letterSpacing: 0.5,
            }}
          >
            Doctor Hunt
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}
