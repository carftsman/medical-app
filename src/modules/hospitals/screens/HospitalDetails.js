import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHospital } from "../hooks/useHospital"
import { useHospitalDoctors } from "../hooks/useHospitalDoctors"
import HospitalDoctorCard from '../components/HospitalDoctorCard';
import HospitalDoctorList from '../components/HospitalDoctorList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from '../../../utils/styling';
import Hospitainfo from '../components/Hospitainfo';
import HospitalContactInfo from '../components/HospitalContactInfo';

const HospitalDetails = ({ route }) => {

  const HOSPITAL_ID = route.params.id || 1;

  const navigation = useNavigation();
  const {
    hospital,
    loading,
    error,
  } = useHospital(HOSPITAL_ID);
  console.log("hospitals", hospital);
  const { doctors } = useHospitalDoctors(HOSPITAL_ID);

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
    <ScrollView >
      <Hospitainfo hospital={hospital}/>
      <HospitalDoctorList doctor={doctors.data} hospitalId={HOSPITAL_ID} />
      <HospitalContactInfo hospital={hospital}/>    
      </ScrollView>
       <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate('DoctorsList', {
                          hospitalId: HOSPITAL_ID,
                      })}>
              <Text style={styles.book}>Book Appointment</Text>
            </TouchableOpacity>
      </View>
  );
};

export default HospitalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: scale(10),
  },
  book: {
    color: '#fff',
    fontSize: scale(16),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontWeight: '600',
  
  },
  bookbtn: {
    borderRadius: 30,
     backgroundColor: '#056FD2',
    marginHorizontal: scale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10)
  }
})