import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";

export default function PrimaryButton({ title }) {
  return (
    <TouchableOpacity   style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F36",
    margin: scale(16),
    borderRadius: scale(24),
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "600",
  },
});
