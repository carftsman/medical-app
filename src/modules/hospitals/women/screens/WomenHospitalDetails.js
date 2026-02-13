import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWomenHospital } from "../hooks/useWomenHospital";
import { useWomenHospitalDoctors } from "../hooks/useWomenHospitalDoctors"
import AntDesign from 'react-native-vector-icons/AntDesign';
import WomenHospitalDoctorList from '../components/WomenHospitalDetails-DoctorList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from '../../../../utils/styling';
import {COLORS, FONT, SIZES} from '../../../../config/constants';
import WomenHospitalContactInfo from '../components/WomenHospitalDetails-ContactInfo';
import WomenHospitalInfo from '../components/WomenHospitalDetails-Info';
import Backbtn from '../../components/Backbtn';

const WomenHospitalDetails = ({ route }) => {

  const HOSPITAL_ID = route.params.id || 1;

  const navigation = useNavigation();
  const {
    hospital,
    loading,
    error,
  } = useWomenHospital(HOSPITAL_ID);

  const { doctors } = useWomenHospitalDoctors(HOSPITAL_ID);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#056FD2" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Backbtn onPress={() => navigation.goBack()} />
        <Text style={styles.screenHeaderText}>Hospital Info</Text>
        <View style={{ width: scale(26) }}></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <WomenHospitalInfo hospital={hospital} />
        <WomenHospitalDoctorList doctor={doctors} hospitalId={HOSPITAL_ID} />
        <WomenHospitalContactInfo
          hospital={hospital}
          hospitalId={HOSPITAL_ID}
        />

      </ScrollView>
      <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate('WomenDoctorsScreen', {
        hospitalId: HOSPITAL_ID,
      })}>
        <Text style={styles.book}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WomenHospitalDetails;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(10),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },

  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(22),
    fontFamily: FONT.medium,
    color: COLORS.darkgray,
  },

  backbtn: {
    justifyContent: 'flex-start',
    position: 'absolute',   // 🔥 fixed → absolute (correct in RN)
    left: scale(30),
    top: verticalScale(40),
  },

  book: {
    color: COLORS.white,
    fontSize: scale(SIZES.medium),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontFamily: FONT.medium,
  },

  bookbtn: {
    borderRadius: scale(30),
    backgroundColor: COLORS.pink,
    marginHorizontal: scale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
  },

});
