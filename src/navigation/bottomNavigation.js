// src/navigation/bottomNavigation.js
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import HospitalsScreen from "../screens/HospitalsScreen";
import PharmacyScreen from "../screens/PharmacyScreen";
import LabTestsScreen from "../screens/LabTestsScreen";
import { scale, verticalScale } from "../utils/styling";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: verticalScale(70),
          paddingBottom: Platform.OS === "ios"
            ? verticalScale(10)
            : verticalScale(6),
          paddingTop: verticalScale(8),
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          
        },

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#64748B",

        tabBarLabelStyle: {
          fontSize: scale(12),
          marginTop: verticalScale(-2),
        },
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* HOSPITALS */}
      <Tab.Screen
        name="Hospitals"
        component={HospitalsScreen}
        options={{
          tabBarLabel: "Hospitals",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="hospital-building"
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* PHARMACY */}
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={{
          tabBarLabel: "Pharmacy",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="pill"
              color={color}
              size={26}
            />
          ),
        }}
      />

      {/* LAB TESTS */}
      <Tab.Screen
        name="LabTests"
        component={LabTestsScreen}
        options={{
          tabBarLabel: "Lab Tests",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-document-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
