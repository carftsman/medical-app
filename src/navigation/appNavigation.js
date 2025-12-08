import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
//import HomeScreen from '../screens/HomeScreen';
//import LoginScreen from '../screens/LoginScreen';
//import RegisterScreen from '../screens/RegisterScreen';

import EnterMobileNumberScreen from "../screens/EnterMobileNumberScreen";
import EnterOTPScreen from "../screens/EnterOTPScreen";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneInput" screenOptions={{headerShown: false, }}>
        {/*<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />*/}

         <Stack.Screen name="PhoneInput" component={EnterMobileNumberScreen} />
         <Stack.Screen name="OTP" component={EnterOTPScreen} />
         

      </Stack.Navigator>
    </NavigationContainer>
  ); 
}















