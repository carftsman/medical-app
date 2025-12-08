import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ placeholder = "Search..." }) {
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
//   searchWrapper: {
//   marginHorizontal: 16,
//   marginTop: 16,
//   marginBottom: 8,
//   backgroundColor: "#fff", 
//   borderWidth: 1,
//   borderColor: "#00000070",             
//   height: 50,
//   justifyContent: "center",
//   paddingHorizontal: 12,
//   borderRadius: 10,
//   keyboardShouldPersistTaps: "handled",
//  zIndex: -1,
// },
searchWrapper: {
  marginHorizontal: 1,
  marginTop: 16,
  marginBottom: 10,
  backgroundColor: "#fff",
  borderRadius: 10,
  height: 48,
  justifyContent: "center",
  paddingHorizontal: 12,

  // Soft modern border
  borderWidth: 1,
borderColor: "#00000070",
  // Premium subtle shadow
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

searchInput: {
  fontSize: 14,
  color: "#111",
},

searchInput: {
  fontSize: 14,
  color: "#111",
  backgroundColor: "#fff",     // ensure inside stays white
},

});
