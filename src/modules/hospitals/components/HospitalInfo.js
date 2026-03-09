import { React, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../config/constants';
const HospitalInfo = ({ hospital }) => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const categories = hospital?.specializations;
  const visibleCategories = categories;
  // const remainingCount = categories.length - visibleCategories.length;
  const PHONE_NUMBER = '9876543210';
  const handleCallPress = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };
  return (
    <View>
      <Image source={{ uri: hospital.imageUrl }} style={styles.Imagebg} />
      <View style={styles.details}>
        <View style={styles.d1}>
          <Text style={styles.count}>{hospital?.stats.patients || 0}+</Text>
          <Text style={styles.sub}>Patients</Text>
        </View>
        <View style={styles.d1}>
          <Text style={styles.count}>
            {' '}
            {hospital?.stats.experienceYears || 0}+
          </Text>
          <Text style={styles.sub}>Exp.years</Text>
        </View>
        <View style={styles.d1}>
          <Text style={styles.count}>{hospital?.stats.reviews || 0}+</Text>
          <Text style={styles.sub}>Reviews</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.body}>
          <View style={styles.name}>
            <Text style={styles.Hname}>{hospital.name}</Text>
            <TouchableOpacity onPress={handleCallPress}>
              <Ionicons
                style={styles.phone}
                name="call"
                size={scale(18)}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.distance}>
            <Ionicons
              name="location-outline"
              size={scale(19)}
              color="#364153"
            />
            <Text style={styles.location}>
              {' '}
              {hospital?.location.area}, {hospital?.location.city},{' '}
              {hospital?.location.pincode}{' '}
            </Text>
            <Text style={styles.km}>{hospital?.distanceKm} km </Text>
          </View>
          <Text
            numberOfLines={show1 ? undefined : 2}
            onPress={() => setShow1(!show1)}
            style={styles.para}
          >
            {hospital?.description}
          </Text>
          <View style={styles.category}>
            <View style={styles.categorylist}>
              {categories
                .slice(0, showMore ? categories.length : 6)
                .map((item, index) => (
                  <Text key={index} style={styles.categorycard}>
                    {item}
                  </Text>
                ))}
            </View>

            {categories.length > 6 && (
              <TouchableOpacity onPress={() => setShowMore(prev => !prev)}>
                <Text style={styles.more}>
                  {!showMore ? `+${categories.length - 6} more` : 'Showless'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.Hname}>About Hospital</Text>
          <Text
            numberOfLines={show2 ? undefined : 2}
            onPress={() => setShow2(!show2)}
            style={styles.para}
          >
            {hospital?.about || 'no data'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HospitalInfo;
const styles = StyleSheet.create({
  Imagebg: {
    width: '100%',
    height: verticalScale(280),
    resizeMode: 'cover',
  },
  details: {
    marginTop: verticalScale(-30),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    borderRadius: scale(18),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  d1: {
    alignItems: 'center',
  },

  count: {
    fontSize: scale(24),
    fontWeight: '600',
    color: '#056FD2',
  },

  sub: {
    fontSize: scale(11),
    color: '#8A96BC',
  },
  phone: {
    padding: scale(6),
    backgroundColor: '#F3F4F6',
    borderRadius: scale(20),
  },

  main: {
    padding: scale(16),
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Hname: {
    fontSize: scale(20),
    fontWeight: '600',
    marginVertical: verticalScale(6),
    color: '#1E293B',
  },

  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },

  location: {
    fontSize: scale(14),
    color: '#4A5565',
  },

  km: {
    fontSize: scale(14),
    color: '#056FD2',
  },

  para: {
    fontSize: scale(14),
    lineHeight: verticalScale(22),
    paddingVertical: verticalScale(8),
    color: '#4A5565',
  },
  category: {
    marginVertical: verticalScale(10),
  },

  categorylist: {
    flexDirection: 'row',
    gap: scale(10),
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  categorycard: {
    fontSize: scale(13),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#056FD2',
    color: '#056FD2',
    backgroundColor: '#DBEAFE',
    // marginBottom: verticalScale(6),
  },
  more: {
    marginTop: verticalScale(8),
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
    backgroundColor: '#E5E7EB',
    color: '#4A5565',
  },
});
