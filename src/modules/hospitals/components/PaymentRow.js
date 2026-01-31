import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../../../utils/styling';


const PaymentRow = ({label, value, valueStyle}) => {
  return (
     <View style={styles.amountRow}>
    <Text style={styles.amountLabel}>{label}</Text>
    <Text style={valueStyle}>{value}</Text>
  </View>
   
  )
}

export default PaymentRow

const styles = StyleSheet.create({
     amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  
  amountLabel: {
     color: '#818181',
      // gap: 4,
  },
})