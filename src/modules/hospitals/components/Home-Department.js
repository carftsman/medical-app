import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import CategoryCard from './CategoryCard';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, SIZES, FONT } from '../../../config/constants';

const DepartmentsSection = ({
  categories = [],
  onViewAll,
  loading = false,
  onCategoryPress,
}) => {
  const handleCategoryPress = (item) => {
  onCategoryPress?.(item);
};

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Departments</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.skeletonRow}>
            {[1, 2, 3, 4].map(i => (
              <View key={i} style={styles.skeletonCardWrap}>
                <View style={styles.skeletonCircle} />
                <View style={styles.skeletonText} />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(item => (
            <TouchableOpacity key={item.id} style={{ marginHorizontal: 5 }}
            onPress={() => handleCategoryPress(item)}>
              <CategoryCard
                title={item.name}
                imageUrl={{ uri: item.imageUrl }}
              />
            </TouchableOpacity>
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

  /* Skeleton (pure View-based) */
  skeletonRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
  },
  skeletonCardWrap: {
    alignItems: 'center',
    marginRight: scale(12),
  },
  skeletonCircle: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    backgroundColor: '#E5E7EB',
  },
  skeletonText: {
    marginTop: verticalScale(8),
    width: scale(70),
    height: verticalScale(12),
    borderRadius: scale(4),
    backgroundColor: '#D1D5DB',
  },
});
