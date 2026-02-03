import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';

const BookingSuccess = ({ navigation, route }) => {
  const { bookingId } = route.params || {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Ionicons
          name="checkmark-circle"
          size={scale(90)}
          color={COLORS.primary}
        />

        <Text style={styles.title}>Booking Confirmed</Text>

        <Text style={styles.subtitle}>
          Your appointment has been booked successfully.
        </Text>

        {bookingId && (
          <Text style={styles.bookingId}>
            Booking ID: #{bookingId}
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('BookingDetails')}
        >
          <Text style={styles.buttonText}>View Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  title: {
    marginTop: verticalScale(16),
    fontSize: scale(22),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  subtitle: {
    marginTop: verticalScale(8),
    fontSize: scale(14),
    color: COLORS.gray,
    textAlign: 'center',
  },
  bookingId: {
    marginTop: verticalScale(10),
    fontSize: scale(14),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },
  button: {
    marginTop: verticalScale(30),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(40),
    borderRadius: scale(10),
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: scale(14),
  },
});
