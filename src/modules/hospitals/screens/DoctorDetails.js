import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { scale, verticalScale } from '../../../utils/styling';
import api from '../../../api/client';
import DoctorsHospitalDetails from '../components/DoctorsHospitalDetails';
import DoctorInfo from '../components/DoctorInfo';
import AboutDoctor from '../components/AboutDoctor';
import DoctorReviews from '../components/DoctorReviews';
import SlotBooking from '../components/SlotBooking';
import BookConsultationModal from '../components/BookConsultationModal';
import { useSelector, useDispatch } from 'react-redux';
import { setConsultationType, setBookingId, setDate } from '../redux/slices/BookingSlice';

const DoctorDetails = ({ route, navigation }) => {

  const doctorId = route?.params?.doctorId || 1;
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

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/hospital/user/doctors/${doctorId}`);
      setDoctorDetails(response?.data);
    }
    catch (err) {
      console.log("Error fetching Doctor Details: ", err);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchDateSlots = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/appointments/availability`, {
        params: {
          doctorId,
        }
      });
      setDateSlots(response?.data.days);
      dispatch(setDate(response?.data.days[0].date));
    } catch (error) {
      console.log("Error fetching date slots: ", error);
    }
    finally {
      setLoading(false);
    }
  }

  const fetchTimeSlots = async () => {
    try {
      setTimeSlotsLoading(true);
      const response = await api.get(`/appointments/slots`, {
        params: {
          doctorId,
          date: selectedDate,
        }
      });
      const filteredSlots = response?.data.slots.filter(slot => slot.isAvailable === true);
      setTimeSlots(filteredSlots);
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
      console.log(response?.data);
      dispatch(setBookingId(response?.data?.bookingId));
    }
    catch (error) {
      console.log("Error sending Id: ", error.message);
    }
  }

  useEffect(() => {
    fetchDoctorDetails();
    fetchDateSlots();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedDate]);

  const handleBookAppointment = () => {
    setShowModal(true);
    dispatch(setConsultationType('SELF'));
  }

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
    <SafeAreaView style={styles.container}>

      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderText}>Doctor Info</Text>
        <View style={{ width: scale(26) }}></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <DoctorInfo
          image={doctorDetails?.imageUrl}
          name={doctorDetails?.name}
          specialization={doctorDetails?.specialization}
          experience={doctorDetails?.experience}
          rating={doctorDetails?.rating}
          consultationFee={doctorDetails?.consultationFee}
        />

        <SlotBooking
          dates={dateSlots}
          times={timeSlots}
          timeSlotsLoading={timeSlotsLoading}
        />

        <AboutDoctor
          about={doctorDetails?.about}
          languages={doctorDetails?.languages}
          qualification={doctorDetails?.qualification}
        />

        <DoctorsHospitalDetails
          name={doctorDetails?.hospital?.name}
          image={doctorDetails?.hospital?.imageUrl}
          place={doctorDetails?.hospital?.place}
          latitude={doctorDetails?.hospital?.latitude}
          longitude={doctorDetails?.hospital?.longitude}
        />

        <DoctorReviews />

      </ScrollView>

      <View style={styles.bookAppointmentButtonCard}>
        <TouchableOpacity style={styles.bookAppointmentButton} onPress={() => handleBookAppointment()} >
          <Text style={styles.bookAppointmentText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      <BookConsultationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        bookAppointmentForSelf={bookAppointmentForSelf}
        doctorId={doctorId}
      />
    </SafeAreaView>
  );
};

export default DoctorDetails;

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
    borderColor: '#056FD2',
    backgroundColor: '#056FD2',
  },
  bookAppointmentText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '600',
  }
});
