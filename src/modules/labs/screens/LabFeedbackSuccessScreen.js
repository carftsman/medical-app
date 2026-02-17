import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS } from "../../../config/constants";


const LabFeedbackSuccessScreen = () => {
  return (
    <View style={styles.container}>
      {/* Circle Wrapper */}
      <View style={styles.outerCircle}>
        <View style={styles.middleCircle}>
          <View style={styles.innerCircle}>
            <MaterialCommunityIcons
              name="check"
              size={scale(40)}
              color={COLORS.white}
            />
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Thank You for your feedback</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Thank You for your feedback on your experience with us
      </Text>
    </View>
  );
};

export default LabFeedbackSuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    paddingTop: verticalScale(120),
    paddingHorizontal: scale(24),
  },

  outerCircle: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    backgroundColor: "rgba(33, 150, 243, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  middleCircle: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    backgroundColor: "rgba(33, 150, 243, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: verticalScale(40),
    fontSize: scale(20),
    fontWeight: "600",
    color: "#1976D2",
    textAlign: "center",
  },

  subtitle: {
    marginTop: verticalScale(16),
    fontSize: scale(14),
    color: "#333",
    textAlign: "center",
    lineHeight: verticalScale(22),
  },
});

