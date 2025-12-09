import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SplashScreen from "../screens/SplashScreen";
import BottomNavigation from "./bottomNavigation";
import RequestOTPScreen from '../screens/RequestOTPScreen';
import EnterOTPScreen  from '../screens/EnterOTPScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EnterMobileNumberScreen from "../screens/EnterMobileNumberScreen";
import EnterOTPScreenLogin from "../screens/EnterOTPScreenLogin";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false,}}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Onboarding1" component={Onboarding1}/>
        <Stack.Screen name="Onboarding2" component={Onboarding2}/>
        <Stack.Screen name="Onboarding3" component={Onboarding3}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Bottom" component={BottomNavigation}/>
        <Stack.Screen name="RequestOTP" component={RequestOTPScreen} />   
        <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="PhoneInput" component={EnterMobileNumberScreen} />
         <Stack.Screen name="OTP" component={EnterOTPScreenLogin} />
       
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}















