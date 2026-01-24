import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS } from "../../../config/constants";

const WhyChooseUsFooter = () => {
  return (
    <LinearGradient
      colors={[COLORS.white, COLORS.Iceblue]}
      style={styles.container}
    >
      <Text style={styles.title}>Why Choose Us?</Text>
      <Text style={styles.subtitle}>
        India's most trusted healthcare platform
      </Text>

      <View style={styles.row}>
        {[
          {
            label: "Trust",
            icon: require("../../../../assets/department-screen/trust.png"),
          },
          {
            label: "Top experts",
            icon: require("../../../../assets/department-screen/experts.png"),
          },
          {
            label: "24/7 Available",
            icon: require("../../../../assets/department-screen/availability.png"),
          },
        ].map((item, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.iconCircle}>
              <Image source={item.icon} style={styles.icon} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />
      <Text style={styles.footerText}>Trust is all We need</Text>
    </LinearGradient>
  );
};

export default WhyChooseUsFooter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(24),
    backgroundColor: "#CFE8FF",
  },
  title: {
    fontSize: scale(18),
    fontWeight: "600",
    color: COLORS.black,
    paddingHorizontal: scale(18),
  },
  subtitle: {
    fontSize: scale(13),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(18),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  item: {
    alignItems: "center",
    width: "30%",
  },
  iconCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: "contain",
  },
  label: {
    fontSize: scale(12),
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.black,
    marginVertical: verticalScale(12),
  },
  footerText: {
    textAlign: "center",
    fontSize: scale(12),
    fontWeight: "500",
  },
});
