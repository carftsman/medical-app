import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import { scale } from '../../../../utils/styling';
import WomenHospitalCard from '../components/WomenHospitalScreen-Card';
import WomenHospitalFilter from '../components/WomenHopitalScreen-Filter';
import WomenHospitalFilterPopup from '../components/WomenHopitalScreen-FilterPopup';
import WomenHospitalSearch from '../components/WomenHospitalScreen-Search';
import WomenHospitalCardSkeleton from '../components/WomenHospialScreen-Skeleton';
import Backbtn from '../../components/Backbtn';
import api from "../../../../api/client";


const LATITUDE = 17.385044;
const LONGITUDE = 78.486671;
const DEFAULT_RADIUS = 20;

const WomenHospitalsScreen = ({ navigation, route }) => {
  const [hospitals, setHospitals] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [filterResults, setFilterResults] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const categoryIdFromRoute = route?.params?.categoryId || route?.params?.departmentId;
  const categoryNameFromRoute = route?.params?.categoryName || route?.params?.departmentName;
  console.log("Route Category ID:", categoryIdFromRoute);
  console.log("Route Category Name:", categoryNameFromRoute);
  const loadHospitals = async () => {

    setLoading(true);
    setSearchResults(null);
    setFilterResults(null);

    try {
      console.log("===== FILTER CLICKED =====");
      const res = await api.get(
        '/hospital/user/hospitals/nearby',
        {
          params: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            radius: DEFAULT_RADIUS,
            women: true,
            sort: 'distance',
            categoryIds: categoryIdFromRoute
              ? categoryIdFromRoute.toString()
              : undefined,

            page: 1,
            limit: 30,
          },
        }
      );
      console.log("API URL:", res.config.url);
      console.log("API RESPONSE COUNT:", res?.data?.data?.length);
      console.log("API RESPONSE DATA:", res?.data?.data);


      console.log("PARAMS SENT:",
        {
          latitude: LATITUDE,
          longitude: LONGITUDE,

        });


      const hospitalList =
        res?.data?.data ||

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
    if (typeof searchText !== 'string' || searchText.trim() === '') {
      setSearchResults(null);
      return;
    }

    const text = searchText.toLowerCase();

    const filtered = hospitals.filter(item =>
      item.name?.toLowerCase().includes(text) ||
      item.place?.toLowerCase().includes(text) ||
      item.location?.toLowerCase().includes(text) ||
      item.speciality?.toLowerCase().includes(text)
    );

    setSearchResults(filtered);
  }, [searchText, hospitals]);


  const handleApplyFilter = async filters => {
    console.log("===== APPLY FILTER CLICKED =====");
    console.log("Filters Received:", JSON.stringify(filters, null, 2));

    try {
      setLoading(true);
      setSearchText('');
      setSearchResults(null);

      const res = await api.get(
        '/hospital/user/hospitals/nearby',

        {
          params: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            radius: filters.distance || DEFAULT_RADIUS,
            sort: filters.sortBy || 'distance',
            categoryIds: filters.categoryIds?.join(',') || undefined,
            state: filters.state || undefined,
            city: filters.city || undefined,
            openNow: filters.openNow || undefined,
            open24x7: filters.open24x7 || undefined,

            women: true,

            page: 1,
            limit: 30,

          },

        }

      );

      console.log("FILTER PARAMS SENT:", {
        radius: filters.distance,
        categoryIds: filters.categoryIds,
        state: filters.state,
        city: filters.city,
        openNow: filters.openNow,
        open24x7: filters.open24x7,
      });

      console.log("FILTER API RESPONSE:", res?.data);
      let result = res?.data?.data || [];



      // if (filters.openNow) {
      //   result = result.filter(h => h.isOpen === true);
      // }

      // if (filters.open24x7) {
      //   result = result.filter(h => Boolean(h.open24x7));
      // }

      if (filters.city) {
        result = result.filter(h =>
          (h.location || h.place || '')
            .toLowerCase()
            .includes(filters.city.toLowerCase())

        );
      }

      if (filters.state) {
        result = result.filter(h =>
          (h.location || '')
            .toLowerCase()
            .includes(filters.state.toLowerCase())
        );
      }






      setFilterResults(result);
    } catch (e) {
      console.log('Filter error:', e);
      setFilterResults([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadHospitals();
  }, [categoryIdFromRoute]);

  const dataSource =
    searchText?.trim().length > 0
      ? searchResults || []
      : filterResults !== null
        ? filterResults
        : hospitals;



  return (

    <View style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Backbtn onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Nearby Hospitals</Text>
          <View style={{ width: 22 }} />
        </View>


        <View style={styles.searchRow}>
          <WomenHospitalSearch
            value={searchText}
            onChange={setSearchText}

          />
          <WomenHospitalFilter onPress={() => setShowFilter(true)} />
        </View>

        {loading ? (
          <>
            {[1, 2, 3].map(item => (
              <WomenHospitalCardSkeleton key={item} />
            ))}
          </>
        ) : (

          <FlatList
            data={dataSource}
            keyExtractor={(item, index) =>
              String(item.id || index)
            }
            renderItem={({ item }) => (
              <WomenHospitalCard
                image={item.imageUrl || null}
                hospitalName={item.name || item.hospitalName}
                distance={item.distance}
                location={item.place || item.location || ''}
                description={item.speciality || item.department || ''}
                isOpen24Hours={item.open24x7 || item.isOpen}
                rating={item.rating}
                isFavorite={!!favorites[item.id]}
                onFavoritePress={() =>
                  setFavorites(prev => ({
                    ...prev,
                    [item.id]: !prev[item.id],
                  }))
                }

                onViewDetails={() =>
                  navigation.navigate('WomenHospitalDetails', {
                    data: item,
                    id: item.id,
                    categoryId: categoryIdFromRoute,
                    categoryName: categoryNameFromRoute,
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

        <WomenHospitalFilterPopup
          visible={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilter}
        />
      </View>
    </View>
  );
};

export default WomenHospitalsScreen;


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
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
