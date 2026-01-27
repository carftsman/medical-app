import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { setCategory } from "../redux/slices/BookingSlice";



const DoctorsList = () => {

   const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const mode = useSelector(
      (state) => state.hospital.consultation
    );
    console.log(mode)
  return (
    <SafeAreaView>
      <Text >Doctors List</Text>
    </SafeAreaView>
  );
}

export default DoctorsList;
