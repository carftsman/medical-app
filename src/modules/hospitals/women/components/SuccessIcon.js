import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from '../../../../utils/styling';
import Icon from 'react-native-vector-icons/Ionicons';

const SuccessIcon = () => {
  return (
    <View style={styles.outerCircle}>
      <View style={styles.middleCircle}>
        <View style={styles.innerCircle}>
          <Icon name="check" size={scale(28)} color="#fff" />
        </View>
      </View>
    </View>
  );
};

export default SuccessIcon;

const styles = StyleSheet.create({
  outerCircle: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#FADBE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleCircle: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    backgroundColor: '#F6A9C5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: "#F47FBB",
    justifyContent: 'center',
    alignItems: 'center',
  },
});
