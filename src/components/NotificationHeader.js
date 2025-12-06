import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

export default function NotificationHeader({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <Image
        source={require("../../assets/notification.png")}  
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 35,
    height: 35,
  },
});
