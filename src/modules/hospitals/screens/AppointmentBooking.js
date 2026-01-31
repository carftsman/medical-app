import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AppointmentBooking = ({ route }) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Doctor ID: {route.params.doctorId}</Text>
      <Text>AppointmentBooking</Text>
      <Text>Work in progress...</Text>
    </View>
  );
};

export default AppointmentBooking;

const styles = StyleSheet.create({});
