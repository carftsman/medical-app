import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale , verticalScale} from '../../../../utils/styling';
import { COLORS, SIZES, FONT } from '../../../../config/constants';

const WomenHospitalCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />

      <View style={styles.content}>
        <View style={styles.title} />
        <View style={styles.smallLine} />
        <View style={styles.smallLine} />
        <View style={styles.button} />
      </View>
    </View>
  );
};

export default WomenHospitalCardSkeleton;

const styles = StyleSheet.create({
  container: {
    width: scale(340),
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    marginVertical: verticalScale(12),
    alignSelf: 'center',
  },

  image: {
    height: verticalScale(180),
    backgroundColor: COLORS.lightGray,
  },

  content: {
    padding: scale(14),
  },

  title: {
    height: verticalScale(16),
    width: '70%',
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(6),
    marginBottom: verticalScale(10),
  },

  smallLine: {
    height: verticalScale(12),
    width: '60%',
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(6),
    marginBottom: verticalScale(8),
  },

  button: {
    height: verticalScale(28),
    width: '40%',
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(14),
    marginTop: verticalScale(10),
  },
});

