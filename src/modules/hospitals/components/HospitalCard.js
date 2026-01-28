// ======================= HospitalCard.js =======================
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../../../utils/styling';

const HospitalCard = ({
  image,
  hospitalName = '',
  distance = '',
  location = '',
  description = '',
  isEmergency = true,
  isOpen24Hours = true,
  isFavorite = true,
  onFavoritePress,
  onViewDetails,
}) => {
  return (
    <View style={styles.container}>
      {/* IMAGE SECTION */}
      <View style={styles.imageWrapper}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* EMERGENCY BADGE */}
        {isEmergency && (
          <View style={styles.emergencyBadge}>
            <Icon name="alert-circle" size={scale(14)} color="#FFF" />
            <Text style={styles.emergencyText}>Emergency</Text>
          </View>
        )}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {/* NAME + OPEN */}
        <View style={styles.rowBetween}>
          <Text style={styles.hospitalName} numberOfLines={1}>
            {hospitalName}
          </Text>

          {isOpen24Hours && (
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open 24 hrs</Text>
            </View>
          )}
        </View>

        {/* LOCATION */}
        <View style={styles.locationRow}>
          {!!distance && (
            <>
              <View style={styles.iconTextRow}>
                <Icon name="navigation" size={scale(13)} color="#056FD2" />
                <Text style={styles.distanceText}>{distance}</Text>
              </View>
              <View style={styles.divider} />
            </>
          )}

          <View style={styles.iconTextRow}>
            <Icon name="map-marker-outline" size={scale(13)} color="#777" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* ACTIONS BELOW (VIEW + FAVORITE) */}
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
                size={scale(18)}
                color={isFavorite ? '#FF2727' : '#999'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default HospitalCard;

/* ======================= STYLES ======================= */

const styles = StyleSheet.create({
  container: {
    width: scale(340),
    borderRadius: scale(15),
    borderWidth: scale(1.2),
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    marginVertical: scale(12),
    alignSelf: 'center',
  },

  imageWrapper: {
    height: scale(180),
    backgroundColor: '#F2F4F7',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EAEAEA',
  },

  emergencyBadge: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    backgroundColor: '#FB2C36',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  emergencyText: {
    color: '#FFF',
    fontSize: scale(11),
    marginLeft: scale(4),
    fontWeight: '600',
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
    fontSize: scale(16),
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: scale(8),
  },

  openBadge: {
    backgroundColor: '#00C950',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },

  openText: {
    color: '#FFF',
    fontSize: scale(11),
    fontWeight: '600',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(6),
  },

  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  distanceText: {
    marginLeft: scale(4),
    fontSize: scale(13),
    color: '#056FD2',
  },

  divider: {
    width: 1,
    height: scale(14),
    backgroundColor: '#DADADA',
    marginHorizontal: scale(8),
  },

  locationText: {
    marginLeft: scale(4),
    fontSize: scale(13),
    color: '#777',
  },

  description: {
    marginTop: scale(6),
    fontSize: scale(13),
    color: '#777',
  },

  /* NEW BOTTOM ACTIONS */
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(10),
  },

  viewDetailsBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#056FD2',
    borderRadius: scale(14),
    paddingVertical: scale(6),
    alignItems: 'center',
    marginRight: scale(10),
  },

  viewDetailsText: {
    color: '#056FD2',
    fontSize: scale(12),
    fontWeight: '600',
  },

  favBtn: {
    padding: scale(6),
  },
});
