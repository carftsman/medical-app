import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale,verticalScale } from "../utils/styling";
import { useNavigation } from "@react-navigation/native";

export default function NotificationHeader({
  onNotificationPress,
  onProfilePress,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Notification Icon */}
      <TouchableOpacity onPress={onNotificationPress} style={styles.iconWrap}>
        <Ionicons name="notifications-outline" size={26} color="#FFF" />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity onPress={()=> navigation.navigate("Profile")} style={styles.iconWrap}>
        <Ionicons name="person-circle-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: scale(40),
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
});
