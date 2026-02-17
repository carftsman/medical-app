import { React, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SIZES, FONT, COLORS} from '../../../../config/constants';
const WomenHospitalInfo = ({ hospital }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const categories = hospital?.specializations;
  const visibleCategories = categories.slice(0, 3);
  const remainingCount = categories.length - visibleCategories.length;
  const PHONE_NUMBER = '9876543210';
  const handleCallPress = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };
  return (
    <View>
      <Image source={{ uri: hospital.imageUrl }} style={styles.Imagebg}
      />
      <View style={styles.details}>
        <View style={styles.d1}>
          <Text style={styles.count}>{hospital?.stats.patients || 0}+</Text>
          <Text style={styles.sub}>Patients</Text>
        </View>
        <View style={styles.d1}>
          <Text style={styles.count}> {hospital?.stats.experienceYears || 0}+</Text>
          <Text style={styles.sub}>Exp.years</Text>
        </View>
        <View style={styles.d1}>
          <Text style={styles.count}>{hospital?.stats.reviews || 0}+</Text>
          <Text style={styles.sub}>Reviews</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.body}>
          <View style={styles.name}>
            <Text style={styles.Hname}>{hospital.name}</Text>
            <TouchableOpacity onPress={handleCallPress}>
              <Ionicons
                style={styles.phone}
                name="call"
                size={scale(26)}
                color="#364153"
              />
            </TouchableOpacity>

          </View>
          <View style={styles.distance}>
            <Ionicons name="location-outline" size={scale(19)} color="#364153" />
            <Text style={styles.location}> {hospital?.location.area}, {hospital?.location.city}, {hospital?.location.pincode} </Text>
            <Text style={styles.km}>{hospital?.distanceKm} km </Text>
          </View>
          <Text
            numberOfLines={show1 ? undefined : 2}
            onPress={() => setShow1(!show1)}
            style={styles.para}
          >
            {hospital?.description}
          </Text>
          <View style={styles.category}>
            <View style={styles.categorylist}>
              {visibleCategories.map((item, index) => (
                <Text key={index} style={styles.categorycard}>
                  {item}
                </Text>
              ))}
            </View>

            {remainingCount > 0 && (
              <Text style={styles.more}>+{remainingCount} more</Text>
            )}
          </View>


          <Text style={styles.Hname}>About Hospital</Text>
          <Text numberOfLines={show2 ? undefined : 2}
            onPress={() => setShow2(!show2)}
            style={styles.para}>
            {hospital?.about || "no data"}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default WomenHospitalInfo;
const styles = StyleSheet.create({

  Imagebg: {
    width: '100%',
    height: verticalScale(280),
    resizeMode: "cover",
  },

  details: {
    marginTop: verticalScale(-30),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderRadius: scale(18),
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  d1: {
    alignItems: 'center',
  },

  count: {
    fontSize: scale(24),
    fontFamily: FONT.medium,
    color: COLORS.pink,
  },

  sub: {
    fontSize: scale(11),
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },

  phone: {
    padding: scale(6),
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(20),
  },

  main: {
    padding: scale(16),
  },

  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  Hname: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.medium,
    marginVertical: verticalScale(6),
    color: COLORS.darkgray,
  },

  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },

  location: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },

  km: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.pink,
  },

  para: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    lineHeight: verticalScale(22),
    paddingVertical: verticalScale(8),
    color: COLORS.gray,
  },

  category: {
    marginVertical: verticalScale(10),
  },

  categorylist: {
    flexDirection: 'row',
    gap: scale(10),
    flexWrap: 'wrap',
  },

  categorycard: {
    fontSize: scale(13),
    fontFamily: FONT.medium,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(16),
    borderWidth: scale(1),
    borderColor: COLORS.pink,
    color: COLORS.pink,
    backgroundColor: COLORS.lightpink,
    marginBottom: verticalScale(6),
  },

  more: {
    marginTop: verticalScale(8),
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
    backgroundColor: COLORS.lightGray,
    color: COLORS.gray,
    fontFamily: FONT.medium,
    fontSize: scale(SIZES.small),
  },

});
