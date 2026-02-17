import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import { SafeAreaView } from "react-native-safe-area-context"; 

import SuccessIcon from '../components/SuccessIcon';
import TransactionDetailsCard from '../components/TransactionDetailsCard';
import ReceiptButton from '../components/ReceiptButton';

const WWomenBookingSuccess = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <SuccessIcon />

        <Text style={styles.heading}>
          Payment Successful
        </Text>

        <TransactionDetailsCard />

        <ReceiptButton />

      </View>
    </SafeAreaView>
  );
};

export default WWomenBookingSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
  },
  heading: {
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '600',
    marginTop: verticalScale(20),
    color: '#000',
  },
});
