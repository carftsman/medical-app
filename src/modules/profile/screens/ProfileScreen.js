// screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MenuSection from '../components/MenuSection';
import { scale, verticalScale } from '../../../utils/styling';
import Feathericons from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api/client';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/hospital/user/profile');
        console.log('Profile API Response:', response.data);

        // Fix: set only the user object
        setProfile(response.data.user);
      } catch (error) {
        console.log(
          'Profile API Error:',
          error.response?.data || error.message,
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D73B9" />

      <View style={styles.headerCard}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log('go');
            navigation.goBack();
          }}
        >
          <Feathericons name="arrow-left" size={scale(22)} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}
        >
          <Feathericons name="edit" size={scale(20)} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.profileRow}>
          <View  style={styles.avatar}>
             <Feathericons name="user" size={scale(28)} color="#fff" />
             
          </View>
          {/* <Image
            source={require('../../../../assets/Sravani.jpg')}
            style={styles.avatar}
          /> */}

          <View style={styles.info}>
            <Text style={styles.name}>
              {profile?.fullName || ''}
            </Text>

            <Text style={styles.phone}>
              {profile?.phone || ''}
            </Text>

            <Text style={styles.email}>
              {profile?.email || ''}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <MenuSection
            items={[
              { title: 'Family Members', icon: 'people-outline', route: 'FamilyMembers' },
              { title: 'My Appointments', icon: 'calendar-outline', route: 'MyAppointments' },
               { title: 'My Remainders', icon: 'calendar-outline', route: 'MyRemainders' },
              
              { title: 'Medicines Orders', icon: 'medical-outline', route: 'MedicinesOrdered' },
              { title: 'Lab Tests & Reports', icon: 'document-text-outline', route: 'LabReports' },
            ]}
          />

          <MenuSection
            items={[
              { title: 'Saved Address', icon: 'location-outline', route: 'SavedAddress' },
              { title: 'Payments', icon: 'card-outline', route: 'PaymentsHistory' },
              { title: 'Help & Support', icon: 'help-circle-outline', route: 'HelpAndSupport' },
              { title: 'Terms & Conditions', icon: 'book-outline', route: 'TermsAndConditions' },
            ]}
          />

          <MenuSection
            items={[{ title: 'Logout', icon: 'log-out-outline', danger: true }]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },

  headerCard: {
    backgroundColor: '#056FD2',
    paddingTop: verticalScale(55),
    paddingBottom: verticalScale(25),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  backButton: {
    position: 'absolute',
    left: scale(20),
    top: verticalScale(55),
    zIndex: 10,
  },

  editButton: {
    position: 'absolute',
    right: scale(20),
    top: verticalScale(55),
    zIndex: 10,
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    margintop: scale(50), 
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },

  avatar: {
    width: scale(85),
    height: scale(85),
    borderRadius: scale(43),
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: scale(10),
    justifyContent:"center",
    alignItems:"center"
  },

  info: {
    marginLeft: scale(30),
  },

  name: {
    fontSize: scale(20),
    fontWeight: '600',
    color: '#fff',
  },

  phone: {
    fontSize: scale(15),
    color: '#E6EDF7',
    marginTop: verticalScale(4),
  },

  email: {
    fontSize: scale(15),
    color: '#E6EDF7',
    marginTop: verticalScale(2),
  },

  content: {
    paddingHorizontal: scale(18),
    marginTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
});
