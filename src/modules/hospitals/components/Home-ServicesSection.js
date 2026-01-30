import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';

const ServicesSection = ({ onOnline, onOffline, onInstant }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onOnline} style={styles.card}>
          <Image source={require('../../../../assets/Remotecare.png')} style={styles.image} />
          <Text style={styles.title}>Remote care</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onOffline} style={styles.card}>
          <Image source={require('../../../../assets/Doctor_visit.png')} style={styles.image} />
          <Text style={styles.title}>Doctor Visit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onInstant} style={styles.card}>
          <Image source={require('../../../../assets/Instant_call.png')} style={styles.image} />
          <Text style={styles.title}>Instant Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServicesSection;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(15),
    marginTop: verticalScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: scale(110),
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    alignItems: 'center',
    paddingVertical: verticalScale(6),
    elevation: 2,
  },
  image: {
    width: scale(110),
    height: scale(90),
    resizeMode: 'contain',
  },
  title: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.darkgray,
  },
});
