import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";
import Feather from "react-native-vector-icons/Feather";

export default function SuccessHeader({ amount, hospital }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="check" size={scale(32)} color="#fff" />
      </View>

      <Text style={styles.title}>Payment Successfull</Text>
      <Text style={styles.subtitle}>
        ₹{amount} has paid to {hospital}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "600",
    marginTop: verticalScale(16),
  },
  subtitle: {
    color: "#fff",
    fontSize: scale(13),
    marginTop: verticalScale(6),
  },
});
