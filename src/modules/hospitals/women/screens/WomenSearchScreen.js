/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import api from '../../../../api/client';
import { COLORS, FONT, SIZES } from '../../../../config/constants';
import { scale, verticalScale } from '../../../../utils/styling';

const RECENT_SEARCHES = ['Fertility', 'Gynacologist', 'Dermatologist'];
const USER_LAT = 17.385;
const USER_LNG = 78.4867;

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // SEARCH RESULTS
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  // BEFORE SEARCH DATA
  const [topDoctors, setTopDoctors] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const debounceRef = useRef(null);
  const isSearching = search.trim().length > 0;

  const fetchResults = async (query) => {
    try {
      setLoading(true);
      const res = await api.get('/hospital/user/modeSearch', {
        params: { q: query },
      });
      setDoctors(res?.data?.doctors || []);
      setHospitals(res?.data?.hospitals || []);
    } catch (e) {
      console.log('Search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopDoctors = async () => {
    try {
      const res = await api.get('/hospital/user/doctors', {
        params: { lat: USER_LAT, lng: USER_LNG ,women: true},
      });
      setTopDoctors(res?.data?.doctors || []);
    } catch (e) {
      console.log('Top doctors error:', e);
    }
  };
  const fetchNearbyHospitals = async () => {
    try {
      const res = await api.get('/hospital/user/hospitals/nearby', {
        params: { latitude: USER_LAT, longitude: USER_LNG ,women: true},
      });
      setNearbyHospitals(res?.data?.data || []);
    } catch (e) {
      console.log('Nearby hospitals error:', e);
    }
  };
  useEffect(() => {
    fetchTopDoctors();
    fetchNearbyHospitals();
  }, []);
  const onChangeSearch = (text) => {
    setSearch(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (text.trim()) {
        fetchResults(text.trim());
      } else {
        setDoctors([]);
        setHospitals([]);
      }
    }, 500);
  };

  const renderRecent = ({ item }) => (
    <TouchableOpacity
      style={styles.recentCard}
      onPress={() => {
        setSearch(item);
        fetchResults(item);
      }}
    >
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderDoctor = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('WomenDoctorDetails', { doctorId: item.id })
      }
    >
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.avatar}/>
        <View style={styles.onlineDot} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.sub}>{item.specialization}</Text>
        <Text style={styles.meta}>⭐ 4.5 (200+ reviews)</Text>
      </View>

      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

 const renderHospital = ({ item }) => (
  <View style={styles.hospitalCard}>
    <View style={styles.hospitalRow}>

      {/* Left image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.hospitalImage}
      />

      {/* Right content */}
      <View style={styles.hospitalRight}>

        <View style={styles.hospitalTitleRow}>
          <Text style={styles.title}>{item.name}</Text>

          {item.isOpen && (
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open</Text>
            </View>
          )}
        </View>
        <Text style={styles.hospitalMeta}>
          {item.distance ? `${Number(item.distance).toFixed(1)} kms`
    : '2.4 kms'}  | {item.place}
        </Text>
<Text style={styles.hospitalSub}>
    {item.speciality}
  </Text>
       
        <TouchableOpacity
          style={styles.hospitalInlineBtn}
          onPress={() =>
            navigation.navigate('WomenHospitalDetails', { hospitalId: item.id })
          }
        >
          <Text style={styles.hospitalInlineBtnText}>
            View Details
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Find Your Doctor</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={COLORS.gray} />
          <TextInput
            placeholder="Search doctors, Specialties"
            value={search}
            onChangeText={onChangeSearch}
            style={styles.searchInput}
            placeholderTextColor={COLORS.gray}
          />
          <Ionicons name="mic-outline" size={20} color={COLORS.gray} />
        </View>

        {isSearching && loading && (
          <ActivityIndicator color={COLORS.primary} />
        )}

        <FlatList
          data={[1]}
          keyExtractor={(i, idx) => idx.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
          ListHeaderComponent={() => (
            <>
              {!isSearching && (
                <>
                  <View style={styles.header}>
                    <Text style={styles.headerText}>Recent Searches</Text>
                    <Text style={styles.clear}>Clear All</Text>
                  </View>

                  <FlatList
                    data={RECENT_SEARCHES}
                    renderItem={renderRecent}
                    keyExtractor={(i, idx) => idx.toString()}
                  />

                  {topDoctors.length > 0 && (
                    <>
                      <View style={styles.sectionHeader}>
                        {/* changed only this text */}
                        <Text style={styles.section}>
                          Available Doctors
                        </Text>
                        <Text style={styles.viewAll}>View All</Text>
                      </View>

                      <FlatList
                        horizontal
                        data={topDoctors}
                        renderItem={renderDoctor}
                        keyExtractor={(i, idx) => `${i.id || idx}`}
                        showsHorizontalScrollIndicator={false}
                      />
                    </>
                  )}

                  {nearbyHospitals.length > 0 && (
                    <>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.section}>Near by hospitals</Text>
                        <Text style={styles.viewAll}>View All</Text>
                      </View>

                      {nearbyHospitals.map((item, idx) => (
                        <View key={item.id || idx}>
                          {renderHospital({ item })}
                        </View>
                      ))}
                    </>
                  )}
                </>
              )}

              {isSearching && (
                <>
                  <Text style={styles.instant}>INSTANT RESULTS</Text>
                  {doctors.length > 0 && (
                    <>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.section}>DOCTORS</Text>
                        <Text style={styles.viewAll}>View All</Text>
                      </View>
                      {doctors.slice(0, 5).map((item, idx) => (
                        <View key={item.id || idx}>
                          {renderDoctor({ item })}
                        </View>
                      ))}
                    </>
                  )}

                  {hospitals.length > 0 && (
                    <>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.section}>HOSPITALS</Text>
                        <Text style={styles.viewAll}>View All</Text>
                      </View>
                      {hospitals.slice(0, 5).map((item, idx) => (
                        <View key={item.id || idx}>
                          {renderHospital({ item })}
                        </View>
                      ))}
                    </>
                  )}

                  {!loading &&
                    doctors.length === 0 &&
                    hospitals.length === 0 && (
                      <Text style={styles.emptyText}>No results found</Text>
                    )}
                </>
              )}
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: scale(16),
  },
  screenTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginBottom: verticalScale(14),
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    paddingHorizontal: scale(14),
    height: verticalScale(48),
    marginBottom: verticalScale(16),
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(10),
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  headerText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  clear: {
    fontSize: SIZES.small,
    color: COLORS.danger,
  },
  recentCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(10),
  },
  recentText: {
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  viewAll: {
    fontSize: SIZES.small,
    color: COLORS.pink,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: scale(12),
    borderRadius: scale(14),
    marginBottom: verticalScale(12),
    marginRight: scale(8),
    alignItems: 'center',
  },
  avatar: {
    width: scale(56),
    height: scale(65),
    borderRadius: scale(28),
    marginRight: scale(12),
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    paddingBottom: scale(5),
  },
  sub: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    paddingBottom: scale(5),
  },
  meta: {
    fontSize: SIZES.small,
    color: COLORS.darkgray,
  },
  bookBtn: {
    borderWidth: 1,
    borderColor: COLORS.pink,
    borderRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(6),
  },
  bookText: {
    fontSize: SIZES.small,
    color: COLORS.pink,
  },
  hospitalCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    padding: scale(12),
    marginBottom: verticalScale(14),
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
  },
  hospitalTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hospitalMeta: {
    marginTop: verticalScale(2),
    fontSize: SIZES.small,
    color: COLORS.pink,
    

  },
  openBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: scale(6),
    paddingHorizontal: scale(8),
    marginBottom: scale(1),
  },
  openText: {
    fontSize: SIZES.small,
    color: COLORS.lightGreen,
  },
  viewBtn: {
    marginTop: verticalScale(12),
    backgroundColor: COLORS.pink,
    borderRadius: scale(20),
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  viewText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  instant: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    letterSpacing: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    color: COLORS.gray,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: scale(12),
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    backgroundColor: COLORS.lightGreen,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  hospitalRight: {
  flex: 1,
  marginLeft: scale(10),
  justifyContent: 'space-between',
},

hospitalInlineBtn: {
  marginTop: verticalScale(10),
  backgroundColor: COLORS.pink,
  borderRadius: scale(20),
  paddingVertical: verticalScale(6),
  paddingHorizontal: scale(38),
  alignSelf: 'flex-start',
},
hospitalInlineBtnText: {
  color: COLORS.white,
  fontSize: SIZES.small,
},
hospitalSub: {
  fontSize: SIZES.small,
  color: COLORS.gray,
  marginTop: verticalScale(2),
},

};
export default SearchScreen;
