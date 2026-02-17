/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale } from '../../../../utils/styling';
import api from '../../../../api/client'
import DoctorsHospitalDetailsWomen from '../components/DoctorsHospitalDetailsWomen';
import DoctorInfoWomen from '../components/DoctorInfoWomen';
import AboutDoctorWomen from '../components/AboutDoctorWomen';
import DoctorReviewsWomen from '../components/DoctorReviewsWomen';
import SlotBookingWomen from '../components/SlotBookingWomen';
import BookConsultationWomen from '../components/BookConsultationWomen';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshControl } from 'react-native';
import { setConsultationType, setBookingId, setDate } from '../../redux/slices/BookingSlice';


const WomenDoctorDetails = ({ route, navigation }) => {

  const doctorId =  route?.params?.doctorId || 1;

  const { selectedDate, selectedTime } = useSelector(
    state => state.hospital.consultation
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [dateSlots, setDateSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [error, setError] = useState('');

  const hospitalId = doctorDetails?.hospital?.id;
  console.log("ID",hospitalId);

  const fetchDoctorDetails = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const response = await api.get(`/hospital/user/doctors/${doctorId}`);
      setDoctorDetails(response?.data);
      setError('');
    }
    catch (err) {
      console.log("Error fetching Doctor Details: ", err);
      setError('Failed to refresh doctor details');
    }
    finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };

  const fetchHospitalDetails = async (id) => {
    try {
      const response = await api.get(`/hospital/user/hospitals/${id}/info`);
      console.log("hospital", response?.data);
      console.log("Days:", hospitalDetails?.availability?.days);
      setHospitalDetails(response?.data);
    }
    catch (error) {
      console.log("Error sending Id: ", error.message);
    }
  };


  const fetchDateSlots = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const response = await api.get(`/appointments/availability`, {
        params: { doctorId: doctorId || 1 }
      });
      console.log("slot", response?.data.days);
      setDateSlots(response?.data.days);
      dispatch(setDate(response?.data.days[0].date));
      setError('');
    } catch (error) {
      console.log("Error fetching date slots: ", error);
      setError('Failed to refresh slots');
    }
    finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  };


  const fetchTimeSlots = async () => {
    try {
      setTimeSlotsLoading(true);
      const response = await api.get(`/appointments/slots`, {
        params: {
          doctorId,
          date: selectedDate,
        }
      });
      console.log("slots", response?.data);
      // const filteredSlots = response?.data.slots.filter(slot => slot.isAvailable === true);
      setTimeSlots(response?.data.slots);
    }
    catch (error) {
      console.log("Error fetching time slots: ", error);
    }
    finally {
      setTimeSlotsLoading(false);
    }
  }

  const bookAppointmentForSelf = async () => {
    try {
      const response = await api.post(`/appointments/hold`,
        {
          slotId: selectedTime.slotId,
          bookingFor: 'SELF',
        }
      );
      console.log("DATAAAAA: ",response?.data);
      dispatch(setBookingId(response?.data?.bookingId));
    }
    catch (error) {
      console.log("Error sending Id: ", error.message);
    }
  }
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchDoctorDetails(true),
      fetchDateSlots(true),
    ]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDoctorDetails();
    fetchDateSlots();
  }, []);

  useEffect(() => {
    if (hospitalId) {
      console.log("i", hospitalId);
      fetchHospitalDetails(hospitalId);
    }
  }, [hospitalId]);


  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedDate]);

 const handleBookAppointment = () => {

  // ❌ If no time slot selected, do nothing
  if (!selectedTime) {
    return;
  }

  // ✅ If time selected, allow booking
  setShowModal(true);
  dispatch(setConsultationType('SELF'));
};


  if (loading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ActivityIndicator size={'large'} color={'#056FD2'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderText}>Doctor Info</Text>
        <View style={{ width: scale(26) }}></View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#F47FBB']}
          />
        }
      >


        <DoctorInfoWomen
          image={doctorDetails?.imageUrl}
          name={doctorDetails?.name}
          specialization={doctorDetails?.specialization}
          experience={doctorDetails?.experience}
          rating={doctorDetails?.rating}
          consultationFee={doctorDetails?.consultationFee}
        />

        <SlotBookingWomen
          dates={dateSlots}
          times={timeSlots}
          timeSlotsLoading={timeSlotsLoading}
        />

        <AboutDoctorWomen
          about={doctorDetails?.about}
          languages={doctorDetails?.languages}
          qualification={doctorDetails?.qualification}
        />

        <DoctorsHospitalDetailsWomen
          name={doctorDetails?.hospital?.name}
          image={doctorDetails?.hospital?.imageUrl}
          place={doctorDetails?.hospital?.place}
          latitude={doctorDetails?.hospital?.latitude}
          longitude={doctorDetails?.hospital?.longitude}
          days={hospitalDetails?.availability?.days}
          startTime={hospitalDetails?.availability?.startTime}
          endTime={hospitalDetails?.availability?.endTime}
          // distancekm={hospitalDetails?.distancekm}
        />

        <DoctorReviewsWomen />

      </ScrollView>

      <View style={styles.bookAppointmentButtonCard}>
       <TouchableOpacity
  style={[
    styles.bookAppointmentButton,
    !selectedTime && styles.disabledButton
  ]}
  disabled={!selectedTime}
  onPress={handleBookAppointment}
>

          <Text style={styles.bookAppointmentText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <BookConsultationWomen
        visible={showModal}
        onClose={() => setShowModal(false)}
        bookAppointmentForSelf={bookAppointmentForSelf}
        doctorId={doctorId}
      />
    </View>
  );
};

export default WomenDoctorDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: 'white',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(15),
  },
  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(22),
    fontWeight: '600',
  },
  bookAppointmentButtonCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    backgroundColor: '#FFFFFF',
  },
  bookAppointmentButton: {
    borderWidth: 1,
    borderRadius: 32,
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(10),
    borderColor: '#F47FBB',
    backgroundColor: '#F47FBB',
  },
  bookAppointmentText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '600',
  },
  disabledButton: {
  backgroundColor: '#BDBDBD',
  borderColor: '#BDBDBD',
},

});

