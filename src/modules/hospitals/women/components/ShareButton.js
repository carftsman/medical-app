import React from "react";
import { TouchableOpacity, Text, StyleSheet, Share } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../../utils/styling";

export default function ShareButton({ link }) {

  const onShare = async () => {
    try {
      await Share.share({
        message: link,
      });
    } catch (error) {
      console.log("Share Error:", error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onShare}>
      <Text style={styles.text}> Share link</Text>
      <Ionicons name="share-2" size={scale(18)} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#F47FBB",
    margin: scale(20),
    height: verticalScale(50),
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: scale(15),
    fontWeight: "600",
  },
});
