import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
// import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
const DetailRow = ({icon, label,value}) => {
  return (
     <View style={styles.detailRow}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={23} color="#4f76c4ff" />
    </View>
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
  )
}

export default DetailRow

const styles = StyleSheet.create({
    
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },

  iconBox: {
    width: scale(32),
    alignItems: 'center',
    marginRight: scale(8),
  },

  label: {
    color: '#818181',
    fontSize: scale(14),
    paddingLeft: scale(4),
    marginBottom: verticalScale(2),
  },
  
  value: {
    fontSize: scale(15),
    paddingLeft: scale(4),
    fontWeight: '500',
    color: '#111827',
    marginTop: 2,
  },
})