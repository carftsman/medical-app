import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MedicinesFeedbackSubmitButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && { opacity: 0.6 }
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MedicinesFeedbackSubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
