import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../../../utils/styling';
import { useNavigation } from '@react-navigation/native';


const SectionHeader = ({title, showChange,doctorId}) => {
  const navigation = useNavigation();
  return (
    
    <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showChange && (
      <TouchableOpacity onPress={() => navigation.navigate('DoctorDetails',{doctorId:doctorId})}>
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>
    )}
  </View>
   

  )
}

export default SectionHeader

const styles = StyleSheet.create({
   
     sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
      },
    
      sectionTitle: {
         fontSize: scale(16), 
         fontWeight: '600',
         marginBottom: verticalScale(8),
         },
    
      changeText: { color: '#2563EB' },
})