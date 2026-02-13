import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
import ReportDetailsSreen from '../screens/ReportDetailsSreen';
import LabFeedbackScreen from '../screens/LabFeedback';
import CategoriesTab from '../screens/CategoriesTab';

const LabStackNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
            
        >
            <Stack.Screen name="LabTabNavigation" component={LabTabNavigation} />
            <Stack.Screen name='SearchScreen' component={LabsSearchScreen} />
            <Stack.Screen name='UploadPrescription' component={UploadPrescriptionScreen} />
            <Stack.Screen name='PrescriptionPreview' component={PrescriptionPreviewScreen} />
            <Stack.Screen name='LabsScreen' component={LabsScreen} />
            <Stack.Screen name='LabDetails' component={LabDetailsScreen} />
            <Stack.Screen name='PackagesScreen' component={PackagesScreen} />
            <Stack.Screen name='PackagesDetails' component={PackageDetails} />
            <Stack.Screen name='CartScreen' component={LabsCartScreen} />
            <Stack.Screen name='SelectSlot' component={LabsSearchScreen} />
            <Stack.Screen name='AddAddress' component={AddAddressScreen} />
            <Stack.Screen name='ReviewCart' component={ReviewCart} />
            <Stack.Screen name='ReportsTab' component={ReportsTab} />
            <Stack.Screen name='ReportDetails' component={ReportDetailsSreen} />
            <Stack.Screen name='Feedback' component={LabFeedbackScreen} />
            
        </Stack.Navigator>
    )
}

export default LabStackNavigation

const styles = StyleSheet.create({})