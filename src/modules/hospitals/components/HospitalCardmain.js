import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../utils/styling';

const HospitalCardmain = ({
  image,
  hospitalName,
  distance,
  location,
  description,
  isEmergency,
  isOpen24Hours,
  isFavorite,
  onFavoritePress,
  onViewDetails,
}) => {
  return (
    <View style={styles.container}>
        
      {/* Image */}
      <View style={styles.imageWrapper}>
{image ? (
  <Image source={image} style={styles.image} />
) : (
  <View style={[styles.image, { backgroundColor: '#E5E7EB' }]} />
)}

        {isEmergency && (
          <View style={styles.emergencyBadge}>
            <Icon name="alert-circle" size={scale(14)} color="#FFF" />
            <Text style={styles.emergencyText}>Emergency</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.rowBetween}>
      <Text
        style={styles.hospitalName}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {hospitalName}
      </Text>

          {isOpen24Hours && (
            <View style={styles.openBadge}>
              <Icon name="clock-outline" size={scale(14)} color="#FFF" />
              <Text style={styles.openText}>Opens 24 hours</Text>
            </View>
          )}
        </View>

        <View style={styles.locationRow}>
          <View style={styles.iconTextRow}>
            <Icon name="navigation" size={scale(14)} color="#056FD2" />
            <Text style={styles.distanceText}>{distance}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.iconTextRow}>
            <Icon name="map-marker-outline" size={scale(14)} color="#777" />
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {location}
          </Text>
          </View>
        </View>

        <Text
          style={styles.description}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>


        <TouchableOpacity style={styles.button} onPress={onViewDetails}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Favorite */}
      <TouchableOpacity style={styles.favIcon} onPress={onFavoritePress}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={scale(20)}
          color={isFavorite ? '#FF2727' : '#C4C4C4'}
          
        />
      </TouchableOpacity>
    </View>
  );
};

export default HospitalCardmain;

const styles = StyleSheet.create({
  container: {
    width: scale(260),
    height: verticalScale(310),
    borderRadius: scale(10),
    borderWidth: scale(1.2),
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    marginVertical: verticalScale(16),
    marginHorizontal: scale(7),
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: verticalScale(150),
  },

  emergencyBadge: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(10),
    backgroundColor: '#FB2C36',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  emergencyText: {
    color: '#FFF',
    fontSize: scale(12),
    marginLeft: scale(4),
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
    fontSize: scale(14),
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: scale(8),
  },

  openBadge: {
    backgroundColor: '#00C950',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(4),
    borderRadius: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },

  openText: {
    color: '#FFF',
    fontSize: scale(10),
    marginLeft: scale(4),
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
    fontSize: scale(13),
    color: '#056FD2',
  },

  divider: {
    width: scale(1),
    height: verticalScale(14),
    backgroundColor: '#DADADA',
    marginHorizontal: scale(8),
  },

  locationText: {
    marginLeft: scale(4),
    fontSize: scale(13),
    color: '#777',
  },

  description: {
    marginTop: verticalScale(6),
    fontSize: scale(13),
    color: '#777',
  },

  button: {
    marginTop: verticalScale(12),
    borderWidth: scale(1),
    borderColor: '#2979FF',
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    width: scale(180),        // ✅ fixed
    alignItems: 'center',
    backgroundColor: '#056FD2',
  },

  buttonText: {
    color: '#FFF',
    fontSize: scale(14),
    fontWeight: '600',
  },

  favIcon: {
    position: 'absolute',
    bottom: verticalScale(12),
    right: scale(14),
    padding: scale(3),      
  },
});
