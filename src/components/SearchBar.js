import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { scale, verticalScale } from "../utils/styling"; 

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChangeText,
}) {
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    marginHorizontal: scale(1),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(10),
    backgroundColor: "#fff",
    borderRadius: scale(10),
    height: verticalScale(48),
    justifyContent: "center",
    paddingHorizontal: scale(12),
    borderWidth: 1,
    borderColor: "#00000070",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: scale(6),
    shadowOffset: { width: 0, height: verticalScale(3) },
  },

  searchInput: {
    fontSize: scale(14),
    color: "#111",
    backgroundColor: "#fff",
  },
});
