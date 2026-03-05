import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { hospitalApi } from '../../../api/hospitalApi';

const HospitalFilterPopup = ({
  visible,
  onClose,
  onApply,
  latitude,
  longitude,
  mode = 'BOTH',
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [distance, setDistance] = useState(8);
  const [openNow, setOpenNow] = useState(false);
  const [open24x7, setOpen24x7] = useState(false);

  const [minRating, setMinRating] = useState(0);
  const [minPopularity, setMinPopularity] = useState(0);

  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  /* FETCH CATEGORIES */
  useEffect(() => {
    if (!visible) return;

    const fetchCategories = async () => {
      try {
        setCatLoading(true);
        const res = await hospitalApi.getCategories({ mode });
        setCategories(res.data?.data || []);
      } catch {
        setCategories([]);
      } finally {
        setCatLoading(false);
      }
    };

    fetchCategories();
  }, [visible, mode]);

  const toggleCategory = id => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id],
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setDistance(8);
    setOpenNow(false);
    setOpen24x7(false);
    setSortBy('distance');
    setMinRating(0);
    setMinPopularity(0);
  };

  const handleApply = async () => {
    try {
      setLoading(true);

      const payload = {
        latitude,
        longitude,
        radiusKm: distance,
        categoryIds: selectedCategories,
        mode: mode.toUpperCase(),
        sort: sortBy,
        openNow,
        open24x7,
        page: 1,
        limit: 50,
      };

      const res = await hospitalApi.getFilteredNearbyHospitals(payload);

      let hospitals = res.data?.data || [];

      /* FRONTEND FILTERING */

      // Filter by minimum rating
      if (minRating > 0) {
        hospitals = hospitals.filter(
          item => item.rating >= minRating,
        );
      }

      // Filter by minimum popularity
      if (minPopularity > 0) {
        hospitals = hospitals.filter(
          item => item.popularity >= minPopularity,
        );
      }

      // Sorting fallback
      if (sortBy === 'rating') {
        hospitals.sort((a, b) => b.rating - a.rating);
      }

      if (sortBy === 'popularity') {
        hospitals.sort((a, b) => b.popularity - a.popularity);
      }

      onApply(hospitals);
      onClose();
    } catch {
      onApply([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* SORT */}
          <Text style={styles.section}>Sort</Text>
          <View style={styles.rowWrap}>
            {['distance', 'rating', 'popularity'].map(item => (
              <Chip
                key={item}
                text={item}
                active={sortBy === item}
                onPress={() => setSortBy(item)}
              />
            ))}
          </View>

          {/* RATING FILTER */}
          <Text style={styles.section}>
            Minimum Rating ({minRating.toFixed(1)})
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            value={minRating}
            onValueChange={setMinRating}
            minimumTrackTintColor="#056FD2"
            thumbTintColor="#056FD2"
          />

          {/* POPULARITY FILTER */}
          <Text style={styles.section}>
            Minimum Popularity ({minPopularity})
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={500}
            step={10}
            value={minPopularity}
            onValueChange={setMinPopularity}
            minimumTrackTintColor="#056FD2"
            thumbTintColor="#056FD2"
          />

          {/* SPECIALITY */}
          <Text style={styles.section}>Speciality</Text>
          {catLoading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.rowWrap}>
              {categories.map(item => (
                <Chip
                  key={item.id}
                  text={item.name}
                  active={selectedCategories.includes(item.id)}
                  onPress={() => toggleCategory(item.id)}
                />
              ))}
            </View>
          )}

          {/* DISTANCE */}
          <Text style={styles.section}>
            Distance ({distance} km)
          </Text>
          <Slider
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={distance}
            onValueChange={setDistance}
            minimumTrackTintColor="#056FD2"
            thumbTintColor="#056FD2"
          />

          {/* AVAILABILITY */}
          <CheckBox
            label="Open Now"
            checked={openNow}
            onPress={() => setOpenNow(!openNow)}
          />
          <CheckBox
            label="Available 24/7"
            checked={open24x7}
            onPress={() => setOpen24x7(!open24x7)}
          />
        </ScrollView>

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.applyText}>Apply</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HospitalFilterPopup;

/* CHIP */
const Chip = ({ text, active, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, active && styles.chipActive]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {text}
    </Text>
  </TouchableOpacity>
);

/* CHECKBOX */
const CheckBox = ({ label, checked, onPress }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.tick}>✓</Text>}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);

/* STYLES SAME AS YOUR CURRENT */
/* STYLES */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '88%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  clearText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  section: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F2F7FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: {
    backgroundColor: '#056FD2',
  },
  chipText: {
    fontSize: 13,
    color: '#056FD2',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#C9DFFF',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checked: {
    backgroundColor: '#056FD2',
    borderColor: '#056FD2',
  },
  tick: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#056FD2',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  applyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: {
    color: '#056FD2',
    fontSize: 16,
    fontWeight: '700',
  },
});