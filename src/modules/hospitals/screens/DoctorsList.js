import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import DoctorCard from '../components/DoctorCard';
import DoctorSkeleton from '../components/DoctScreen-Skeleton';
import Backbtn from '../components/Backbtn';
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

  
  const reduxMode = useSelector(
    state => state.hospital?.consultation?.mode
  );

  
  const [search, setSearch] = useState('');
  const [doctorsData, setDoctorsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingCategories, setLoadingCategories] = useState(true);
  
 
  const finalMode =
  (routeMode || reduxMode || "offline").toUpperCase();

  const routeMode = route.params?.mode;
  useEffect(() => {
  if (routeCategoryName) {
    setActiveCategory(routeCategoryName);
  }

  if (routeMode) {
    dispatch(setConsultationMode(routeMode)); 
  }
}, [routeCategoryName, routeMode]);

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
      console.log('Category API error', e);
    } finally {
    setLoadingCategories(false); 
  }
  };

  useEffect(() => {
    fetchDoctors();
  }, [activeCategory, finalMode]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await api.get('/hospital/user/doctors', {
        params: {
          mode: finalMode,
        },
      });

    
      const mappedDoctors = (response.data.doctors || []).map(item => ({
        id: item.id.toString(),
        doctorName: item.name || '',
        specialization: item.specialization || '',
        experience: Number(item.experience) || 0,
        rating: Number(item.rating) || 0,
        fee: Number(item.consultationFee) || 0,
        hospitalName: item.hospital?.name || '',
        distance: Number(item.distance) || 0,
        availableDate: item.availableDate || 'today',
        availableTime: item.availableTime || '9AM - 5PM',
        imageUrl: item.imageUrl || 'https://via.placeholder.com/150',
        categoryName: item.category?.name || '',
      }));

      setDoctorsData(mappedDoctors);
    } catch (e) {
      console.log('Doctors API error', e);
    } finally {
      setLoading(false);
    }
  };
  const filteredDoctors =
  activeCategory === 'All'
    ? doctorsData
    : doctorsData.filter(
        d =>
          d.specialization?.toLowerCase() ===
          activeCategory.toLowerCase()
      );


  const ListHeader = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.searchBox}>
        <Icon name="magnify" size={18} color="#999" />
        <TextInput
          placeholder="Search for Doctors"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {loadingCategories
    ? [1, 2, 3, 4].map(i => (
        <View key={i} style={styles.skeletonChip} />
      ))
    : categories.map(cat => (
        <TouchableOpacity
          key={cat.name}
          style={[
            styles.filterButton,
            activeCategory === cat.name && styles.activeFilter,
          ]}
          onPress={() => setActiveCategory(cat.name)}
        >
          <Text
            style={[
              styles.filterText,
              activeCategory === cat.name &&
                styles.activeFilterText,
            ]}
          >
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
</ScrollView>


      {/* MODE FILTER */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { label: 'Hospital visit', value: 'OFFLINE' },
          { label: 'Online consult', value: 'ONLINE' },
        ].map(mode => (
          <TouchableOpacity
            key={mode.value}
            style={[
              styles.filterChip,
              finalMode === mode.value && styles.activeChip,
            ]}
            onPress={() =>
              dispatch(setConsultationMode(mode.value.toLowerCase()))
            }
          >
            <Text
              style={[
                styles.filterText,
                finalMode === mode.value && styles.activeText,
              ]}
            >
              {mode.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  /* ---------- RENDER ---------- */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbtn onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Doctors</Text>
        <View style={{ width: 25 }} />
      </View>

      <FlatList
        data={loading ? [1, 2, 3, 4] : filteredDoctors}
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id
        }
        renderItem={({ item }) =>
          loading ? <DoctorSkeleton /> : <DoctorCard doctor={item} />
        }
        ListHeaderComponent={ListHeader}
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
    padding: scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: FONT.medium,
  },
  
skeletonChip: {
  height: verticalScale(36),
  width: scale(90),
  borderRadius: 20,
  backgroundColor: '#E5E7EB',
  marginRight: 10,
},

  headerWrapper: {
    minHeight: verticalScale(170),
    justifyContent: 'flex-start',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    paddingHorizontal: 12,
    height: verticalScale(50),
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent:"center",
    marginRight: 10,
    marginBottom: 10,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 15,
    paddingHorizontal: 45,
    alignItems:"center",
    justifyContent:"center",
    marginRight: 6,
    marginBottom: 12,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    color: COLORS.gray,
  },
  activeText: {
    color: COLORS.white,
  },
  activeFilterText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.gray,
  },
});
