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
import LinearGradient from 'react-native-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LocationHeader from '../../../components/LocationHeader';
import NotificationHeader from '../../../components/NotificationHeader';
import SearchBar from '../../../components/SearchBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { hospitalApi } from '../services/hospital.api';
import { setConsultationMode } from '../redux/slices/BookingSlice';
import { verticalScale, scale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';
import CategoryCard from '../components/CategoryCard';
import HospitalCardmain from '../components/HospitalCardmain';
import SOSButton from '../../../components/SosButton';

const HospitalsHomeScreen = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState({});
  const [categories, setCategories] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [hospitalMode, setHospitalMode] = useState('BOTH');

  const [catPage, setCatPage] = useState(1);
  const [hosPage, setHosPage] = useState(1);

  const catLimit = 20;
  const hosLimit = 20;

  const [loadingHospitals, setLoadingHospitals] = useState(false);

  const handleFavoriteToggle = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchCategories(1);
    fetchNearbyHospitals(1);
  }, [hospitalMode]);

  const fetchCategories = async page => {
    try {
      const res = await hospitalApi.getcategories({
        mode: hospitalMode,
        page,
        limit: catLimit,
      });

      const list = res?.data?.data || [];
      setCategories(prev => (page === 1 ? list : [...prev, ...list]));
      setCatPage(page);
    } catch (e) {
      console.log('Categories error', e);
    }
  };

  const fetchNearbyHospitals = async page => {
    try {
      setLoadingHospitals(true);

      const res = await hospitalApi.getNearbyHospitals({
        mode: hospitalMode,
        latitude: 17.4474,
        longitude: 78.3762,
        page,
        limit: hosLimit,
      });

      const list = res?.data?.data || [];
      setNearbyHospitals(prev => (page === 1 ? list : [...prev, ...list]));
      setHosPage(page);
    } catch (e) {
      console.log('Hospitals error', e);
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
    navigation.navigate('DoctorsList');
  };

  const goToDepartments = () => {
    dispatch(setConsultationMode('all'));
    navigation.navigate('DepartmentsList');
  };

  const goToHospitals = () => {
    navigation.navigate('HospitalsScreen');
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

        <SearchBar placeholder="Search medicines, healthcare…" />
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + verticalScale(20) }}
      >
        {/* Services */}
        <View style={styles.servicesWrapper}>
          <View style={styles.servicesRow}>
            <TouchableOpacity onPress={goOnlineMode} style={styles.card}>
              <Image source={require('../../../../assets/Remotecare.png')} style={styles.image} />
              <Text style={styles.title}>Remote care</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goOfflineMode} style={styles.card}>
              <Image source={require('../../../../assets/Doctor_visit.png')} style={styles.image} />
              <Text style={styles.title}>Doctor Visit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={goInstantMode} style={styles.card}>
              <Image source={require('../../../../assets/Instant_call.png')} style={styles.image} />
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
        </View>



        <View style={styles.nearbyHeader}>
          <Text style={styles.nearby}>Departments</Text>
          <TouchableOpacity onPress={goToDepartments}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>


        {/* ✅ HORIZONTAL SCROLL HOSPITAL CARDS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems:'center',
            paddingHorizontal:scale(15),
          }}>
          {categories.map(item => (
            <View key={item.id} style={styles.cat}>
            <CategoryCard
              title={item.name}
              imageUrl={{ uri: item.imageUrl }}
            />
            </View>
          ))}
        </ScrollView>
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

        {/* Near by Hospitals Header */}

        <View style={styles.nearbyHeader}>
          <Text style={styles.nearby}>Near by Hospitals</Text>
          <TouchableOpacity onPress={goToHospitals}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>


        {/* ✅ HORIZONTAL SCROLL HOSPITAL CARDS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nearbyHospitals.map(item => (
            <HospitalCardmain
              key={item.id}
              image={item.imageUrl ? { uri: item.imageUrl } : null}
              hospitalName={item.name}
              distance={`${item.distance.toFixed(1)} km`}
              location={item.place}
              description={item.speciality}
              isOpen24Hours={item.isOpen}
              isFavorite={!!favorites[item.id]}
              onFavoritePress={() => handleFavoriteToggle(item.id)}
              onViewDetails={() =>
                navigation.navigate('HospitalDetails', { id: item.id })
              }
            />
          ))}
        </ScrollView>


        {/* Recent Appointments Header */}
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Appointments</Text>
          <TouchableOpacity >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Appointment Card */}
        <View style={styles.recentCard}>
          <View style={styles.recentRow}>
            <Image
              source={require('../../../../assets/Doctors.png')}
              style={styles.doctorImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.hospitalName}>Apollo Hospitals</Text>
              <Text style={styles.doctorName}>Dr. Rajesh Kumar</Text>

              <View style={styles.dateRow}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                  <Text style={styles.dateText}>Dec 28, 2025</Text>
                </View>

                <View style={styles.iconRow}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.timeText}>10:30 AM</Text>
                </View>
              </View>

            </View>

            <View style={styles.statusWrap}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => navigation.navigate('BookingDetails')}
          >
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>


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
      {/* Floating SOS button */}


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
  leftWrap: { flex: 1 },

  servicesWrapper: {
    paddingHorizontal: scale(15),
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
  bannerWrapper: { paddingHorizontal: scale(15), marginTop: verticalScale(24), },
  bannerContainer: {
    flexDirection: 'row',
    borderRadius: scale(16),
    padding: scale(16),
    alignItems: 'center',
    overflow: 'hidden',
  },
  bannerContent: { flex: 1, },
  bannerTitle: { fontSize: SIZES.large, fontFamily: FONT.bold, color: COLORS.white, marginBottom: verticalScale(12), },
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
    width: scale(150), height: scale(140), alignItems: 'center', justifyContent: 'center',
  },
  circleLarge: { position: 'absolute', width: scale(120), height: scale(120), borderRadius: scale(90), backgroundColor: COLORS.Iceblue, right: -scale(-7), top: -scale(-7), },
  circleSmall: { position: 'absolute', width: scale(90), height: scale(90), borderRadius: scale(65), backgroundColor: COLORS.seablue, right: -scale(-22), top: -scale(-22), },
  bannerImage: { width: scale(230), height: scale(230), resizeMode: 'contain', marginRight: 43 },
  nearbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: verticalScale(20),
  },
  categoryItem: {
    marginRight: scale(12),

  },


  viewAll: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.primary,
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
  cat:{
    marginRight:6,

  },
  left: {
    paddingRight: scale(10),
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
  nearby: { 
    fontSize: SIZES.large, 
    marginHorizontal: scale(8) 
  },
  sosTextLine1: {
    fontSize: scale(40),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(1),
    marginTop: verticalScale(-4),
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



  sosMainBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  sosText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },


  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: verticalScale(24),
  },

  recentTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
  },

  recentCard: {
    backgroundColor: '#FFF',
    marginHorizontal: scale(15),
    marginTop: verticalScale(12),
    borderRadius: scale(14),
    padding: scale(14),
    elevation: 1,
  },

  recentRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },

  doctorImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },

  hospitalName: {
    fontSize: SIZES.medium,
    fontWeight: '900',
  },

  doctorName: {
    fontSize: SIZES.small,
    color: '#6B7280',
  },

  dateRow: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
  },


  statusWrap: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
    height: 30
  },

  statusText: {
    fontSize: scale(12),
    color: '#16A34A',
    fontWeight: '600',

  },

  detailsBtn: {
    marginTop: verticalScale(12),
    backgroundColor: '#2563EB',
    paddingVertical: verticalScale(10),
    borderRadius: scale(20),
    width: verticalScale(220),
    alignItems: 'center',
    alignSelf: 'center'
  },

  detailsText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: scale(14),
  },

});
