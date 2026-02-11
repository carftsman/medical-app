import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../config/constants';
import { scale } from '../../../utils/styling';

const SkeletonBox = ({ width, height, style }) => {
  return (
    <View style={[styles.box, { width, height }, style]} />
  );
};

export default SkeletonBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(6),
  },
});
