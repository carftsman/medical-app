import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SelectedLabCard = ({ lab }) => {
  if (!lab) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Selected Laboratory</Text>
      <Text style={styles.name}>{lab.name}</Text>
      <Text style={styles.address}>
        {lab.address || lab.city}
      </Text>
    </View>
  );
};

export default SelectedLabCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F6F9FC",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  address: {
    color: "gray",
    marginTop: 4,
  },
});
