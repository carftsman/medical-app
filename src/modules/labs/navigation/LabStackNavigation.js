import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LabTabNavigation from './LabTabNavigation';
import LabsSearchScreen from '../screens/LabsSearchScreen';
import UploadPrescriptionScreen from '../screens/UploadPrescriptionScreen';
import PrescriptionPreviewScreen from '../screens/PrescriptionPreviewScreen';
import LabsScreen from '../screens/LabsScreen';
import LabDetailsScreen from '../screens/LabDetailsScreen';
import PackagesScreen from '../screens/PackagesScreen';
import PackageDetails from '../screens/PackageDetails';
import LabsCartScreen from '../screens/LabsCartScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import ReviewCart from '../screens/ReviewCart';

import ReportsTab from '../screens/ReportsTab';
import ReportDetailsScreen from '../screens/ReportDetailsScreen';
import LabFeedbackScreen from '../screens/LabFeedback';
import LabFeedbackSuccessScreen from '../screens/LabFeedbackSuccessScreen';
import  {LabCartProvider} from '../context/LabCartContext';
import ReviewPrescriptionScreen from "../screens/ReviewPrescriptionScreen";
import PrescriptionSuccessScreen from "../screens/PrescriptionSuccessScreen";
import PrescriptionTrackingScreen from "../screens/PrescriptionTrackingScreen";
import PrescriptionListScreen from '../screens/PrescriptionListScreen';
import SelectSlotScreen from "../screens/SelectSlotScreen";
import InvoiceScreen from '../screens/InvoiceScreen';

const LabStackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName='InvoiceScreen'
      >
        <Stack.Screen name="LabTabNavigation" component={LabTabNavigation} />
        <Stack.Screen name="SearchScreen" component={LabsSearchScreen} />
        <Stack.Screen
          name="UploadPrescription"
          component={UploadPrescriptionScreen}
        />
        <Stack.Screen
          name="PrescriptionPreview"
          component={PrescriptionPreviewScreen}
        />
        <Stack.Screen
        name="ReviewPrescription"
        component={ReviewPrescriptionScreen}
       />

    <Stack.Screen
     name="PrescriptionSuccess"
     component={PrescriptionSuccessScreen}
    />

   <Stack.Screen
    name="PrescriptionTracking"
    component={PrescriptionTrackingScreen}
  />
   <Stack.Screen
        name="PrescriptionList"
        component={PrescriptionListScreen}
    />
        <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
        <Stack.Screen name="LabsScreen" component={LabsScreen} />
        <Stack.Screen name="LabDetails" component={LabDetailsScreen} />
        <Stack.Screen name="PackagesScreen" component={PackagesScreen} />
        <Stack.Screen name="PackagesDetails" component={PackageDetails} />
        <Stack.Screen name="CartScreen" component={LabsCartScreen} />
        <Stack.Screen name="SelectSlot" component={SelectSlotScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="ReviewCart" component={ReviewCart} />
        <Stack.Screen name="ReportsTab" component={ReportsTab} />
        <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
        <Stack.Screen name="Feedback" component={LabFeedbackScreen} />
        <Stack.Screen
          name="LabFeedbackSuccess"
          component={LabFeedbackSuccessScreen}
        />
      </Stack.Navigator>
   
  );
};

export default LabStackNavigation;

const styles = StyleSheet.create({});
