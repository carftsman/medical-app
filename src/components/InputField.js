
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 327,
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 202,
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
});

export default InputField;
