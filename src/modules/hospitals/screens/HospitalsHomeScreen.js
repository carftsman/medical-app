import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
