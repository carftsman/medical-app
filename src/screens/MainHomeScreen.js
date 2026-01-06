import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const MainHomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Bottom');
  }, []);

  return null;
};

export default MainHomeScreen;

const styles = StyleSheet.create({});
