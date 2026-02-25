import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../utils/styling';
import { COLORS } from '../../../config/constants';

import api from '../../../api/client';
import DoctorSearchBar from '../components/DoctScreen-SearchBar';
import DoctFilterButton from '../components/DoctScreen-FilterButton';
import DoctModalButton from '../components/DoctScreen-FilterModal';
import DoctList from '../components/DoctScreen-DoctorList';
import DoctorScreenMode from '../components/DoctScreen-Mode';

const DoctorsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [department, setDepartment] = useState('All');
  const [experience, setExperience] = useState(0);
  const [feeRange, setFeeRange] = useState(null);
  const [distance, setDistance] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [availability, setAvailability] = useState({
    today: false,
    tomorrow: false,
    now: false,
  });

  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("ONLINE");

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

    const params = {
    lat: 17.385044,         
    lng: 78.486671,          

    search: search?.trim() || undefined,

  categoryIds:
  selectedFilter !== 'All'
    ? String(selectedFilter)
    : department !== 'All'
    ? String(department)
    : undefined,

    minExp: experience || undefined,

    maxFee:
      feeRange === '100-500'
        ? 500
        : feeRange === '500-1000'
        ? 1000
        
        : undefined,

    distance: distance || 16,   // Swagger expects "distance" not maxDistance

    mode: selectedType || undefined,

    availability:
      availability.today
        ? 'today'
        : availability.tomorrow
        ? 'tomorrow'
        : availability.now
        ? 'now'
        : undefined,

    sort:
  sortBy === 'experience'
    ? 'experience_desc'
    : sortBy === 'fee'
    ? 'fee_asc'
    : undefined,

    page: 1,
    limit: 20,
};
      const response = await api.get('/hospital/user/doctors', { params });

      let doctorsArray = [];

      if (Array.isArray(response?.data?.doctors)) {
        doctorsArray = response.data.doctors;
      } else if (Array.isArray(response?.data)) {
        doctorsArray = response.data;
      }

      const mappedDoctors = doctorsArray.map(item => ({
        id: item.id?.toString() || Math.random().toString(),
        doctorName: item.name || '',
        specialization: item.specialization || item.category?.name || '',
        experience: Number(item.experience) || 0,
        rating: Number(item.rating) || 0,
        fee: Number(item.consultationFee) || 0,
        hospitalName: item.hospital?.name || '',
        distance: Number(item.distanceKm) || 0,
        availableDate: item.availableDate || 'today',
        availableTime: item.availableTime || '9AM - 5PM',
        imageUrl: item.imageUrl || '',
        consultationMode: item.consultationMode || 'BOTH',
      }));

      setDoctorsData(mappedDoctors);

      // ✅ Build categories from API response
if (allCategories.length === 0 && doctorsArray.length > 0) {
  const categories = [
    { id: 'All', name: 'All' },
    ...doctorsArray
      .map(d => ({
        id: d.category?.id,
        name: d.category?.name,
      }))
      .filter(
        (value, index, self) =>
          value.id &&
          index === self.findIndex(t => t.id === value.id)
      ),
  ];

  setAllCategories(categories);
}
     
      } catch (err) {
      console.log("API ERROR:", err?.response?.data || err);
      setError("Unable to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [
    selectedType,
    selectedFilter,
    department,
    experience,
    feeRange,
    distance,
    availability,
    sortBy,
    search,
  ]);

  const clearFilters = () => {
    setSortBy(null);
    setDepartment('All');
    setExperience(0);
    setFeeRange(null);
    setDistance(null);
    setAvailability({ today: false, tomorrow: false, now: false });
    setSelectedFilter('All');
    setSearch('');
  };

  return (
    <View style={styles.container}>
      <DoctorSearchBar search={search} setSearch={setSearch} />

      <DoctFilterButton
        specializations={allCategories}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setShowFilter={setShowFilter}
      />

      <DoctModalButton
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        department={department}
        setDepartment={setDepartment}
        specializations={allCategories}
        experience={experience}
        setExperience={setExperience}
        feeRange={feeRange}
        setFeeRange={setFeeRange}
        distance={distance}
        setDistance={setDistance}
        availability={availability}
        setAvailability={setAvailability}
        clearFilters={clearFilters}
        applyFilters={fetchDoctors}
      />

      <DoctorScreenMode
        selected={selectedType}
        onChange={setSelectedType}
      />

      <DoctList
        loading={loading}
        doctorsData={doctorsData}
        search={search}
        error={error}
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
});