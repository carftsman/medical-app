import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomNavigation from './bottomNavigation';
import AuthStackNavigator from './AuthStackNavigatior';
import useAuth from '../hooks/useAuth';
import HospitalStackNavigator from '../modules/hospitals/navigation/HospitalNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Bottom" component={BottomNavigation} />
            <Stack.Screen
              name="HospitalsTab"
              component={HospitalStackNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStackNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
