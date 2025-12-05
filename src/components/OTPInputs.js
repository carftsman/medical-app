
import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../config/constants";

export default function OTPInputs({ length, values, onChange, onKeyPress }) {
  const inputsRef = useRef([]);

  const focusNext = (index, text) => {
    if (text && index < length - 1) {
      const next = inputsRef.current[index + 1];
      next?.focus?.();
    }
  };

  const focusPrevious = (index) => {
    if (index > 0) {
      const prev = inputsRef.current[index - 1];
      prev?.focus?.();
    }
  };

  const safeOnKeyPress = (index, e) => {
    if (typeof onKeyPress === "function") {
      onKeyPress(index, e);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={values[index]}
          autoFocus={index === 0}
          onChangeText={(text) => {
            onChange(index, text);
            focusNext(index, text);
          }}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace" && !values[index]) {
              focusPrevious(index);
            }
            safeOnKeyPress(index, e);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginTop: 10,
  },

  input: {
    width: 48,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
});
