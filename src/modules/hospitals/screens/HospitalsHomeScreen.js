import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';




const HospitalsHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>HospitalsHomeScreen</Text>
      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Bottom', {
            screen: 'Profile',
          });
        }}
      />

    
    </SafeAreaView>
  );
};

export default HospitalsHomeScreen;

const styles = StyleSheet.create({});
