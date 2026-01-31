import { Text, View ,TouchableOpacity,} from 'react-native'
import React from 'react';
import { StyleSheet } from 'react-native';  
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
     <View style={styles.header}>
    <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.backBtn}>
      <Feather name="arrow-left" size={scale(22)} color="#111827" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>Book an Appointment</Text>
    <View style={styles.rightSpace} />
  </View>
  )
}

export default Header

const styles = StyleSheet.create({
     header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(12),
      },
    
      backBtn: {
         width: scale(40),
         paddingLeft: scale(10),
     },
     
       headerTitle: {
         flex: 1,
         textAlign: 'center',
         fontSize: scale(18),
         fontWeight: '600',
         color: '#111827',
       },
     
       rightSpace: { 
         width: scale(40)
        },
    
})