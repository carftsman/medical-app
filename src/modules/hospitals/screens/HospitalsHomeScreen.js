import React, { useState } from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HospitalCard from '../components/HospitalCard';

const HospitalsHomeScreen = () => {
  const navigation = useNavigation();
 // const [isFavorite, setIsFavorite] = useState(false);

  // const handleFavoriteToggle = () => {
  //   setIsFavorite(prev => !prev);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HospitalsHomeScreen</Text>

      {/* Hospital Card */}
      <HospitalCard
        image={require('../../../../assets/Hospitals.jpg')}
        hospitalName="Apollo Hospitals"
        distance="2.4 kms"
        location="Madhapur"
        description="Specialized for lung, internal diseases and also high recovery rate."
        isEmergency={true}
        isOpen24Hours={true}
        //isFavorite={isFavorite}
        //onFavoritePress={handleFavoriteToggle}
        onViewDetails={() => navigation.navigate('HospitalDetails')}
      />

      <Button
        title="Go to profile"
        onPress={() =>
          navigation.navigate('Bottom', {
            screen: 'Profile',
          })
        }
      />
    </SafeAreaView>
  );
};

export default HospitalsHomeScreen;

const styles = StyleSheet.create({});
