import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const Backbtn = ({ onPress }) => {
  const navigation = useNavigation();

  const handleNavigate = () => {
    if (onPress) {
      onPress();
      return;
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name="arrow-left" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default Backbtn;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
