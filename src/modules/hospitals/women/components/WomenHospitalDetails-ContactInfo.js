import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import { COLORS, SIZES, FONT } from '../../../../config/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const WomenHospitalContactInfo = ({ hospital, hospitalId, }) => {
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
      <TouchableOpacity style={styles.aval} onPress={() => navigation.navigate('WomenDoctorsScreen', {
        hospitalId,
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
          <Ionicons style={styles.chatIcon} name="chatbubble" size={28} color={COLORS.white} />
          <View style={styles.comCard}>
            <Text style={styles.comHeading}>Chat</Text>
            <Text style={styles.comSub}>Chat me up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chat} onPress={handleCallPress}>

          <Ionicons style={styles.phoneIcon} name="call" size={scale(28)} color={COLORS.white} />
          <View style={styles.comCard}>
            <Text style={styles.comHeading}>Audio Call</Text>
            <Text style={styles.comSub}>call your doctor directly</Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  );
}

export default WomenHospitalContactInfo;
const styles = StyleSheet.create({

  aval: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(14),
    borderRadius: scale(18),
    backgroundColor: COLORS.pink,
  },

  main: {
    padding: scale(10),
  },

  slot: {
    alignItems: 'center',
  },

  availabilty: {
    color: COLORS.white,
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.medium,
  },

  time: {
    color: COLORS.white,
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
  },

  arrow: {
    backgroundColor: COLORS.white,
    borderRadius: scale(16),
    padding: scale(4),
  },

  communication: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.medium,
    color: COLORS.black,
    marginVertical: verticalScale(10),
  },

  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },

  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  

  comHeading: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.medium,
    color: COLORS.darkgray,
  },

  comSub: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },

  chatIcon: {
    backgroundColor: COLORS.pink,
    padding: scale(6),
    borderRadius: scale(14),
  },

  phoneIcon: {
    backgroundColor: COLORS.pink,
    padding: scale(6),
    borderRadius: scale(14),
  },

  book: {
    backgroundColor: COLORS.pink,
    color: COLORS.white,
    fontSize: scale(SIZES.medium),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontFamily: FONT.medium,
    borderRadius: scale(20),
  },

});
