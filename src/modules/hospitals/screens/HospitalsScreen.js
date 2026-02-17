import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

import HospitalCard from '../components/HospitalCard';
import SearchHospital from '../components/SearchHospital';
import HospitalFilters from '../components/HospitalFilters';
import HospitalFilterPopup from '../components/HospitalFilterPopup';

import { hospitalApi } from '../../../api/hospitalApi';
import { scale } from '../../../utils/styling';

const LATITUDE = 17.385044;
const LONGITUDE = 78.486671;

const HospitalsScreen = ({ navigation }) => {
  const route = useRoute();
  const isFromSearch = !!route.params?.searchResults;

  const [mode, setMode] = useState('BOTH');
  const [hospitals, setHospitals] = useState([]);
  const [overrideResults, setOverrideResults] = useState(route.params?.searchResults || null);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  /* ================= LOAD HOSPITALS ================= */
  const loadHospitals = async selectedMode => {
    setLoading(true);
    setMode(selectedMode);
    setOverrideResults(null); // reset search/filter safely

    try {
      const res = await hospitalApi.getHospitalsByMode({
        mode: selectedMode,
        latitude: LATITUDE,
        longitude: LONGITUDE,
      });

      const hospitalList =
        res?.data?.data ||
        res?.data?.hospitals ||
        [];

      setHospitals(Array.isArray(hospitalList) ? hospitalList : []);
    } catch (error) {
      console.log('Hospital fetch error:', error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  if (!route.params?.searchResults) {
    loadHospitals('BOTH');
  }
}, []);

  /* ================= DATA SOURCE ================= */
  const dataSource =
    overrideResults !== null ? overrideResults : hospitals;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.title}>Nearby Hospitals</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* SEARCH + FILTER */}
        <View style={styles.searchRow}>
          <SearchHospital
            mode={mode}
            onResults={data => {
              if (!isFromSearch) {
                setOverrideResults(data);
              }
            }}
          />

          <HospitalFilters onPress={() => setShowFilter(true)} />
        </View>

        {/* MODE SWITCH */}
        <View style={styles.modeRow}>
          {['ONLINE', 'OFFLINE', 'BOTH'].map(item => (
            <ModeButton
              key={item}
              label={item}
              active={mode === item}
              onPress={() => loadHospitals(item)}
            />
          ))}
        </View>

        {/* LIST */}
        {loading ? (
          <ActivityIndicator style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) =>
              String(item.id || item._id || index)
            }
            renderItem={({ item }) => (
              <HospitalCard
                image={item.imageUrl || null} // ✅ let card handle it
                hospitalName={item.name || item.hospitalName}
                distance={item.distance}
                location={item.place || item.location || ''}
                description={item.speciality || item.department || ''}
                isOpen24Hours={item.isOpen24x7 || item.isOpen}

                isFavorite={!!favorites[item.id]}
                onFavoritePress={() =>
                  setFavorites(prev => ({
                    ...prev,
                    [item.id]: !prev[item.id],
                  }))
                }

                onViewDetails={() =>
                  navigation.navigate('HospitalDetails', {
                    data: item,
                    id: item.id,
                  })
                }
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No hospitals found
              </Text>
            }
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* FILTER POPUP */}
        <HospitalFilterPopup
          visible={showFilter}
          mode={mode}
          latitude={LATITUDE}
          longitude={LONGITUDE}
          onClose={() => setShowFilter(false)}
          onApply={data => setOverrideResults(data)} // ✅ unified
        />
      </View>
    </SafeAreaView>
  );
};

export default HospitalsScreen;

/* ================= MODE BUTTON ================= */

const ModeButton = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.modeButton, active && styles.activeMode]}
    onPress={onPress}
  >
    <Text
      style={[styles.modeText, active && styles.activeModeText]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '700',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
  },
  modeRow: {
    flexDirection: 'row',
    margin: scale(16),
    backgroundColor: '#F2F4F7',
    borderRadius: scale(10),
    padding: scale(4),
  },
  modeButton: {
    flex: 1,
    paddingVertical: scale(8),
    borderRadius: scale(8),
    alignItems: 'center',
  },
  activeMode: {
    backgroundColor: '#056FD2',
  },
  modeText: {
    color: '#667085',
    fontWeight: '600',
  },
  activeModeText: {
    color: '#FFF',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
