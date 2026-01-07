import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import BottomNavigation from './bottomNavigation';
import AuthStackNavigator from './AuthStackNavigatior';
import useAuth from '../hooks/useAuth';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return (
    <NavigationContainer>
      <Stack.Navigator

        // initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {isAuthenticated ? (
          <>
          <Stack.Screen name="Splash" component={SplashScreen} />
            {/* <Stack.Screen name='ProfileDetails' component={RegisterScreen} /> */}
            <Stack.Screen name="Bottom" component={BottomNavigation} />
          </>
        ) : (
          <>
          
          <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="/" component={AuthStackNavigator} />
      
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
