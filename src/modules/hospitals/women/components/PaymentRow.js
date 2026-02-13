import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";

export default function PaymentRow({ label, value, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(8),
  },
  label: {
    fontSize: scale(14),
    color: "#555",
  },
  value: {
    fontSize: scale(14),
    color: "#111",
  },
  highlight: {
    color: "#27AE60",
    fontWeight: "600",
  },
});
