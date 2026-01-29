import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { scale } from '../../../utils/styling';
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

  /* UI-only states (Figma match) */
  const [sortBy, setSortBy] = useState('distance');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  const [distance, setDistance] = useState(8);
  const [openNow, setOpenNow] = useState(false);
  const [open24x7, setOpen24x7] = useState(false);

  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);

  /* ================= FETCH CATEGORIES ================= */
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

  /* ================= TOGGLE CATEGORY ================= */
  const toggleCategory = id => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id],
    );
  };

  /* ================= CLEAR ALL ================= */
  const handleClearAll = () => {
    setSelectedCategories([]);
    setDistance(8);
    setOpenNow(false);
    setOpen24x7(false);

    // UI-only reset
    setSortBy('distance');
    setStateName('');
    setCityName('');
  };

  /* ================= APPLY ================= */
  const handleApply = async () => {
    try {
      setLoading(true);

      const payload = {
        latitude,
        longitude,
        radius: distance,
        categoryIds: selectedCategories,
        mode: mode.toUpperCase(),
        openNow,
        open24x7,
        page: 1,
        limit: 50,
      };

      const res = await hospitalApi.getFilteredNearbyHospitals(payload);
      const hospitals = res.data?.data || [];

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
        {/* HEADER */}
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
                text={item.charAt(0).toUpperCase() + item.slice(1)}
                active={sortBy === item}
                onPress={() => setSortBy(item)}
              />
            ))}
          </View>

          {/* LOCATION */}
          <Text style={styles.section}>Location</Text>
          <View style={styles.locationRow}>
            <TextInput
              placeholder="State"
              value={stateName}
              onChangeText={setStateName}
              style={styles.locationInput}
            />
            <TextInput
              placeholder="City"
              value={cityName}
              onChangeText={setCityName}
              style={styles.locationInput}
            />
          </View>

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
          <Text style={styles.section}>Distance ({distance} km)</Text>
          <Slider
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={distance}
            onValueChange={setDistance}
          />

          {/* AVAILABILITY */}
          <Text style={styles.section}>Availability</Text>
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

        {/* ACTIONS */}
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

/* ================= UI COMPONENTS ================= */

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

const CheckBox = ({ label, checked, onPress }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.tick}>✓</Text>}
    </View>
    <Text>{label}</Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  clearText: {
    color: '#2979FF',
    fontWeight: '700',
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 10,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  locationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  locationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CDE0FF',
    borderRadius: 12,
    padding: 12,
  },
  chip: {
    backgroundColor: '#F3F8FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: '#2979FF',
  },
  chipText: {
    fontSize: 13,
  },
  chipTextActive: {
    color: '#FFF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#CDE0FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#2979FF',
    borderColor: '#2979FF',
  },
  tick: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: '#2979FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  applyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#EEF3FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelText: {
    color: '#2979FF',
    fontSize: 16,
    fontWeight: '700',
  },
});
