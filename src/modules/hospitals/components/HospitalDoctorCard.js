import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const HospitalDoctorCard = ({ doctor }) => {
 const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.docCard} onPress={()=>navigation.navigate('DoctorDetails',{
      doctorId: doctor?.id
    })}>
      <ImageBackground
        source={{ uri: doctor.imageUrl }}
        style={styles.docimg}
        resizeMode='center'
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

export default HospitalDoctorCard;
const styles = StyleSheet.create({
  docCard: {
    width: scale(200),
    height: verticalScale(224),
    borderWidth: scale(1.86),
    borderColor: "#056FD2",
    borderRadius: scale(15.6),
    marginBottom: verticalScale(20),
    overflow: 'hidden',
  
  },
  docimg: {
    width: "100%",
    height: verticalScale(139),
    objectFit: 'contain',
  },
  docexp: {
    width: scale(60),
    height: verticalScale(20.75),
    borderRadius: scale(19),
    backgroundColor: "#056FD2",
    color: "#fff",
    alignItems: 'center',
    paddingHorizontal: scale(6),
    marginBottom: verticalScale(70),
    fontSize: scale(12),
    textAlign: 'center',
    marginRight: scale(10),
    marginTop: verticalScale(10)
  },
  rev: {
    flexDirection: "row",
    gap: 7,
    marginRight: scale(10)
  },
  docDetails: {
    backgroundColor: "#056FD2",
    flexDirection: 'column',
    alignItems: 'center',
    width: scale(200),
    flex: 1
  },
  docName: {
    fontSize: scale(17.25),
    fontWeight: "600",
    color: "#FFFFFF"
  },
  docLocation: {
    fontSize: scale(12),
    fontWeight: "500",
    color: "#FDFDFDCC"
  },
  rating: {
    alignItems: 'flex-end',
    gap: scale(10),

  },
})