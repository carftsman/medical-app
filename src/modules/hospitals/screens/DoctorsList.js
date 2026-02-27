import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import DoctorCard from '../components/DoctorCard';
import DoctorSkeleton from '../components/DoctScreen-Skeleton';
import Backbtn from '../components/Backbtn';
import CategoryBar from '../components/Doctorlist-CategoryBar';

import api from '../../../api/client';
import { hospitalApi } from '../services/hospital.api';
import { setConsultationMode } from '../redux/slices/BookingSlice';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT, SIZES } from '../../../config/constants';

const DoctorsList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const routeCategoryName = route.params?.categoryName;
  const routeMode = route.params?.mode;

  const reduxMode = useSelector(
    state => state.hospital?.consultation?.mode
  );

  const finalMode =
    (reduxMode || routeMode || 'offline').toUpperCase();

  const [search, setSearch] = useState('');
  const [doctorsData, setDoctorsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [activeCategory, setActiveCategory] = useState(
    routeCategoryName || 'All'
  );

  /* ---------- UPDATE CATEGORY WHEN ROUTE CHANGES ---------- */
  useEffect(() => {
    if (routeCategoryName) {
      setActiveCategory(routeCategoryName);
    }
  }, [routeCategoryName]);

  /* ---------- FETCH CATEGORIES ---------- */
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await hospitalApi.getcategories({ mode: 'BOTH' });

      setCategories([
        { name: 'All' },
        ...(res?.data?.data || []).map(cat => ({
          name: cat.name,
        })),
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingCategories(false);
    }
  };

  /* ---------- FETCH DOCTORS ---------- */
  useEffect(() => {
    fetchDoctors();
  }, [activeCategory, finalMode]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const params = {
        lat: 17.385044,
        lng: 78.486671,
        mode: finalMode,
        page: 1,
        limit: 20,
        distance: 50,
      };

      if (activeCategory !== 'All') {
        params.specialization = activeCategory;
      }

      const response = await api.get(
        '/hospital/user/doctors',
        { params }
      );

      setDoctorsData(response.data.doctors || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Backbtn onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Doctors</Text>
        <View style={{ width: 25 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={18} color="#999" />
        <TextInput
          placeholder="Search for Doctors"
          placeholderTextColor={COLORS.lightGray}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* CATEGORY BAR */}
      <View style={{ marginBottom: 16 }}>
        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          loadingCategories={loadingCategories}
          routeCategoryName={routeCategoryName}
          styles={styles}
        />
      </View>

      {/* MODE BUTTONS */}
      <View style={styles.modeContainer}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            finalMode === 'OFFLINE' && styles.selectedMode,
          ]}
          onPress={() =>
            dispatch(setConsultationMode('offline'))
          }
        >
          <Text
            style={[
              styles.modeText,
              finalMode === 'OFFLINE' && styles.activeModeText,
            ]}
          >
            Hospital visit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modeButton,
            finalMode === 'ONLINE' && styles.selectedMode,
          ]}
          onPress={() =>
            dispatch(setConsultationMode('online'))
          }
        >
          <Text
            style={[
              styles.modeText,
              finalMode === 'ONLINE' && styles.activeModeText,
            ]}
          >
            Online consult
          </Text>
        </TouchableOpacity>
      </View>

      {/* DOCTOR LIST */}
      <FlatList
        style={{ flex: 1 }}
        data={loading ? [1,2,3,4] : doctorsData}
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id.toString()
        }
        renderItem={({ item }) =>
          loading
            ? <DoctorSkeleton />
            : <DoctorCard doctor={item} />
        }
        ListEmptyComponent={
          !loading && (
            <Text style={styles.noResultText}>
              No Doctors available
            </Text>
          )
        }
      />
    </View>
  );
};

export default DoctorsList;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(SIZES.medium),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },

  headerTitle: {
    flex: 1,
    fontSize: scale(16),
    fontFamily: FONT.medium,
    textAlign: 'center',
    fontWeight: '700',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 6,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
  },

  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    fontSize: 13,
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },

  activeFilterText: {
    color: COLORS.white,
    fontWeight: '600',
  },

  skeletonChip: {
    height: verticalScale(36),
    width: scale(90),
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },

  
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  
  },

  modeButton: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  selectedMode: {
    backgroundColor: COLORS.primary,
  },

  modeText: {
    fontFamily: FONT.medium,
    fontSize: 14,
    color: COLORS.primary,
  },

  activeModeText: {
    color: COLORS.white,
  },

  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.gray,
  },
});