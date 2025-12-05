import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Import your screens


import SplashScreen from "../screens/SplashScreen";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false, }}>
  
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
