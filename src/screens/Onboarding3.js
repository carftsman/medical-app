import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONT } from "../config/constants";
import PrimaryButton from "../components/PrimaryButton";

const { width } = Dimensions.get("window");

export default function Onboarding3({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Onboarding2")}>
      <LinearGradient
        colors={["#ffffff", "#e6f2ff"]}
        style={{ flex: 1 }}
      >
        {/* Full screen status bar */}
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

        <SafeAreaView style={{ flex: 1 }}>

          {/* Blue Curve */}
          <View
            style={{
              width: width * 1.25,
              height: width * 1.25,
              backgroundColor: COLORS.primary,
              borderRadius: width * 1.25,
              position: "absolute",
              top: -width * 0.55,
              left: -width * 0.55,
            }}
          />

          {/* Image Section */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
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
                source={require("../../assets/getstarted.jpg")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          {/* Text Section */}
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
              Your One Stop Destination
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
              Access trusted doctors, lab reports, medicines, and health services
              in one seamless platform.
            </Text>
          </View>

          {/* Pagination Indicators */}
          <View
            style={{
              position: "absolute",
              bottom: 120,
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              columnGap: 8,
            }}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
            <View style={{ width: 18, height: 8, borderRadius: 10, backgroundColor: COLORS.primary }} />
          </View>

          {/* Using PrimaryButton */}
          <View style={{ position: "absolute", bottom: 40, width: "100%" }}>
            <PrimaryButton
              title="Get Started"
              onPress={() => navigation.replace("Login")}
            />
          </View>

        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
