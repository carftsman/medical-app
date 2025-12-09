// src/navigation/bottomNavigation.js
import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import HospitalsScreen from '../screens/HospitalsScreen';
import PharmacyScreen from '../screens/PharmacyScreen';
import LabTestsScreen from '../screens/LabTestsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false,

        // 🔥 KEEP TAB BAR FIXED – NEVER MOVE UP
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 10 : 5,
          paddingTop: 5,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/Home.png')}
              style={{ width: 45, height: 29 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Hospitals"
        component={HospitalsScreen}
        options={{
          tabBarLabel: 'Hospitals',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/hospi.png')}
              style={{ width: 40, height: 32 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={{
          tabBarLabel: 'Pharmacy',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/pharma.png')}
              style={{ width: 30, height: 28 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="LabTests"
        component={LabTestsScreen}
        options={{
          tabBarLabel: 'Lab Tests',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/labtest.png')}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image
              source={require('../../assets/user.png')}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
