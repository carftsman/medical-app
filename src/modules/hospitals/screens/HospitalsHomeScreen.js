import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import LocationHeader from '../../../components/LocationHeader';
import NotificationHeader from '../../../components/NotificationHeader';
import SearchBar from '../../../components/SearchBar';

import { verticalScale, scale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';

const HospitalsHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Top Header */}
      <LinearGradient
        colors={[ COLORS.blue,COLORS.skyblue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topHeaderWrapper}
      >
        <View style={styles.headerRow}>
          <View style={styles.leftWrap}>
            <LocationHeader />
          </View>
          <View>
            <NotificationHeader />
          </View>
        </View>

        <SearchBar placeholder="Search medicines, healthcare…" />
      </LinearGradient>

      {/* Services */}
      <View style={styles.servicesWrapper}>
        <View style={styles.servicesRow}>
          <TouchableOpacity style={styles.card}>
            <Image
              source={require('../../../../assets/Remotecare.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Remote care</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require('../../../../assets/Doctor_visit.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Doctor Visit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Image
              source={require('../../../../assets/Instant_call.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Instant Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Doctor Banner */}
      <View style={styles.bannerWrapper}>
        <LinearGradient
          colors={[COLORS.lightblue, COLORS.blue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bannerContainer}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Find the Best Doctors{'\n'}For You
            </Text>

            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Learn more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageWrapper}>
            <View style={styles.circleLarge} />
            <View style={styles.circleSmall} />
            <Image
              source={require('../../../../assets/docbanner.png')}
              style={styles.bannerImage}
            />
          </View>
        </LinearGradient>
        <View>
          <Text style={styles.department}>Departments</Text>
        </View>

        <LinearGradient
              colors={["#FF9A00", "#FF6A00"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.freecard}
            >
              <View style={styles.left}>
                <Text style={styles.freetitle}>Free Health Checkup</Text>
                <Text style={styles.sub}>
                  Unlimited consultations &{"\n"}free tests
                </Text>
        
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          
      </View>
    </SafeAreaView>
  );
};

export default HospitalsHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  topHeaderWrapper: {
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(16),
    height: verticalScale(170),
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(50),
    marginBottom: verticalScale(15),
  },

  leftWrap: {
    flex: 1,
  },

  servicesWrapper: {
    paddingHorizontal: scale(10),
    marginTop: verticalScale(20),
  },

  servicesRow: {
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
    marginBottom: verticalScale(6),
  },

  title: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.darkgray,
    textAlign: 'center',
  },

  bannerWrapper: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(24),
  },

  bannerContainer: {
    flexDirection: 'row',
    borderRadius: scale(16),
    padding: scale(16),
    alignItems: 'center',
    overflow: 'hidden',
  },

  bannerContent: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.white,
    marginBottom: verticalScale(12),
  },

  bannerButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    alignSelf: 'flex-start',
  },

  bannerButtonText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.white,
  },

  imageWrapper: {
    width: scale(150),
    height: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleLarge: {
    position: 'absolute',
    width: scale(120),
    height: scale(120),
    borderRadius: scale(90),
    backgroundColor: COLORS.Iceblue,
    right: -scale(-7),
    top: -scale(-7),
  },

  circleSmall: {
    position: 'absolute',
    width: scale(90),
    height: scale(90),
    borderRadius: scale(65),
    backgroundColor: COLORS.seablue,
    right: -scale(-22),
    top: -scale(-22),
  },

  bannerImage: {
    width: scale(230),
    height: scale(230),
    resizeMode: 'contain',
    marginRight:43
  },
  //Deprtments
  department:{
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    paddingTop: verticalScale(10),
  },

  //card

  freecard: {
    marginHorizontal: scale(10),
    marginTop: verticalScale(24),
    borderRadius: scale(18),
    padding: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },

  left: {
    paddingRight: scale(10),
  },

  freetitle: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#FFF",
    marginBottom: verticalScale(6),
  },

  sub: {
    fontSize: scale(15),
    color: "#FFF",
    lineHeight: scale(18),
    marginBottom: verticalScale(12),
  },

  btn: {
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(8),
    borderRadius: scale(14),
  },

  btnText: {
    color: "#FF6A00",
    fontWeight: "700",
    fontSize: scale(13),
  },

});
