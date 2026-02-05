import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomNavigation from './bottomNavigation';
import AuthStackNavigator from './AuthStackNavigatior';

import HospitalStackNavigator from "../modules/hospitals/navigation/HospitalNavigator"
import useAuth from '../hooks/useAuth';
import SelectLocation from '../screens/SelectLocation';
import Logger from '../utils/Logger';
import { parseAndLogRoute, setIsNavigationReady } from './Navigation';
import LabStackNavigation from '../modules/labs/navigation/LabStackNavigation';
import { createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();



const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  const { isAuthenticated } = useAuth();


  const handleStateChange = (state) => {
    Logger.info('Navigation State Changed', state);
    parseAndLogRoute(state);
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={setIsNavigationReady}
      onStateChange={handleStateChange}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isAuthenticated ? (
          <>


            <Stack.Screen name="Bottom" component={BottomNavigation} />
            <Stack.Screen
              name="HospitalsMain"
              component={HospitalStackNavigator}
            />
            <Stack.Screen name="LabsMain" component={LabStackNavigation} />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          </>
        )}

        <Stack.Screen name="SelectLocation" component={SelectLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
