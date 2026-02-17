import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../../utils/styling";

export default function DateTimeRow({ date, time }) {
  if (!date && !time) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return d.toLocaleDateString("en-IN", options);
  };

  return (
    <View style={styles.container}>
      
      {date && (
        <View style={styles.box}>
          <Ionicons name="calendar" size={scale(16)} color="#F47FBB" />
          <Text style={styles.text}> {formatDate(date)}</Text>
        </View>
      )}

      {time && (
        <View style={styles.box}>
          <Ionicons name="time-outline" size={scale(16)} color="#F47FBB" />
          <Text style={styles.text}> {time}</Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(18),
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
    borderRadius: scale(14),
    width: "48%",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },

  text: {
    fontSize: scale(14),
    marginLeft: scale(8),
    color: "#333",
    fontWeight: "500",
  },
});
