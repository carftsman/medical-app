import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import HospitalsHomeScreen from '../screens/HospitalsHomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HospitalsScreen from '../screens/HospitalsScreen';
import MainHomeScreen from '../../../screens/MainHomeScreen';
import { verticalScale } from '../../../utils/styling';
import WomenScreen from '../screens/WomenScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { COLORS } from '../../../config/constants';
import DepartmentsList from '../screens/DepartmentsList';
import HospitalDetails from '../screens/HospitalDetails';
import DoctorsList from '../screens/DoctorsList';
import AppointmentBooking from '../screens/AppointmentBooking';
import Payments from '../screens/Payments';
import BookingDetails from '../screens/BookingDetails';
import SearchScreen from '../screens/SearchScreen';

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
          borderTopWidth: 0,
          borderTopColor: '#e1e8ed',
          height: 50 + insets.bottom,
          paddingTop: verticalScale(8),
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: verticalScale(70),
          paddingBottom: Platform.OS === "ios"
            ? verticalScale(10)
            : verticalScale(6),
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
            <MaterialIcons name="category" size={size} color={color} />
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
      initialRouteName='BookingDetails'
    >
      <Stack.Screen name="HospitalsTab" component={HospitalTabNavigator} />
      <Stack.Screen name="DepartmentsList" component={DepartmentsList} />
      <Stack.Screen name="HospitalsScreen" component={HospitalsScreen} />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
      <Stack.Screen name="DoctorsList" component={DoctorsList} />
      <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
      <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
      <Stack.Screen name='SearchScreen' component={SearchScreen}/>
    </Stack.Navigator>
  );
};

export default HospitalStackNavigator;
