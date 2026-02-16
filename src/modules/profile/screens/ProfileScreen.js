// screens/ProfileScreen.js

import React from 'react';
import { View,  ScrollView, StyleSheet } from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import MenuSection from '../components/MenuSection';
import { scale, verticalScale } from '../../../utils/styling';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader />

        <View style={styles.content}>
          <MenuSection
            items={[
              { title: 'Family Members', icon: 'people-outline' },
              { title: 'My Appointments', icon: 'calendar-outline' },
              { title: 'Medicines Orders', icon: 'medical-outline' },
              { title: 'Lab Tests & Reports', icon: 'document-text-outline' },
            ]}
          />

          <MenuSection
            items={[
              { title: 'Saved Address', icon: 'location-outline' },
              { title: 'Payments', icon: 'card-outline' },
              { title: 'Help & Support', icon: 'help-circle-outline' },
              { title: 'Terms & Conditions', icon: 'book-outline' },
            ]}
          />

          <MenuSection
            items={[{ title: 'Logout', icon: 'log-out-outline', danger: true }]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7', 
  },
  content: {
    paddingHorizontal: scale(18),  
    marginTop: verticalScale(22),  
    paddingBottom: verticalScale(40),
  },
});

