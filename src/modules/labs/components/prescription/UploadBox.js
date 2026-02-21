import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../../utils/styling";

const UploadBox = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Ionicons name="cloud-upload-outline" size={40} color="#056FD2" />
      <Text style={styles.title}>Upload Prescription</Text>
      <Text style={styles.sub}>Click here to upload your prescription</Text>
    </TouchableOpacity>
  );
};

export default UploadBox;

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: "#056FD2",
    borderStyle: "dashed",
    paddingVertical: verticalScale(60),
    borderRadius: scale(24),
    alignItems: "center",
    backgroundColor: "#F2F8FF",
  },
  title: {
    marginTop: 12,
    fontWeight: "600",
    fontSize: scale(15),
  },
  sub: {
    color: "gray",
    fontSize: scale(12),
    marginTop: 6,
  },
});
