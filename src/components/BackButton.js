
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from "../config/constants";

export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
     <Ionicons name="chevron-back" size={22} color="gray" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 6,
    marginTop: 20,
    marginLeft: 15,
  },
});
