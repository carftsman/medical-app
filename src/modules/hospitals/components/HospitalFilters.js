import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../../../utils/styling';

const HospitalFilters = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="tune-variant" size={scale(20)} color="#2979FF" />
  </TouchableOpacity>
);

export default HospitalFilters;

const styles = StyleSheet.create({
  container: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },
});
