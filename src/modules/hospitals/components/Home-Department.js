import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CategoryCard from './CategoryCard';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, SIZES, FONT } from '../../../config/constants';

const DepartmentsSection = ({
  categories = [],
  onViewAll,
  loading = false,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Departments</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <SkeletonPlaceholder>

          {/* Category skeletons */}
          <View style={styles.skeletonRow}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={styles.skeletonCardWrap}>
                <View style={styles.skeletonCircle} />
                <View style={styles.skeletonText} />
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>
      ) : (


        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(item => (
            <View key={item.id} style={{ marginHorizontal: 5 }}>
              <CategoryCard
                title={item.name}
                imageUrl={{ uri: item.imageUrl }}
              />
            </View>
          ))}
        </ScrollView>

      )}
    </>
  );
};

export default DepartmentsSection;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginBottom: scale(15),
    marginTop: verticalScale(20),
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  viewAll: {
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  skeletonRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    marginTop: verticalScale(5),
  },
  skeletonCardWrap: {
    alignItems: 'center',
    marginRight: scale(12),
  },
  skeletonCircle: {
    width: scale(90),
    height: scale(90),
    borderRadius: 45,
  },
  skeletonText: {
    marginTop: verticalScale(8),
    width: scale(70),
    height: 12,
    borderRadius: 4,
  },
});
