import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2].map(i => (
            <View key={i} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />

              <View style={styles.skeletonLineLarge} />
              <View style={styles.skeletonLineMedium} />
              <View style={styles.skeletonLineSmall} />

              <View style={styles.skeletonMetaRow}>
                <View style={styles.skeletonMeta} />
                <View style={styles.skeletonMetaSmall} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {hospitals.map(item => (
            <TouchableOpacity key={item.id} style={{ marginLeft: 6 }} onPress={() => onDetails(item.id)}> 
              <HospitalCardmain
                image={item.imageUrl ? { uri: item.imageUrl } : null}
                hospitalName={item.name}
                distance={
                  item.distance != null
                    ? `${Number(item.distance).toFixed(1)} km`
                    : '-- km'
                }
                location={item.place}
                description={item.speciality}
                isOpen24Hours={item.isOpen}
                isFavorite={!!favorites[item.id]}
                onFavoritePress={() => onToggleFav(item.id)}
                onViewDetails={() => onDetails(item.id)}
              />
            </TouchableOpacity>
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

  
  skeletonCard: {
    width: scale(260),
    height: verticalScale(310),
    borderRadius: scale(12),
    marginLeft: scale(15),
    padding: scale(12),
    //backgroundColor: '#E5E7EB',
  },
  skeletonImage: {
    width: '100%',
    height: verticalScale(140),
    borderRadius: scale(8),
    backgroundColor: '#D1D5DB',
    marginBottom: verticalScale(12),
  },
  skeletonLineLarge: {
    width: '80%',
    height: verticalScale(16),
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    marginBottom: verticalScale(8),
  },
  skeletonLineMedium: {
    width: '60%',
    height: verticalScale(14),
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    marginBottom: verticalScale(6),
  },
  skeletonLineSmall: {
    width: '50%',
    height: verticalScale(14),
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    marginBottom: verticalScale(12),
  },
  skeletonMetaRow: {
    flexDirection: 'row',
  },
  skeletonMeta: { 
    width: scale(70),
    height: verticalScale(12),
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
    marginRight: scale(10),
  },
  skeletonMetaSmall: {
    width: scale(50),
    height: verticalScale(12),
    backgroundColor: '#D1D5DB',
    borderRadius: 6,
  },
});
