/* eslint-disable no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import BookingDoctorCard from '../components/BookingDoctorCard';
import DetailRow from '../components/DetailRow';
import PaymentRow from '../components/PaymentRow';
import api from '../../../api/client';

const BookingDetails = () => {
  const navigation = useNavigation();
  const bookingId = useSelector(state => state.hospital.consultation.bookingId);
  console.log("Booking ID: ", bookingId);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(
        `/appointments/${bookingId}`,
        {
          headers: {
            Accept: 'application/json',
            // Authorization: `Bearer YOUR_TOKEN`,
          },
        }
      );

      console.log('Booking Details Response:', response.data);

      setBookingData(response.data);
    } catch (err) {
      console.log('Error fetching booking details:', err.response || err.message);
      setError('Booking not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#0A74DA" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!bookingData) {
    return <Text>no bookingId</Text>
  }
  console.log("bookingData", bookingData)

  return (
    <View style={styles.safe}>
      <Header />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Doctor Card */}
        <BookingDoctorCard
          doctorImage={bookingData.doctor.image}
          doctor={bookingData.doctor}
          doctorName={bookingData.doctor.name}
          hospitalName={bookingData.hospital}
          status={bookingData.status}
        />

        {/* Booking Details */}
        <View style={styles.section}>
          <SectionHeader title="Booking Details" showChange doctorId={bookingData.doctor.id} />

          <DetailRow
            icon="person-outline"
            label="Patient Name"
            value={bookingData.patient}
          />

          <DetailRow
            icon="calendar-outline"
            label="Slot Date"
            value={bookingData.appointment?.date}
          />
          <DetailRow
            icon="time-outline"
            label="Slot Time"
            value={bookingData.appointment?.time}
          />
          {
            bookingData?.reason &&
            <View style={styles.reasonHeader}>
              <Text style={styles.reasonTitle}>Reason</Text>
              <TouchableOpacity>
                {/* <Text style={styles.reasonChange}>Change</Text> */}
              </TouchableOpacity>
            </View>
          }

          {
            bookingData?.reason &&
            <View style={styles.reasonRow}>
              <Ionicons
                name="document-text-outline"
                size={23}
                color="#4f76c4ff"
              />
              <Text>
                {bookingData.reason}
              </Text>
            </View>
          }
        </View>

        {/* Payment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <PaymentRow
            label="Consultation Fee"
            value={`₹${bookingData.payment?.consultationFee}`}
            valueStyle={styles.amountValue}
          />

          <PaymentRow
            label="Service Fee"
            value={
              bookingData.payment?.serviceFee === 0
                ? 'Free'
                : `₹${bookingData.payment?.serviceFee}`
            }
            valueStyle={styles.freeText}
          />

          <PaymentRow
            label="GST (18%)"
            value={`₹${bookingData.payment?.gst}`}
            valueStyle={styles.amountValue}
          />

          <View style={styles.divider} />

          <PaymentRow
            label="Total Payable"
            value={`₹${bookingData.payment?.total}`}
            valueStyle={styles.totalValue}
          />
        </View>
      </ScrollView>

      {/* Pay Button */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('Payments', {
          totalFee: bookingData?.payment?.total
        })}
      >
        <Text style={styles.payText}>
          Pay ₹{bookingData.payment?.total}
        </Text>

      </TouchableOpacity>
    </View>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  container: {
    paddingHorizontal: scale(16),
  },

  section: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(14),
    marginBottom: verticalScale(16),
  },

  reasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },

  reasonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  reasonChange: {
    color: '#0c3ea1ff',
  },

  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },

  amountValue: {
    fontWeight: '500',
  },

  freeText: {
    color: '#10B981',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: verticalScale(10),
  },

  totalValue: {
    fontWeight: '600',
  },

  payButton: {
    backgroundColor: '#0A74DA',
    paddingVertical: verticalScale(14),
    margin: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },

  payText: {
    color: '#fff',
    fontWeight: '600',
  },

  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
