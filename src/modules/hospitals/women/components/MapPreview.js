import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";

export default function MapPreview() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://maps.googleapis.com/maps/api/staticmap?center=New+York&zoom=13&size=600x300&maptype=roadmap" }}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(16),
  },
  map: {
    width: "100%",
    height: verticalScale(150),
    borderRadius: scale(14),
  },
});
