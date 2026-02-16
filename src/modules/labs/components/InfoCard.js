import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../../../utils/styling';

const InfoCard = ({ label,value}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default InfoCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(12),
    borderRadius: scale(10),
    marginRight: scale(8),
  },
  label: {
    fontSize: scale(12),
    color: '#777',
  },
  value: {
    fontSize: scale(13),
    color: '#000',
    fontWeight: '600',
    marginTop: verticalScale(2),

  },
})