import React from 'react';
import { Platform, View } from 'react-native';
import MainHomeScreen from '../../../screens/MainHomeScreen';
import LabsHomeScreen from '../screens/LabsHomeScreen';
import CategoriesTab from '../screens/CategoriesTab';
import ReportsTab from '../screens/ReportsTab';
import WomensTab from '../screens/LabWomensTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '../../../utils/styling';
import { COLORS } from '../../../config/constants';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PrescriptionsTab from '../screens/PrescriptionsTab';

const LabTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="LabsHomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          borderTopColor: '#e1e8ed',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: verticalScale(70),
          paddingBottom:
            Platform.OS === 'ios' ? verticalScale(10) : verticalScale(6),
          paddingTop: verticalScale(6),
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name="MainHomeScreen"
        component={MainHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarItemStyle: {
            borderRightWidth: 1,
            borderRightColor: COLORS.gray,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <FeatherIcon name="arrow-left" size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="LabsHomeScreen"
        component={LabsHomeScreen}
        options={{
          tabBarLabel: 'Labs',
          tabBarIcon: ({ focused, color, size }) => (
            <Fontisto name="laboratory" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesTab}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsTab}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon name="file-text-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PrescriptionsTab"
        component={PrescriptionsTab}
        options={{
          tabBarLabel: 'Prescriptions',
          tabBarIcon: ({ focused, color, size }) => (
            <Fontisto name="prescription" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LabTabNavigator;
