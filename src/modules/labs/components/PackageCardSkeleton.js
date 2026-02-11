import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonBox from './SkeletonBox';
import { COLORS } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const PackageCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <SkeletonBox width={82} height={82} />

        <View style={styles.content}>
          <SkeletonBox width="70%" height={22} />
          <SkeletonBox width="40%" height={18} style={styles.space} />
          <SkeletonBox width="90%" height={18} style={styles.space} />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <SkeletonBox width="48%" height={44} />
        <SkeletonBox width="48%" height={44} />
      </View>
    </View>
  );
};

export default PackageCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(12),
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    marginLeft: scale(12),
    flex: 1,
  },
  space: {
    marginTop: verticalScale(6),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
  },
});
