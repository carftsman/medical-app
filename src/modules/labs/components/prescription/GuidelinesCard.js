import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const GuidelinesCard = () => {
  const points = [
    "Ensure image is clear and readable",
    "Upload full prescription in one frame",
    "Doctor name & tests must be visible",
    "Supported formats: JPG, PNG, PDF",
    "Maximum 5 files allowed",
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Guidelines to follow</Text>
      {points.map((item, index) => (
        <View key={index} style={styles.row}>
          <Ionicons name="checkmark-circle" size={16} color="#056FD2" />
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default GuidelinesCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F2F8FF",
    padding: 24,
    borderRadius: 24,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
  },
});
