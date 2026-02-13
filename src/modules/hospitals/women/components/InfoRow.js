import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function InfoRow({ icon, title, value }) {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>

      {/* Icon circle */}
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={scale(18)} color="#F36" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      {/* Change button clickable */}
      <TouchableOpacity onPress={() => navigation.navigate("DoctorId")}>
        <Text style={styles.change}>Change</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  title: {
    fontSize: scale(13),
    color: "#999",
  },
  value: {
    fontSize: scale(14),
    color: "#333",
    marginTop: verticalScale(4),
    fontWeight: "500",
  },
  change: {
    fontSize: scale(13),
    color: "#F36",
    fontWeight: "500",
  },
});
