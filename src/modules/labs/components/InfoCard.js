import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../../../utils/styling';

const InfoCard = ({ label, value, icon }) => {
  return (
    <View style={styles.card}>
      
      <View style={styles.labelRow}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        
      </View>
      <View>
<Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default InfoCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: scale(12),
    borderRadius: scale(10),
    marginRight: scale(8),
    gap: 5,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },

  iconWrapper: {
    marginRight: scale(6),
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
