// components/MenuItem.js

import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet, Alert,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../../hooks/useAuth';

const MenuItem = ({ title, icon, danger, isLast,route }) => {
    const navigation= useNavigation();
    const {handleLogout} = useAuth();

    const handlePress = ()=>{
      if(title==="Logout"){
        Alert.alert("Logout",
      "Are you sure you want to logout?",[{
          text: "Cancel",
          style: "cancel"
        },
      {
          text: "Logout",
          style: "destructive",
          onPress: () => {
           handleLogout()
          }
        }])
       
      }else{
        navigation.navigate(route)
      }
    }


  return (
    <TouchableOpacity  onPress={handlePress} style={styles.container}>
      <View style={styles.left}>
          <Ionicons
               name={icon}
             size={scale(20)}
             color={danger ? '#e74c3c' : '#056FD2'}
          />

        <Text
          style={[
            styles.title,
            { color: danger ? '#e74c3c' : '#333' },
          ]}>
          {title}
        </Text>
      </View>

      {!danger && (
        <Ionicons
            name="chevron-forward"
             size={scale(18)}
           color="#A0A4AA"
         />

      )}

      {!isLast && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(56),  
    paddingHorizontal: scale(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: scale(14),
    fontSize: scale(15),
    fontWeight: '500',
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: scale(54),  
    right: scale(18),
    height: 1,
    backgroundColor: '#E9EDF2',
  },
});
