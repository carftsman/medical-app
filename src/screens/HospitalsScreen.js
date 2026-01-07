// src/screens/HospitalsScreen.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HospitalsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('HospitalsTab');
  }, [navigation]);
  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
