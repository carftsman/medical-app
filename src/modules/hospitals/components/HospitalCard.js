import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {scale} from '../../../utils/styling'
const HospitalCard = ({
  image,hospitalName,distance,location,description,isEmergency,isOpen24Hours,onViewDetails,
}) => {
  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />

        
       {isEmergency && (
  <View style={styles.emergencyBadge}>
    <Icon
      name="alert-circle"
      size={scale(14)}
      color="#FFFFFF"
    />
    <Text style={styles.emergencyText}>Emergency</Text>
  </View>
)}

      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.hospitalName}>{hospitalName}</Text>
{isOpen24Hours && (
  <View style={styles.openBadge}>
    <Icon
      name="clock-outline"
      size={scale(14)}
      color="#FFFFFF"
    />
    <Text style={styles.openText}>Opens 24 hours</Text>
  </View>
)}

        </View>

        <View style={styles.locationRow}>
  {/* Distance */}
  <View style={styles.iconTextRow}>
    <Icon
      name="navigation"
      size={scale(14)}
      color="#1E88E5"
    />
    <Text style={styles.distanceText}>{distance}</Text>
  </View>

  {/* Divider */}
  <View style={styles.divider} />

  {/* Location */}
  <View style={styles.iconTextRow}>
    <Icon
      name="map-marker-outline"
      size={scale(14)}
      color="#777"
    />
    <Text style={styles.locationText}>{location}</Text>
  </View>
</View>


        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <TouchableOpacity style={styles.button} onPress={onViewDetails}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

      </View>
       {/*  Favorite Icon */}
      {/* <TouchableOpacity
        style={styles.favIcon}
        onPress={onFavoritePress}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={scale(18)}
          color={isFavorite ? '#FF2727' : '#C4C4C4'}
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default HospitalCard;
const styles = StyleSheet.create({
  container: {
    width: scale(340),
    borderRadius: scale(15),
    borderWidth: scale(1.2),
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    margin: scale(16),
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: scale(180),
  },

  emergencyBadge: {
  position: 'absolute',
  top: scale(10),
  right: scale(10),
  backgroundColor: '#FB2C36',
  paddingHorizontal: scale(10),
  paddingVertical: scale(4),
  borderRadius: scale(14),
  flexDirection: 'row',
  alignItems: 'center',
},

emergencyText: {
  color: '#FFFFFF',
  fontSize: scale(12),
  fontWeight: '500',
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
    fontSize: scale(16),
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: scale(8),
  },

  openBadge: {
  backgroundColor: '#00C950',
  paddingHorizontal: scale(10),
  paddingVertical: scale(4),
  borderRadius: scale(14),
  flexDirection: 'row',
  alignItems: 'center',
},

openText: {
  color: '#FFFFFF',
  fontSize: scale(11),
  fontWeight: '600',
  marginLeft: scale(4),
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
  fontWeight: '500',
},

divider: {
  width: scale(1),
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

  button: {
    marginTop: scale(12),
    borderWidth: scale(1),
    borderColor: '#2979FF',
    borderRadius: scale(20),
    paddingVertical: scale(8),
    alignItems: 'center',
  },

  buttonText: {
    color: '#056FD2',
    fontSize: scale(14),
    fontWeight: '600',
  },

favIcon: {
    position: 'absolute',
    bottom: scale(14),
    right: scale(14),
    width: scale(20),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },

});
