import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";
import { useNavigation } from "@react-navigation/native";

const MedicinesCancelledSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Circle Wrapper */}
      <View style={styles.outerCircle}>
        <View style={styles.middleCircle}>
          <View style={styles.innerCircle}>
            <MaterialCommunityIcons
              name="close"
              size={scale(40)}
              color={COLORS.white}
            />
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Order Cancelled Successfully
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        We're sorry to see it go. You can place a new order anytime.
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.orderAgainBtn}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "" }],
          })
        }
      >
        <Text style={styles.orderAgainText}>
          Order Again
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default MedicinesCancelledSuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(24),
  },

  outerCircle: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    backgroundColor: "rgba(244, 67, 54, 0.15)", // light red
    alignItems: "center",
    justifyContent: "center",
  },

  middleCircle: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    backgroundColor: "rgba(244, 67, 54, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  innerCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: COLORS.danger, // use theme red
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: verticalScale(40),
    fontSize: scale(18),
    fontFamily: FONT.semiBold,
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    marginTop: verticalScale(16),
    fontSize: scale(14),
    fontFamily: FONT.regular,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: verticalScale(22),
  },

  orderAgainBtn: {
    marginTop: verticalScale(40),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: "center",
    
  },

  orderAgainText: {
    color: COLORS.white,
    fontSize: scale(15),
    fontFamily: FONT.semiBold,
  },
});