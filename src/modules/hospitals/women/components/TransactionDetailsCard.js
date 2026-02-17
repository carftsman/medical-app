import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';

const Row = ({ label, value, success }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, success && styles.success]}>
      {value}
    </Text>
  </View>
);

const TransactionDetailsCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Transaction Details</Text>

      <Row label="Amount Paid" value="₹112.00" />
      <Row label="Transaction ID" value="OGD5339653" />
      <Row label="Date" value="9:20 AM | 6 Jan 2028" />
      <Row label="Payment Mode" value="Debit Card" />
      <Row label="Payment Status" value="Successful" success />
    </View>
  );
};

export default TransactionDetailsCard;

const styles = StyleSheet.create({
  card: {
    marginTop: verticalScale(30),
    padding: scale(16),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#D8D8D8',
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: scale(15),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  label: {
    fontSize: scale(13),
    color: '#777',
  },
  value: {
    fontSize: scale(13),
    color: '#000',
    fontWeight: '500',
  },
  success: {
    color: '#2EBE7F',
    fontWeight: '600',
  },
});
