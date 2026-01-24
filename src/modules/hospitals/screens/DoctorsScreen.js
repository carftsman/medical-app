import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DoctorCard from '../components/DoctorCard';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import api from '../../../api/client';

const DoctorsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [department, setDepartment] = useState('All');
  const [experience, setExperience] = useState(0);
  const [feeRange, setFeeRange] = useState(null);
  const [distance, setDistance] = useState(null);
  const [availability, setAvailability] = useState({
    today: false,
    tomorrow: false,
    now: false,
  });
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyFilters = () => {
    setShowFilter(false);
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/hospital/user/doctors');

      const mappedDoctors = response.data.doctors.map(item => ({
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
}));


      setDoctorsData(mappedDoctors);
    } catch (err) {
      console.log('Doctors API Error:', err);
      setError('Unable to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const specializations = [
    'All',
    ...new Set(doctorsData.map(d => d.specialization)),
  ];

  ///Filter Application
  const getFilteredDoctors = () => {
    let data = [...doctorsData];

    // Search
    if (search.trim()) {
      data = data.filter(
        d =>
          d.doctorName.toLowerCase().includes(search.toLowerCase()) ||
          d.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
          d.specialization.toLowerCase().includes(search.toLowerCase()) ||
          d.availableTime.toLowerCase().includes(search.toLowerCase()) ||
          d.availableDate.toLowerCase().includes(search.toLowerCase()) ||
          d.fee.toString().includes(search) ||
          d.experience.toString().includes(search) ||
          d.rating.toString().includes(search) ||
          d.distance.toString().includes(search),
      );
    }

    // Scrollable specialization filter
    if (selectedFilter !== 'All') {
      data = data.filter(d => d.specialization === selectedFilter);
    }

    // Modal department filter
    if (department !== 'All') {
      data = data.filter(d => d.specialization === department);
    }

    // Experience
    data = data.filter(d => d.experience >= experience);

    // Fee
    if (feeRange === '100-500') data = data.filter(d => d.fee <= 500);
    if (feeRange === '500-1000')
      data = data.filter(d => d.fee > 500 && d.fee <= 1000);
    if (feeRange === '1000+') data = data.filter(d => d.fee > 1000);

    // Distance
    if (distance) {
      data = data.filter(d => d.distance <= distance);
    }
 
    // Availability
    if (availability.today)
      data = data.filter(d => d.availableDate === 'today');
    if (availability.tomorrow)
      data = data.filter(d => d.availableDate === 'tomorrow');
    if (availability.now) data = data.filter(d => d.availableDate === 'now');

    // Sorting
    if (sortBy === 'experience')
      data.sort((a, b) => b.experience - a.experience);
    if (sortBy === 'fee') data.sort((a, b) => a.fee - b.fee);

    return data;
  };

  ///Clear Filters
  const clearFilters = () => {
    setSortBy(null);
    setDepartment('All');
    setExperience(0);
    setFeeRange(null);
    setDistance(null);
    setAvailability({ today: false, tomorrow: false, now: false });
    setSelectedFilter('All');
    setSearch('');
    setShowFilter(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={scale(18)} color="#9E9E9E" />
        <TextInput
          placeholder="Search for Doctors"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/*  Filter Bar */}
      <View style={styles.filterRow}>
        {/* Fixed Filter Button */}
        <TouchableOpacity
          style={styles.fixedFilterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Icon name="tune-variant" size={scale(18)} color="#056FD2" />
          <Text style={styles.fixedFilterText}>Filter</Text>
        </TouchableOpacity>

        {/* Scrollable Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {specializations.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterButton,
                selectedFilter === item && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Modal visible={showFilter} animationType="slide" transparent presentationStyle="overFullScreen" onRequestClose={()=>setShowFilter(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.filterModal}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Icon name="close" size={scale(20)} />
              </TouchableOpacity>
            </View>

            {/* Sort */}
            <Text style={styles.sectionTitle}>Sort By</Text>

            {[
              { label: 'Experience (High to Low)', value: 'experience' },
              { label: 'Fee (Low to High)', value: 'fee' },
            ].map(item => (
              <TouchableOpacity
                key={item.value}
                style={styles.checkboxRow}
                onPress={() =>
                  setSortBy(prev => (prev === item.value ? null : item.value))
                }
              >
                <Icon
                  name={
                    sortBy === item.value
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={scale(18)}
                />
                <Text style={{ marginLeft: scale(8) }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            {/* Department */}

            <Text style={styles.sectionTitle}>Department</Text>

            <View style={styles.dropdown}>
              <Picker selectedValue={department} onValueChange={setDepartment}>
                <Picker.Item label="All" value="All" />
                {specializations
                  .filter(s => s !== 'All')
                  .map(dep => (
                    <Picker.Item key={dep} label={dep} value={dep} />
                  ))}
              </Picker>
            </View>

            {/* Experience */}
            <Text style={styles.sectionTitle}>Experience</Text>
            <Text style={styles.rangeText}>{experience} years</Text>

            <Slider
              minimumValue={0}
              maximumValue={20}
              step={1}
              value={experience}
              onValueChange={setExperience}
              minimumTrackTintColor="#056FD2"
              maximumTrackTintColor="#ccc"
            />

            {/* Fee */}
            <Text style={styles.sectionTitle}>Fee Range</Text>

            <View style={styles.chipRow}>
              {['100-500', '500-1000', '1000+'].map(fee => (
                <TouchableOpacity
                  key={fee}
                  style={[styles.chip, feeRange === fee && styles.activeChip]}
                  onPress={() =>
                    setFeeRange(prev => (prev === fee ? null : fee))
                  }
                >
                  <Text style={{ color: feeRange === fee ? '#fff' : '#000' }}>
                    ₹{fee}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Distance */}
            <Text style={styles.sectionTitle}>Distance</Text>

            <View style={styles.chipRow}>
              {[2, 5, 10].map(km => (
                <TouchableOpacity
                  key={km}
                  style={[styles.chip, distance === km && styles.activeChip]}
                  onPress={() => setDistance(prev => (prev === km ? null : km))}
                >
                  <Text style={{ color: distance === km ? '#fff' : '#000' }}>
                    {km} km
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Availability */}
            <Text style={styles.sectionTitle}>Availability</Text>

            {[
              { key: 'today', label: 'Available Today' },
              { key: 'tomorrow', label: 'Available Tomorrow' },
              { key: 'now', label: 'Available Now' },
            ].map(item => (
              <TouchableOpacity
                key={item.key}
                style={styles.checkboxRow}
                onPress={() =>
                  setAvailability(prev => ({
                    ...prev,
                    [item.key]: !prev[item.key],
                  }))
                }
              >
                <Icon
                  name={
                    availability[item.key]
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={scale(18)}
                />
                <Text style={{ marginLeft: scale(8) }}>{item.label}</Text>
              </TouchableOpacity>
            ))}

            {/* Buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearFilters}>
                <Text>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                <Text style={{ color: '#fff' }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 🧑‍⚕️ Doctor Card */}
      <FlatList
        data={getFilteredDoctors()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DoctorCard doctor={item} />
            // imageUrl={item.imageUrl}
            // doctorName={item.doctorName}
            // specialization={item.specialization}
            // rating={item.rating}
            // hospitalName={item.hospitalName}
            // experience={item.experience}
            // fee={item.fee}
            // availableDate={item.availableDate}
            // availableTime={item.availableTime}
          
        )}
          ListEmptyComponent={
    search.trim() ? (
      <Text style={styles.noResultText}>No Doctors found</Text>
    ) : (
      <Text style={styles.noResultText}>No Doctors available</Text>
    )
  }
/>
    </View>
  );
};

export default DoctorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(16),
    marginTop: verticalScale(10),
  },

  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(30),
    paddingHorizontal: scale(12),
    height: verticalScale(58),
    backgroundColor: COLORS.white,
  },

  /* Input Field */
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(14),
    color: COLORS.black,
    fontFamily: FONT.regular,
  },

  /* No Results Text */
  noResultText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: scale(16),
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },

  /* Filter styles */
  filterContainer: {
    marginVertical: verticalScale(2),
  },

  filterButton: {
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(16),
    marginRight: scale(10),
    marginBottom: verticalScale(2),
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  filterText: {
    fontSize: scale(14),
    color: COLORS.gray,
    fontFamily: FONT.medium,
  },

  activeFilterText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
    zIndex: 10,
    elevation: 10,
  },

  fixedFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(20),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    marginRight: scale(10),
    marginTop: verticalScale(-2),
  },

  fixedFilterText: {
    marginLeft: scale(6),
    fontSize: scale(14),
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },

  /* ---------- MODAL BACKDROP ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    zIndex: 999,
    elevation: 999,
  },

  /* ---------- MODAL CONTAINER ---------- */
  filterModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(20),
    maxHeight: '90%',
  },

  /* ---------- HEADER ---------- */
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.lightGray,
  },

  modalTitle: {
    fontSize: scale(16),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  /* ---------- SECTION TITLES ---------- */
  sectionTitle: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
    fontSize: scale(14),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  /* ---------- CHECKBOX ROW ---------- */
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },

  /* ---------- DROPDOWN ---------- */
  dropdown: {
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(8),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },

  /* ---------- EXPERIENCE RANGE ---------- */
  rangeText: {
    fontSize: scale(12),
    color: COLORS.primary,
    marginBottom: verticalScale(6),
    fontFamily: FONT.medium,
  },

  /* ---------- CHIP ROW ---------- */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(4),
  },

  chip: {
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(16),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    marginRight: scale(10),
    marginBottom: verticalScale(10),
    backgroundColor: COLORS.white,
  },

  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  /* ---------- MODAL FOOTER ---------- */
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },

  clearBtn: {
    flex: 1,
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    marginRight: scale(10),
    top: verticalScale(-20),
    backgroundColor: COLORS.white,
  },

  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: scale(8),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
    top: verticalScale(-20),
  },
});
