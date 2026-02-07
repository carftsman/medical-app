import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import { COLORS } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const PackageDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonBox width="100%" height={verticalScale(300)} />

      <View style={styles.content}>
        <SkeletonBox width="70%" height={26} />
        <SkeletonBox width="100%" height={18} style={styles.space} />
        <SkeletonBox width="90%" height={18} style={styles.space} />

        <SkeletonBox width="100%" height={44} style={styles.bigSpace} />
        <SkeletonBox width="100%" height={44} style={styles.space} />
      </View>

      <View style={styles.bottom}>
        <SkeletonBox width="40%" height={24} />
        <SkeletonBox width="40%" height={44} />
      </View>
    </View>
  );
};

export default PackageDetailsSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: scale(16),
  },
  space: {
    marginTop: verticalScale(8),
  },
  bigSpace: {
    marginTop: verticalScale(20),
  },
  bottom: {
    marginTop: 'auto',
    padding: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
