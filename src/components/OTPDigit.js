
import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "../config/constants";

const OTPDigit = React.memo(
  React.forwardRef(({ value, onChange, onKeyPress, autoFocus }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        value={value}
        onChangeText={onChange}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
        textContentType="oneTimeCode"
        importantForAutofill="yes"
        caretHidden={false}
        selectionColor="#000"
      />
    );
  })
);

const styles = StyleSheet.create({
  input: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 6,
    backgroundColor: COLORS.white,
    color:COLORS.black,
  },
});

export default OTPDigit;
