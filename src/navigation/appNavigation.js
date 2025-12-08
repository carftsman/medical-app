import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
//import HomeScreen from '../screens/HomeScreen';
//import LoginScreen from '../screens/LoginScreen';
//import RegisterScreen from '../screens/RegisterScreen';


// src/navigation/appNavigation.js
import RequestOTPScreen     from '../screens/ForgotPassword/RequestOTPScreen';
import EnterOTPScreen       from '../screens/ForgotPassword/EnterOTPScreen';
import ResetPasswordScreen  from '../screens/ForgotPassword/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RequestOTP" screenOptions={{headerShown: false, }}>
        <Stack.Screen name="RequestOTP" component={RequestOTPScreen} />   
        <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        {/*<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
