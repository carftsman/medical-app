import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../../../redux/slices/favouritesSlice';


const DoctorCard = ({ doctor }) => {
  
  if (!doctor) return null;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favourites = useSelector(state => state.favourites.items);
  const isFavourite = favourites.some(d => d.id === doctor.id);

  
  const {
  imageUrl,
  doctorName,
  specialization,
  rating,
  hospitalName,
  experience,
  fee,
  availableDate,
  availableTime,
  
} = doctor;
  

  
  return (
    <View style={styles.card}>
      {/* ❤️ Favourite */}
      <TouchableOpacity
  style={styles.favBtn}
  onPress={() => dispatch(toggleFavourite(doctor))}
>
  <Icon
    name={isFavourite ? "heart" : "heart-outline"}
    size={scale(28)}
    color={isFavourite ? "red" : COLORS.gray}
  />
</TouchableOpacity>

      <TouchableOpacity
  style={styles.cardContainer}
  activeOpacity={0.8}
  onPress={() => navigation.navigate('DoctorDetails')}
>
  {/* Top Row */}
  <View style={styles.topRow}>
    <Image source={{ uri: imageUrl }} style={styles.image} />

    <View style={styles.topContent}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{doctorName} </Text>

        <View style={styles.rating}>
          <Icon name="star" size={scale(14)} color="#FFC107" />
          <Text style={styles.ratingText}>{String(rating)}</Text>
        </View>
      </View>

      <Text style={styles.specialization}>
        {specialization} | 
        <Text style={styles.hospital}> {hospitalName}</Text>
      </Text>
    </View>
  </View>

  {/* Divider */}
  <View style={styles.divider} />

  {/* Info Row */}
  <View style={styles.infoRow}>
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>Experience</Text>
      <Text style={styles.infoValue}>{experience} years +</Text>
    </View>

    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>Fee</Text>
      <Text style={styles.infoValue}>₹{fee}/-</Text>
    </View>

    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>Available @ {availableDate}</Text>
      <Text style={styles.infoValue}>{availableTime}</Text>
    </View>
  </View>
</TouchableOpacity>


      {/* Book Button */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate('DoctorDetails')}
      >
        <Text style={styles.bookText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    padding: scale(9),
    marginBottom: verticalScale(18),
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
  },

cardContainer: {
  backgroundColor: '#fff',
  borderRadius: scale(12),
  marginBottom: scale(-4),
  padding: scale(1),
  elevation: 2,
},

  favBtn: {
    position: 'absolute',
    right: scale(9),
    bottom: verticalScale(15),
    zIndex: 20,
  },

  topRow: {
    flexDirection: 'row',
  },

  image: {
    width: scale(64),
    height: verticalScale(64),
    fitmode: 'cover',
    borderRadius: scale(8),
  },

  topContent: {
    flex: 1,
    marginLeft: scale(12),
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: verticalScale(4),
  },

  name: {
    fontSize: scale(18),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    right: scale(6),
  },

  ratingText: {
    marginLeft: scale(4),
    fontSize: scale(14),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },

  specialization: {
    marginTop: verticalScale(8),
    fontSize: scale(15),
    color: COLORS.black,
    fontFamily: FONT.bold,
  },

  hospital: {
    marginTop: verticalScale(4),
    fontSize: scale(14),
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },

  divider: {
    height: verticalScale(1),
    backgroundColor: COLORS.lightblue,
    marginVertical: verticalScale(10),
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.verylightblue,
    borderRadius: scale(8),
    marginTop: verticalScale(-16),
    paddingVertical: verticalScale(6),
    borderRadius: scale(12),
    paddingHorizontal: scale(2),
  },

  infoBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },

  infoLabel: {
    fontSize: scale(11),
    color: COLORS.gray,
    fontFamily: FONT.bold,
    marginLeft: scale(-17),
  },

  infoValue: {
    marginTop: verticalScale(4),
    fontSize: scale(14),
    marginLeft: scale(-17),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  bookBtn: {
    marginTop: verticalScale(12),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(22),
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    marginRight: scale(30),
  },

  bookText: {
    fontSize: scale(14),
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
});




