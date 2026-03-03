// Importing required libraries and components
import React from 'react';
import { 
  ActivityIndicator, 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl 
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

// Custom hooks to fetch hospital and doctor data
import { useHospital } from "../hooks/useHospital"
import { useHospitalDoctors } from "../hooks/useHospitalDoctors"

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// Custom Components
import HospitalDoctorList from '../components/HospitalDoctorList';
import HospitalInfo from '../components/HospitalInfo';
import HospitalContactInfo from '../components/HospitalContactInfo';
import Backbtn from '../components/Backbtn';
import { scale, verticalScale} from '../../../utils/styling';

// Main Component
const HospitalDetails = ({ route, navigation }) => {

  // Getting hospital ID from route params
  // If not available, defaulting to 1
  const HOSPITAL_ID = route.params.id || 1;

  // Fetching hospital details using custom hook
  const {
    hospital,
    loading,
    refreshing: hospitalRefreshing,
    error,
    refetch: refetchHospital,
  } = useHospital(HOSPITAL_ID);
 
  // Fetching doctors list of the hospital using custom hook
  const {
    doctors,
    refreshing: doctorsRefreshing,
    refetch: refetchDoctors,
  } = useHospitalDoctors(HOSPITAL_ID);

  // Pull-to-refresh function
  // This will refetch both hospital and doctor data
  const onRefresh = () => {
    refetchHospital();
    refetchDoctors();
  };

  // Show loading spinner while hospital data is loading
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#056FD2" />
      </View>
    );
  }

  // Show error message if API fails
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

      {/* Header Section */}
      <View style={styles.screenHeader}>
        <Backbtn />
        <Text style={styles.screenHeaderText}>Hospital Info</Text>

        {/* Empty View for spacing balance */}
        <View style={{ width: scale(26) }}></View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}

        // Pull-to-refresh functionality
        refreshControl={
          <RefreshControl
            refreshing={hospitalRefreshing || doctorsRefreshing}
            onRefresh={onRefresh}
            colors={['#056FD2']}
          />
        }
      >

        {/* Hospital Details Section */}
        <HospitalInfo hospital={hospital} /> 

        {/* Doctors List Section */}
        {/* Passing doctors data and hospital ID */}
        <HospitalDoctorList 
          doctor={doctors.data} 
          hospitalId={HOSPITAL_ID} 
        />

        {/* Hospital Contact Details Section */}
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


// Styles
const styles = StyleSheet.create({

  // Main container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header styling
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(10),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
  },

  // Header text styling
  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(22),
    fontWeight: '600',
  },

  // Unused back button style (can be removed if not needed)
  backbtn: {
    justifyContent: 'flex-start',
    left: 30,
    top: 40,
    position: 'fixed',
  },

  // Book button text
  book: {
    color: '#fff',
    fontSize: scale(16),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontWeight: '600',
  },

  // Book button container
  bookbtn: {
    borderRadius: 30,
    backgroundColor: '#056FD2',
    marginHorizontal: scale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
  },
});
