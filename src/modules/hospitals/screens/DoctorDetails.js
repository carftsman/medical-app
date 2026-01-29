import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const DoctorDetails = ({route}) => {
  return (
    <SafeAreaView>
      <Text>DoctorDetails {route.params.doctorId}</Text>
    </SafeAreaView>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({});
