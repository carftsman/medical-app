import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import Icon from 'react-native-vector-icons/Feather';

const ReceiptButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name="download" size={scale(16)} color="#fff" />
      <Text style={styles.text}>Download Receipt</Text>
    </TouchableOpacity>
  );
};

export default ReceiptButton;

const styles = StyleSheet.create({
  button: {
    marginTop: verticalScale(40),
    height: verticalScale(48),
    borderRadius: scale(24),
    backgroundColor: '#EC5E95',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
  },
  text: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '600',
  },
});
