import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from '../screens/EditProfile';
import ProfileScreen from '../screens/ProfileScreen';
import MyAppointments from '../screens/MyAppointments';
import MyRemainders from  '../screens/MyRemainders';
import Favourites from '../screens/Favourites';
import FamilyMembers from '../screens/FamilyMembers';
import AddFamilyMembers from '../screens/AddFamilyMembers';
import AppointmentDetails from '../screens/AppointmentDetails';
import MedicinesOrdered from '../screens/MedicinesOrdered';
import OrderDetails from '../screens/OrderDetails';
import LabReports from '../screens/LabReports';
import SavedAddress from '../screens/SavedAddress';
import AddAddress from '../screens/AddAddress';  
import PaymentsHistory from '../screens/PaymentsHistory';
import HelpAndSupport from '../screens/HelpAndSupport';
import TermsAndConditions from '../screens/TermsAndConditions';
import OrderTrackingScreen from '../screens/OrderTracking';
import MedicinesFeedbackScreen from '../screens/MedicinesFeedbackScreen';
import MedicinesFeedbackSuccessScreen from '../screens/MedicinesFeedbackSuccessScreen';

const ProfileNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
  /*initialRouteName="SavedAddress"*/
  screenOptions={{ headerShown: false }}
>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfile} /> 
   <Stack.Screen name='FamilyMembers' component={FamilyMembers}/>
   <Stack.Screen name='AddFamilyMembers' component={AddFamilyMembers}/>
    <Stack.Screen name="MyAppointments" component={MyAppointments} />
     <Stack.Screen name="MyRemainders" component={MyRemainders} />
      <Stack.Screen name="Favourites" component={Favourites} />
    <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    <Stack.Screen name="MedicinesOrdered" component={MedicinesOrdered} />
    <Stack.Screen name="OrderDetails" component={OrderDetails} />
    <Stack.Screen name="LabReports" component={LabReports} />
    <Stack.Screen name="SavedAddress" component={SavedAddress} />
    <Stack.Screen name="AddAddress" component={AddAddress} />   
    <Stack.Screen name="PaymentsHistory" component={PaymentsHistory} />
    <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
     <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    
    <Stack.Screen name="OrderTracking" component={OrderTrackingScreen}/>
    <Stack.Screen name="MedicinesFeedbackScreen" component={MedicinesFeedbackScreen}/>
    <Stack.Screen name="MedicinesFeedbackSuccessScreen" component={MedicinesFeedbackSuccessScreen}/>
   </Stack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})
