import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS } from '../../../config/constants';
import api from '../../../api/client';
import { formatDate } from '../../../utils/helpers';
import useAuth from '../../../hooks/useAuth';

const LabBookingSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  //   const { bookingId } = route.params || {};

  const bookingIds = route.params?.bookingIds || [21, 22];
  const bookingDetails = route.params?.booking;

  console.log('Booking Details', bookingDetails);

  const bookingId = bookingIds[0];

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});

  const PHONE_NUMBER = '9876543210';
  const handleCallPress = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
      fetchDefaultAddress();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await api.get(`/labs/bookings/${bookingId}`);
      console.log('Booking ID:', bookingId);

      setBooking(response.data?.booking || null);
    } catch (error) {
      console.log('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const response = await api.get(`/labs/address`, {
        params: {
          userId: user.id,
        },
      });
      if (response.status) {
        setAddress(response.data.defaultAddress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  console.log('bookingIds', bookingIds);
  console.log('booking details', booking);
  console.log(address);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('LabTabNavigation')}
        >
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.successCircle}>
        <Icon name="check" size={40} color="#fff" />
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Your lab technician will be assigned and will arrive at your location as
        scheduled.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionLabel}>SELECTED LAB</Text>
        <Text style={styles.labName}>{bookingDetails.labName}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionLabel}>APPOINTMENT AT</Text>
        {booking.date && (
          <Text style={styles.infoText}>{formatDate(bookingDetails.date)}</Text>
        )}

        <Text style={styles.infoText}>{bookingDetails.time}</Text>

        <View style={{ height: 16 }} />

        <Text style={styles.infoText}>Home sample collection</Text>
        <Text style={styles.subInfo}>
          {address.house}, {address.street}, {address.landmark}, {address.city},{' '}
          {address.state}, {address.pinCode}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('InvoiceScreen', { bookingIds })}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>View Invoice</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleCallPress}
        >
          <Text style={styles.secondaryText}>Call Lab</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Support</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.bottomText}>
        A Confirmation mail has been sent to your email address
      </Text>
    </View>
  );
};

export default LabBookingSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    paddingHorizontal: scale(20),
    marginVertical: verticalScale(10),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  successCircle: {
    width: scale(90),
    height: verticalScale(90),
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginVertical: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  labName: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subInfo: {
    fontSize: 13,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  secondaryText: {
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 12,
    color: COLORS.gray,
    marginHorizontal: 9,
    marginVertical: verticalScale(45),
  },
});
