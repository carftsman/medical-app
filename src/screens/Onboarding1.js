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

export default function Onboarding1({ navigation }) {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <LinearGradient
        colors={["#ffffff", "#e6f2ff"]}
        style={{ flex: 1 }}
      >
        {/* Full screen StatusBar */}
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

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
            <Text style={{ fontFamily: FONT.medium, fontSize: 16, color: COLORS.primary }}>
              Skip
            </Text>
          </TouchableOpacity>

          {/* Blue curve background */}
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

          {/* Image circle */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <View
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: COLORS.white,
                overflow: "hidden",
                elevation: 8,
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/TrustedDoctors.png")}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          {/* Text content */}
          <View
            style={{
              alignItems: "center",
              marginBottom: 100,
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
              Find Trusted Doctors
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: FONT.regular,
                color: COLORS.gray,
                textAlign: "center",
                marginBottom: 100,
                lineHeight: 24,
              }}
            >
              Verified medical experts available anytime for safe and reliable care,
              ensuring you receive trusted guidance and timely support for all your
              health needs.
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
            {/* Pagination Dots */}
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ width: 18, height: 8, borderRadius: 10, backgroundColor: COLORS.primary }} />
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gray }} />
            </View>

            {/* Arrow */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Onboarding2")}
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
