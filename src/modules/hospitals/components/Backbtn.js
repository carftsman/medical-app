import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Backbtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="chevron-back" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default Backbtn;

const styles = StyleSheet.create({
  container: {
    padding: 4, 
  },
});