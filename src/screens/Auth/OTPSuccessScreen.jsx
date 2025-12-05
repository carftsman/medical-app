

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import SuccessModal from "../../components/SuccessModal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../config/constants";

export default function OTPSuccessScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SuccessModal
          title="Yeay! Welcome Back"
          subtitle="Once again you login successfully into medidoc app"
          buttonText="Go to home"
          onPress={() => navigation.replace("Home")}   // ← FULLY WORKING
          iconComponent={
            <Ionicons
              name="checkmark-circle"
              size={90}
              color={COLORS.primary}
              style={{ marginBottom: 15 }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
