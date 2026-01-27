import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { scale, verticalScale } from '../../../utils/styling';
import { COLORS} from '../../../config/constants';

import api from '../../../api/client';
import DoctorSearchBar from '../components/DoctScreen-SearchBar';
import DoctFilterButton from '../components/DoctScreen-FilterButton';
import DoctModalButton from '../components/DoctScreen-FilterModal';
import DoctList from '../components/DoctScreen-DoctorList';
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

  const allModalProps = {
  showFilter,
  setShowFilter,



  sortBy,
  setSortBy,

  department,
  setDepartment,

  specializations,

  experience,
  setExperience,

  feeRange,
  setFeeRange,

  distance,
  setDistance,

  availability,
  setAvailability,

  clearFilters,
  applyFilters,
};

    
    return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <DoctorSearchBar search={search} setSearch={setSearch} />

      {/*  Filter Bar */}
      <DoctFilterButton
    specializations={specializations}
    selectedFilter={selectedFilter}
    setSelectedFilter={setSelectedFilter}
    setShowFilter={setShowFilter}
  />
      {/* ---------- FILTER MODAL ---------- */}

      <DoctModalButton {...allModalProps} />

{/* 🧑‍⚕️ Doctor Card */}
<DoctList
    loading={loading}
    getFilteredDoctors={getFilteredDoctors}
    search={search}
  />
</View>
    );
  }

export default DoctorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(16),
    marginTop: verticalScale(10),
  },
});
