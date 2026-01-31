import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import HospitalCardmain from './HospitalCardmain';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, SIZES, FONT } from '../../../config/constants';

const HospitalsSection = ({
  hospitals = [],
  favorites = {},
  onToggleFav,
  onViewAll,
  onDetails,
  loading = false,
}) => {
  return (
    <>
      
      <View style={styles.header}>
        <Text style={styles.title}>Near by Hospitals</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.skeletonRow}>
            {[1, 2].map(i => (
              <View key={i} style={styles.skeletonCard}>
                <View style={styles.skeletonImage} />

                <View style={styles.skeletonContent}>
                  <View style={styles.skeletonTitleLine} />
                  <View style={styles.skeletonSubLine} />
                  <View style={styles.skeletonSubLineSmall} />

                  <View style={styles.skeletonMetaRow}>
                    <View style={styles.skeletonMeta} />
                    <View style={styles.skeletonMetaSmall} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hospitals.map(item => (
            <View key={item.id} style={{ marginLeft: 6 }}>
            <HospitalCardmain
              key={item.id}
              image={item.imageUrl ? { uri: item.imageUrl } : null}
              hospitalName={item.name}
              distance={`${item.distance.toFixed(1)} km`}
              location={item.place}
              description={item.speciality}
              isOpen24Hours={item.isOpen}
              isFavorite={!!favorites[item.id]}
              onFavoritePress={() => onToggleFav(item.id)}
              onViewDetails={() => onDetails(item.id)}
            />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default HospitalsSection;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: verticalScale(24),
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
    marginTop: verticalScale(12),
  },
  skeletonCard: {
    width: scale(260),
    height: verticalScale(310),
    borderRadius: scale(10),
    marginRight: scale(12),
    padding: scale(12),
  },
  skeletonImage: {
    width: '100%',
    height: verticalScale(140),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonTitleLine: {
    width: '80%',
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSubLine: {
    width: '60%',
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
  skeletonSubLineSmall: {
    width: '50%',
    height: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonMetaRow: {
    flexDirection: 'row',
  },
  skeletonMeta: {
    width: 70,
    height: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  skeletonMetaSmall: {
    width: 50,
    height: 12,
    borderRadius: 4,
  },
});
