import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../../utils/styling';
import {SIZES, FONT, COLORS} from '../../../../config/constants';

const WomenHospitalCard = ({
  image,
  hospitalName = '',
  distance,
  location = '',
  description = '',
  rating,
  isFavorite = false,
  onFavoritePress,
  onViewDetails,
}) => {
  const imageSource =
    typeof image === 'string'
      ? { uri: image }
      : image;

  return (
    <View style={styles.container}>
      <TouchableOpacity
  style={styles.imageWrapper}
  activeOpacity={0.9}
  onPress={onViewDetails}
>

        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        <View style={styles.ratingBadge}>
          <Icon name="star" size={scale(14)} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
       style={styles.content}
       onPress={onViewDetails}>
        <View style={styles.rowBetween}>
          <Text style={styles.hospitalName} numberOfLines={1}>
            {hospitalName}
          </Text>

        </View>

        <TouchableOpacity
  style={styles.locationRow}
  activeOpacity={0.8}
  onPress={onViewDetails}   // or any function you want
>

          {distance !== undefined && distance !== null && (
            <>
              <TouchableOpacity style={styles.iconTextRow}
              onPress={onViewDetails}>
                <Icon name="navigation" size={scale(13)} color='#c84ba2' />
                <Text style={styles.distanceText}>
                  {Number(distance).toFixed(1)} km
                </Text>

              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          )}

          <TouchableOpacity
           style={styles.iconTextRow}
           onPress={onViewDetails} />
            <Icon name="map-marker-outline" size={scale(13)} color={COLORS.pink} />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          
        </TouchableOpacity>

        {!!description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}

        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.viewDetailsBtn}
            onPress={onViewDetails}
            activeOpacity={0.85}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>

          {typeof onFavoritePress === 'function' && (
            <TouchableOpacity
              style={styles.favBtn}
              onPress={onFavoritePress}
              activeOpacity={0.8}
            >
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={scale(26)}
                color={isFavorite ? '#FF2727' : '#999'}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
//
export default WomenHospitalCard;

const styles = StyleSheet.create({

  container: {
    width: scale(340),
    borderRadius: scale(15),
    borderWidth: scale(1.2),
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    marginVertical: verticalScale(12),
    alignSelf: 'center',
  },

  imageWrapper: {
    height: verticalScale(180),
    backgroundColor: COLORS.lightGray,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
  },

  emergencyBadge: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    backgroundColor: COLORS.danger,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  emergencyText: {
    color: COLORS.white,
    fontSize: scale(11),
    marginLeft: scale(4),
    fontFamily: FONT.medium,
  },

  ratingBadge: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(24),
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  ratingText: {
    marginLeft: scale(4),
    fontSize: scale(SIZES.small),
    color: COLORS.black,
    fontFamily: FONT.medium,
  },

  content: {
    padding: scale(14),
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hospitalName: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.bold,
    color: COLORS.black,
    flex: 1,
    marginRight: scale(8),
  },

  openBadge: {
    backgroundColor: COLORS.green,
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
  },

  openText: {
    color: COLORS.white,
    fontSize: scale(11),
    fontFamily: FONT.medium,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(6),
  },

  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  distanceText: {
    marginLeft: scale(4),
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.pink,
  },

  divider: {
    width: scale(1),
    height: verticalScale(14),
    backgroundColor: COLORS.lightGray,
    marginHorizontal: scale(8),
  },

  locationText: {
    marginLeft: scale(4),
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.gray,
    flexShrink: 1,
  },

  description: {
    marginTop: verticalScale(6),
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },

  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  viewDetailsBtn: {
    flex: 1,
    borderWidth: scale(1),
    borderColor: COLORS.pink,
    borderRadius: scale(14),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    marginRight: scale(10),
  },

  viewDetailsText: {
    color: COLORS.pink,
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
  },

  favBtn: {
    padding: scale(6),
  },

});
