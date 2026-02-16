// screens/ProfileScreen.js

import React from 'react';
import {View,ScrollView,StyleSheet, Text,Image, TouchableOpacity, StatusBar,} from 'react-native';
import MenuSection from '../components/MenuSection';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D73B9" />

      <View style={styles.headerCard}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            console.log("go")
            navigation.goBack()
          }}
        >
          <Ionicons name="arrow-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={scale(20)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.profileRow}>
          <Image
            source={require("../../../../assets/Sravani.jpg")}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Sravani</Text>
            <Text style={styles.phone}>+91 84749 87488</Text>
            <Text style={styles.email}>Sravani.k@gmail.com</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <MenuSection
            items={[
              { title: 'Family Members', icon: 'people-outline',route:"FamilyMembers" },
              { title: 'My Appointments', icon: 'calendar-outline', route:"MyAppointments" },
              { title: 'Medicines Orders', icon: 'medical-outline', route:"MedicinesOrdered" },
              { title: 'Lab Tests & Reports', icon: 'document-text-outline',route:"LabReports" },
            ]}
          />

          <MenuSection
            items={[
              { title: 'Saved Address', icon: 'location-outline',route:"SavedAddress" },
              { title: 'Payments', icon: 'card-outline',route:"PaymentsHistory" },
              { title: 'Help & Support', icon: 'help-circle-outline',route:"HelpAndSupport" },
              { title: 'Terms & Conditions', icon: 'book-outline',route:"TermsAndConditions" },
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
    backgroundColor: '#2D73B9',
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
  },

  editButton: {
    position: 'absolute',
    right: scale(20),
    top: verticalScale(55),
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
  },

  info: {
    marginLeft: scale(30),
    // fontSize: scale(20),
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
