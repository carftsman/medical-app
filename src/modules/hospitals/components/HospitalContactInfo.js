import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const HospitalContactInfo = ({ hospital, hospitalId }) => {
  const navigation = useNavigation();
    const PHONE_NUMBER = '9876543210';
    const handleCallPress = () => {
      Linking.openURL(`tel:${PHONE_NUMBER}`);
    };
  const formatTime24 = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.aval} onPress={() => navigation.navigate('DoctorsList', {
        hospitalId: hospitalId,
      })}>
        <Ionicons name="time-outline" size={scale(25)} color="#fff" />
        <View style={styles.slot}>
          <Text style={styles.availabilty}>Availablity</Text>
          <Text style={styles.time}>({hospital?.availability?.days}) {" "}
            {hospital?.availability?.startTime && hospital?.availability?.endTime
              ? `${formatTime24(hospital.availability.startTime)}–${formatTime24(
                hospital.availability.endTime
              )}`
              : ''}
          </Text>

        </View>
        <Ionicons name="arrow-forward" size={scale(24)} color="#364153" style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.communication}>Communication</Text>

      <View style={styles.contact}>
        <TouchableOpacity style={styles.chat} >
          <Ionicons style={styles.chatIcon} name="chatbubble" size={28} color="#E8899E" />
          <View style={styles.comCard}>
            <Text style={styles.comHeading}>Chat</Text>
            <Text style={styles.comSub}>Chat me up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chat} onPress={handleCallPress}>
          
          <Ionicons style={styles.phoneIcon} name="call" size={scale(28)} color="#7ACEFA" />
          <View style={styles.comCard}>
            <Text style={styles.comHeading}>Audio Call</Text>
            <Text style={styles.comSub}>call your doctor directly</Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default HospitalContactInfo;
const styles = StyleSheet.create({

  aval: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(14),
    borderRadius: scale(18),
    backgroundColor: '#056FD2',
  },
  main: {
    padding: scale(10),
  },
  slot: {
    alignItems: 'center',
  },

  availabilty: {
    color: '#fff',
    fontSize: scale(16),
  },

  time: {
    color: '#fff',
    fontSize: scale(12),

  },

  arrow: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(4),
  },

  communication: {
    fontSize: scale(18),
    fontWeight: '600',
    marginVertical: verticalScale(10),

  },

  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20)
  },

  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  comHeading: {
    fontSize: scale(16),
    fontWeight: '600',
  },

  comSub: {
    fontSize: scale(12),
    color: '#6B779A',
  },

  chatIcon: {
    backgroundColor: '#EDA1AB26',
    padding: scale(6),
    borderRadius: scale(14),
  },
  phoneIcon: {
    backgroundColor: '#7ACEFA26',
    padding: scale(6),
    borderRadius: scale(14),
  },

  book: {
    backgroundColor: '#056FD2',
    color: '#fff',
    fontSize: scale(16),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontWeight: '600',
    borderRadius: 20
  },
})