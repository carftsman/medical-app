import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LabBookingSuccess = ({ route }) => {
  const bookingDetails = route.params?.booking;
  console.log('Lab booking success', bookingDetails);

  return (
    <View>
      <Text>LabBookingSuccess {JSON.stringify(bookingDetails)}</Text>
    </View>
  );
};

export default LabBookingSuccess;

const styles = StyleSheet.create({});
