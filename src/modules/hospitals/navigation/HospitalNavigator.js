import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import HospitalsHomeScreen from '../screens/HospitalsHomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HospitalsScreen from '../screens/HospitalsScreen';
import MainHomeScreen from '../../../screens/MainHomeScreen';

import WomenScreen from '../screens/WomenScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { COLORS } from '../../../config/constants';

const HospitalTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HospitalsHomeScreeen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e1e8ed',
          height: 50 + insets.bottom,
          paddingTop: 8,
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
        name="HospitalsHomeScreeen"
        component={HospitalsHomeScreen}
        options={{
          tabBarLabel: 'Hospitals',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon name="hospital-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DepartmentsScreen"
        component={DepartmentsScreen}
        options={{
          tabBarLabel: 'Departments',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon name="stethoscope" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DoctorsScreen"
        component={DoctorsScreen}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon name="stethoscope" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WomenScreen"
        component={WomenScreen}
        options={{
          tabBarLabel: 'Women',
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesignIcon name="woman" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HospitalStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HospitalsTab" component={HospitalTabNavigator} />
      <Stack.Screen name="HospitalsScreen" component={HospitalsScreen} />
    </Stack.Navigator>
  );
};

export default HospitalStackNavigator;
