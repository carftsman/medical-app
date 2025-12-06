// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BottomNavigation from "./navigation/BottomNavigation";

// // Import your screens
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//        <Stack.Navigator>
        
//         <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
//         <BottomNavigation />
//       </Stack.Navigator> 
//     </NavigationContainer>
//   );
// }
  // src/navigation/appNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './bottomNavigation'; // same folder

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}
