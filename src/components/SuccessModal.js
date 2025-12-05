
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { COLORS, FONT } from "../config/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SuccessModal({
  title,
  subtitle,
  buttonText,
  onPress,
  visible = true,
}) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Circle background + tick icon */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={40} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>

          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    elevation: 10,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#EEF2F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontFamily: FONT.bold,
    color: COLORS.black,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 6,
    textAlign: "center",
    marginBottom: 15,
  },

  button: {
    backgroundColor: COLORS.primary,
    width: "70%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONT.medium,
  },
});
