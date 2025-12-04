import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

<<<<<<< src/navigation/appNavigation.js
// Import your screens
//import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
//import RegisterScreen from '../screens/RegisterScreen';
=======
import SplashScreen from "../screens/SplashScreen";
import Onboarding1 from "../screens/Onboarding1";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding3 from "../screens/Onboarding3";
>>>>>>> src/navigation/appNavigation.js

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
<<<<<<< src/navigation/appNavigation.js
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false, }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/*<Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />*/}
=======
      
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
>>>>>>> src/navigation/appNavigation.js
      </Stack.Navigator>
    </NavigationContainer>
  );
}
