// components/ProfileHeader.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.editIcon}>
        <Ionicons name="pencil" size={scale(18)} color="#fff" />
      </TouchableOpacity>

      <View style={styles.profileRow}>
        <Image source={require("../../../../assets/Sravani.jpg")}
          
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.name}>Sravani</Text>
          <Text style={styles.phone}>+91 84749 87488</Text>
          <Text style={styles.email}>Sravani.k@gmail.com</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D73B9', 
    paddingTop: verticalScale(56),
    paddingBottom: verticalScale(47),
    paddingHorizontal: scale(32),
    borderBottomLeftRadius: scale(34),
    borderBottomRightRadius: scale(34),
  },
  editIcon: {
    position: 'absolute',
    right: scale(20),
    top: verticalScale(50),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(64),     
    height: scale(64),
    borderRadius: scale(32),
  },
  info: {
    marginLeft: scale(14),
  },
  name: {
    fontSize: scale(17),
    fontWeight: '600',
    color: '#fff',
  },
  phone: {
    fontSize: scale(13),
    color: '#E6EDF7',
    marginTop: verticalScale(4),
  },
  email: {
    fontSize: scale(13),
    color: '#E6EDF7',
    marginTop: verticalScale(2),
  },
});

