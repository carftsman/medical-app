import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling";

export default function DoctorCard({
  name,
  specialization,
  experience,
  rating,
  reviews,
}) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../../../../assets/Doctor.jpg")}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.subtitle}>
          {specialization}
          <Text style={styles.exp}> | {experience} Years</Text>
        </Text>

        <Text style={styles.rating}>
          ⭐⭐⭐⭐⭐ {rating} ({reviews} reviews)
        </Text>
      </View>
    </View>
  );
}
 const styles = StyleSheet.create({ 
 card: { flexDirection: "row", backgroundColor: "#FFF0F5",// keep same light pink 
 borderRadius: scale(18), 
 paddingVertical: verticalScale(18), 
 paddingHorizontal: scale(16), 
 marginTop: verticalScale(20), 
 alignItems: "center",
}, 
image: {
   width: scale(70), height: scale(80), borderRadius: scale(20), marginRight: scale(14), }, 
   name: { fontSize: scale(16), fontWeight: "600", color: "#222", }, 
   subtitle: { fontSize: scale(13), color: "#666", marginTop: verticalScale(3), }, 
   exp: { color: "#27AE60", fontWeight: "500", }, 
rating: { fontSize: scale(12), color: "#F2994A", marginTop: verticalScale(6), },
});