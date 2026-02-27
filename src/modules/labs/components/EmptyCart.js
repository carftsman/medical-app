import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
export default function EmptyCart() {
  const navigation = useNavigation();
  return (
     <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="cart-outline" size={64} color="#007AFF" />
      </View>
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Add tests or packages to get started with your booking.
      </Text>
      <TouchableOpacity onPress={() =>navigation.navigate("LabTabNavigation")} style={styles.button}>
        <Text style={styles.buttonText}>Explore Tests</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E6F0FF", 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6E6E73",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 80,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});