import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


const Button = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,

      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '95%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 24,
    marginBottom:30,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});