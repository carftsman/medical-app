import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { scale, verticalScale } from "../utils/styling"; 

export default function LocationHeader() {
  const navigation = useNavigation();
  const { address } = useSelector(state => state.location);


  const formatPlaceCity = (fullAddress) => {
    if (!fullAddress) return "Select location";
    const parts = fullAddress.split(",").map(p => p.trim());
    return parts.length >= 4 ? `${parts[0]}, ${parts[3]}` : parts.join(", ");
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SelectLocation")}>
      <View style={styles.container}>
        <Ionicons
          name="location-sharp"
          size={scale(26)}
          color="#FF3B30"
        />
        <View style={styles.textWrap}>
          <Text style={styles.deliver}>Deliver to</Text>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.location}>
              {formatPlaceCity(address)}
            </Text>
            <Ionicons
              name="chevron-down"
              size={scale(14)}
              color="#fff"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrap: {
    marginLeft: scale(6),
  },
  deliver: {
    fontSize: scale(12),
    color: "#E0F7F4",
  },
  location: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#fff",
    maxWidth: scale(200),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
