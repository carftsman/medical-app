// src/screens/HospitalsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HospitalsScreen() {
  return (
    <View style={styles.container}>
      <Text>Hospitals Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
