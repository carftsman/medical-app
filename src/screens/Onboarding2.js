import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONT } from "../config/constants";

const { width } = Dimensions.get("window");

export default function Onboarding2({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Onboarding1")}>
      <LinearGradient
        colors={["#ffffff", "#e6f2ff"]}
        style={{ flex: 1 }}
      >
        {/* Fullscreen status bar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {/* Safe wrapper to fill whole display */}
        <SafeAreaView style={{ flex: 1 }}>

          {/* Skip */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Onboarding3")}
            style={{
              position: "absolute",
              top: 50,
              right: 25,
              zIndex: 10,
            }}
          >
            <Text style={{ fontFamily: FONT.medium, fontSize: 16, color: COLORS.white }}>
              Skip
            </Text>
          </TouchableOpacity>

          {/* Blue right curve */}
          <View
            style={{
              width: width * 1.25,
              height: width * 1.25,
              backgroundColor: COLORS.primary,
              borderRadius: width * 1.25,
              position: "absolute",
              top: -width * 0.55,
              right: -width * 0.55,
            }}
          />

          {/* Image Circle */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: 320,
                height: 320,
                borderRadius: 160,
                backgroundColor: COLORS.white,
                overflow: "hidden",
                elevation: 8,
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/labs.jpg")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          {/* Text Block */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 160,
              paddingHorizontal: 32,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontFamily: FONT.bold,
                color: COLORS.black,
                textAlign: "center",
              }}
            >
              Get Reports by Best Labs
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: FONT.regular,
                color: COLORS.gray,
                textAlign: "center",
                marginTop: 10,
                lineHeight: 24,
              }}
            >
              Access all your test results in one place with secure,
              real-time updates delivered directly to your device.
            </Text>
          </View>

          {/* Pagination + Arrow */}
          <View
            style={{
              position: "absolute",
              bottom: 50,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Centered pagination dots */}
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
              <View style={{ width: 18, height: 8, borderRadius: 10, backgroundColor: COLORS.primary }} />
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
            </View>

            {/* Arrow on right side */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Onboarding3")}
              style={{
                position: "absolute",
                right: 25,   
                width: 36,
                height: 36,
                backgroundColor: COLORS.primary,
                borderRadius: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: 18 }}>➜</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
