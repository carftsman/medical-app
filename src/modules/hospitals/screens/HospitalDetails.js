import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHospital } from '../hooks/useHospital';
import { useHospitalDoctors } from '../hooks/useHospitalDoctors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HospitalDoctorList from '../components/HospitalDoctorList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from '../../../utils/styling';
import HospitalInfo from '../components/HospitalInfo';
import HospitalContactInfo from '../components/HospitalContactInfo';
import { RefreshControl } from 'react-native';
import Backbtn from '../components/Backbtn';

const HospitalDetails = ({ route, navigation }) => {
  const HOSPITAL_ID = route.params.id || 1;

  const {
    hospital,
    loading,
    refreshing: hospitalRefreshing,
    error,
    refetch: refetchHospital,
  } = useHospital(HOSPITAL_ID);

  const {
    doctors,
    refreshing: doctorsRefreshing,
    refetch: refetchDoctors,
  } = useHospitalDoctors(HOSPITAL_ID);

  const onRefresh = () => {
    refetchHospital();
    refetchDoctors();
  };

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

  console.log(hospital);

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Backbtn />
        <Text style={styles.screenHeaderText}>Hospital Info</Text>
        <View style={{ width: scale(26) }}></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={hospitalRefreshing || doctorsRefreshing}
            onRefresh={onRefresh}
            colors={['#056FD2']}
          />
        }
      >
        <HospitalInfo hospital={hospital} />
        <HospitalDoctorList doctor={doctors.data} hospitalId={HOSPITAL_ID} />
        <HospitalContactInfo hospital={hospital} />
      </ScrollView>
      <TouchableOpacity
        style={styles.bookbtn}
        onPress={() =>
          navigation.navigate('DoctorsList', {
            hospitalId: HOSPITAL_ID,
            hospitalName: hospital.name,
          })
        }
      >
        <Text style={styles.book}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HospitalDetails;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontWeight: '600',
  },
  backbtn: {
    justifyContent: 'flex-start',
    left: 30,
    top: 40,
    position: 'fixed',
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
    marginTop: verticalScale(10),
  },
});
