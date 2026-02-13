
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

export default function LabTestsScreen() {
  const navigation = useNavigation();


console.log("labsscreen")
  useEffect(() => {
    navigation.navigate('LabsMain')
  });
  return null;
} 
