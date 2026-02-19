import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import {SIZES, FONT, COLORS} from '../../../../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const WomenHospitalDoctorCard = ({ doctor, HOSPITAL_ID, }) => {
  const navigation = useNavigation();
  console.log("IMAGE URL:", doctor?.imageUrl);


  return (
    <TouchableOpacity style={styles.docCard}
      onPress={() =>
        navigation.navigate('WomenDoctorDetails', {
          hospitalId: HOSPITAL_ID,
          doctorId: doctor?.id,
        })
      }
    >

      <ImageBackground
        source={{ uri: doctor.imageUrl }}
        style={styles.docimg}
        resizeMode='cover'
      >
        <View style={styles.rating}>
          <Text style={styles.docexp}>{doctor.experience} years</Text>
          <View style={styles.rev}>
            <Ionicons name="star" size={scale(16)} color="#F5C518" />
            <Text>{doctor.rating}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.docDetails}>
        <Text style={styles.docName}>{doctor.name}</Text>
        <Text style={styles.docLocation}>{doctor.specialization}</Text>
        <Text style={styles.docLocation}>{doctor.qualification}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WomenHospitalDoctorCard;
const styles = StyleSheet.create({

  docCard: {
    width: scale(200),
    height: verticalScale(224),
    borderWidth: scale(1.86),
    borderColor: COLORS.pink,
    borderRadius: scale(15.6),
    marginBottom: verticalScale(20),
    overflow: 'hidden',
  },

  docimg: {
    width: "100%",
    height: verticalScale(139),
  },

  docexp: {
    width: scale(60),
    height: verticalScale(20.75),
    borderRadius: scale(19),
    backgroundColor: COLORS.pink,
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(6),
    marginBottom: verticalScale(70),
    marginRight: scale(10),
    marginTop: verticalScale(10),
  },

  docexpText: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.white,
    textAlign: 'center',
  },

  rev: {
    flexDirection: "row",
    gap: scale(7),
    marginRight: scale(10),
  },

  docDetails: {
    backgroundColor: COLORS.pink,
    flexDirection: 'column',
    alignItems: 'center',
    width: scale(200),
    flex: 1,
  },

  docName: {
    fontSize: scale(17.25),
    fontFamily: FONT.medium,
    color: COLORS.white,
  },

  docLocation: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.white,
    opacity: 0.8,   // instead of #FDFDFDCC
  },

  rating: {
    alignItems: 'flex-end',
    gap: scale(10),
  },

});
