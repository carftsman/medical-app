import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LocationHeader from '../../../components/LocationHeader';
import NotificationHeader from '../../../components/NotificationHeader';
import SearchBar from '../../../components/SearchBar';
import { useDispatch } from 'react-redux';
import { hospitalApi } from '../services/hospital.api';
import { setConsultationMode } from '../redux/slices/BookingSlice';
import { verticalScale, scale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';
import ServicesSection from '../components/Home-ServicesSection';
import DepartmentsSection from '../components/Home-Department';
import SOSButton from '../../../components/SosButton';
import RecentAppointments from '../components/Home-RecentAppointments';
import HospitalsSection from '../components/Home-Hospitals';




const HospitalsHomeScreen = ({navigation}) => {
  //const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState({});
  const [categories, setCategories] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [deptError, setDeptError] = useState(null);
  const [hospitalError, setHospitalError] = useState(null);
  const handleFavoriteToggle = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        pos => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        err => reject(err),
        { enableHighAccuracy: true, timeout: 15000 }
      );
    });


  useEffect(() => {
    fetchCategories();
    fetchNearbyHospitals();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingDepartments(true)
      setDeptError(null);
      const res = await hospitalApi.getcategories({ mode: 'BOTH' });
      setCategories(res?.data?.data || []);
    } catch (e) {
      setDeptError('Failed to load departments');
    } finally {
      setLoadingDepartments(false)
    }
  };

  const fetchNearbyHospitals = async () => {
    try {
      setLoadingHospitals(true);
      setHospitalError(null);
      const { latitude, longitude } = await getUserLocation();
      const res = await hospitalApi.getNearbyHospitals({
        mode: 'BOTH',
        latitude: 17.385044,
        longitude: 78.486671,
      });
      setNearbyHospitals(res?.data?.data || []);
    } catch (err) {
      setHospitalError('Failed to load nearby hospitals');
    } finally {
      setLoadingHospitals(false);
    }
  };

  const goOnlineMode = () => {
    dispatch(setConsultationMode('online'));
    navigation.navigate('DepartmentsList');
  };

  const goOfflineMode = () => {
    dispatch(setConsultationMode('offline'));
    navigation.navigate('DepartmentsList');
  };

  const goInstantMode = () => {
    dispatch(setConsultationMode('instant'));
    navigation.navigate('PatientDetails');
  };

  const goToDepartments = () => {
    dispatch(setConsultationMode('all'));
    navigation.navigate('DepartmentsList');
  };

  const goToHospitals = () => {
    navigation.navigate('HospitalsScreen');
  };
  const onDepartmentPress = (item) => {
  console.log('Pressed department:', item.name);

  navigation.getParent().navigate('DoctorsList', {
    categoryId: item.id,
    categoryName: item.name,
    mode: 'offline',
  });
};



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <LinearGradient
        colors={[COLORS.blue, COLORS.skyblue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topHeaderWrapper}
      >
        <View style={styles.headerRow}>
          <View style={styles.leftWrap}>
            <LocationHeader />
          </View>
          <NotificationHeader />
        </View>

        <SearchBar
          placeholder="Search medicines, healthcare…"
          editable={false}
          onPress={() => navigation.navigate("SearchScreen")}
        />
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + verticalScale(20) }}
      >
        {/* Services */}
        <ServicesSection
          onOnline={goOnlineMode}
          onOffline={goOfflineMode}
          onInstant={goInstantMode}
        />

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
        </View>

        <DepartmentsSection
          categories={categories}
          onViewAll={goToDepartments}
          loading={loadingDepartments}
          onCategoryPress={onDepartmentPress}
        />

        {deptError && (
          <Text style={styles.errorText}>{deptError}</Text>
        )}


        <LinearGradient
          colors={[COLORS.purple, COLORS.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.freecard}
        >
          <View style={styles.left}>
            <Text style={styles.freetitle}>Free Health Checkup</Text>
            <Text style={styles.sub}>Get personalized health advice from our experts </Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Near by Hospitals */}
        <HospitalsSection
          hospitals={nearbyHospitals}
          favorites={favorites}
          onToggleFav={handleFavoriteToggle}
          onViewAll={goToHospitals}
          onDetails={id => navigation.navigate('HospitalDetails', { id })}
          loading={loadingHospitals}
        />

        {hospitalError && (
          <Text style={styles.errorText}>{hospitalError}</Text>
        )}


        {/* Recent Appointments */}
        <RecentAppointments
          onViewDetails={() => navigation.navigate('BookingDetails')}
        />

        <View style={styles.sosWrapper}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTextLine1}>
              Make it up
            </Text>
            <Text style={styles.sosTextLine2}>
              with <Text style={{ fontWeight: '800' }}>Ease</Text>
            </Text>
            <Text style={styles.sosTextLine3}>
              Love India ❤️
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* SOS button */}
      <SOSButton />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(50),
    marginBottom: verticalScale(15),
  },
  leftWrap: { 
    flex: 1 
  },

  bannerWrapper: { 
    paddingHorizontal: scale(15),
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
    right: scale(7), 
    top: scale(7), 
  },
  circleSmall: { 
    position: 'absolute', 
    width: scale(90), 
    height: scale(90), 
    borderRadius: scale(65), 
    backgroundColor: COLORS.seablue, 
    right: scale(22), 
    top: scale(22), 
  },
  bannerImage: { 
    width: scale(230), 
    height: scale(230), 
    resizeMode: 'contain', 
    marginRight: 43 
  },

  freecard: {
    marginHorizontal: scale(15),
    marginTop: verticalScale(24),
    borderRadius: scale(18),
    padding: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(5),
  },

  freetitle: {
    fontSize: scale(20),
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: verticalScale(6),
  },
  sub: {
    fontSize: scale(15),
    color: COLORS.white,
    lineHeight: scale(18),
    marginBottom: verticalScale(12),
  },
  btn: {
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(8),
    borderRadius: scale(10),
  },
  btnText: {
    color: COLORS.purple,
    fontWeight: FONT.bold,
    fontSize: SIZES.medium,
  },

  sosTextLine1: {
    fontSize: scale(40),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(1),
    marginTop: verticalScale(6),
    paddingLeft: scale(15),
    marginLeft: scale(10)
  },

  sosTextLine2: {
    fontSize: scale(40),
    paddingLeft: scale(15),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(0.5),
    marginTop: verticalScale(2),
    marginLeft: scale(10)
  },

  sosTextLine3: {
    fontSize: scale(27),
    paddingLeft: scale(15),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(0.5),
    marginTop: verticalScale(2),
    marginLeft: scale(10)
  },
  errorText: {
    color: '#DC2626',
    fontSize: SIZES.small,
    marginHorizontal: scale(15),
    marginTop: verticalScale(8),
  },


});
