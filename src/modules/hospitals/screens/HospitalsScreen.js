import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HospitalCard from '../components/HospitalCard';
import SearchHospital from '../components/SearchHospital';
import HospitalFilters from '../components/HospitalFilters';
import HospitalFilterPopup from '../components/HospitalFilterPopup';

import { hospitalApi } from '../../../api/hospitalApi';
import { scale } from '../../../utils/styling';

const LATITUDE = 17.385044;
const LONGITUDE = 78.486671;

const HospitalsScreen = ({ navigation }) => {
  const [hospitals, setHospitals] = useState([]);
  const [overrideResults, setOverrideResults] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  /* LOAD HOSPITALS */
  const loadHospitals = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setOverrideResults(null);

    try {
      const res = await hospitalApi.getNearbyHospitals({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      });

      const hospitalList =
        res?.data?.data ||
        res?.data?.hospitals ||
        res?.data?.results ||
        [];

      setHospitals(Array.isArray(hospitalList) ? hospitalList : []);
    } catch (error) {
      console.log('Hospital fetch error:', error);
      setHospitals([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const onRefresh = () => {
    loadHospitals(true);
  };

  /*  DATA SOURCE  */
  const dataSource =
    overrideResults !== null ? overrideResults : hospitals;

  /*  SKELETON CARD  */
  const SkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonLineLarge} />
        <View style={styles.skeletonLineSmall} />
        <View style={styles.skeletonLineSmall} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/*  HEADER = */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.title}>Nearby Hospitals</Text>

          <View style={{ width: 22 }} />
        </View>

        {/* SEARCH AND FILTER */}
        <View style={styles.searchRow}>
          <SearchHospital
            onResults={setOverrideResults}
          />

          <HospitalFilters
            onPress={() => setShowFilter(true)}
          />
        </View>

        {/*LIST  */}
        {loading ? (
          <View style={{ marginTop: 20 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) =>
              String(item?.id || item?._id || index)
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#056FD2']}
              />
            }
            renderItem={({ item }) => (
              <HospitalCard
                image={item?.imageUrl || null}
                hospitalName={item?.name || item?.hospitalName}
                distance={item?.distance}
                location={item?.place || item?.location || ''}
                description={item?.speciality || item?.department || ''}
                isOpen24Hours={
                  item?.isOpen24x7 || item?.isOpen || false
                }

                isFavorite={!!favorites[item?.id]}

                onFavoritePress={() =>
                  setFavorites(prev => ({
                    ...prev,
                    [item?.id]: !prev[item?.id],
                  }))
                }

                onViewDetails={() =>
                  navigation.navigate('HospitalDetails', {
                    data: item,
                    id: item?.id,
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

        {/* FILTER POPUP  */}
        <HospitalFilterPopup
          visible={showFilter}
          latitude={LATITUDE}
          longitude={LONGITUDE}
          onClose={() => setShowFilter(false)}
          onApply={(filteredData) =>
            setOverrideResults(filteredData)
          }
        />

      </View>
    </SafeAreaView>
  );
};

export default HospitalsScreen;

/*  STYLES */

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
    marginBottom: scale(8),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },

  /* SKELETON  */

  skeletonCard: {
    flexDirection: 'row',
    backgroundColor: '#F2F4F7',
    marginHorizontal: scale(16),
    marginBottom: scale(12),
    borderRadius: scale(12),
    padding: scale(12),
  },
  skeletonImage: {
    width: scale(80),
    height: scale(80),
    backgroundColor: '#E0E0E0',
    borderRadius: scale(10),
  },
  skeletonContent: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  skeletonLineLarge: {
    height: scale(14),
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: scale(8),
    width: '80%',
  },
  skeletonLineSmall: {
    height: scale(12),
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: scale(6),
    width: '60%',
  },
});
