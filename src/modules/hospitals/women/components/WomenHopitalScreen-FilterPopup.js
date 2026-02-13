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
import api from "../../../../api/client";
import { scale, verticalScale } from '../../../../utils/styling';
import { COLORS, SIZES, FONT} from '../../../../config/constants';
const WomenHospitalFilterPopup = ({
  visible,
  onClose,
  onApply,
}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const [sortBy, setSortBy] = useState('distance');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [distance, setDistance] = useState(20);
  const [openNow, setOpenNow] = useState(false);
  const [open24x7, setOpen24x7] = useState(false);

  const [catLoading, setCatLoading] = useState(false);

  useEffect(() => {
  if (!visible) return;

  const fetchCategories = async () => {
    try {
      setCatLoading(true);

      const res = await api.get("/hospital/user/categories?women=true");


      console.log("Categories API:", res.data); // 👈 check structure

    
      // if you only want women:true
      const data = res.data?.data || res.data || [];
setCategories(data);


    } catch (error) {
      console.log("Category Error:", error);
      setCategories([]);
    } finally {
      setCatLoading(false);
    }
  };

  fetchCategories();
}, [visible]);


  const toggleCategory = id => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setDistance(20);
    setOpenNow(false);
    setOpen24x7(false);
    setSortBy('distance');
    setStateName('');
    setCityName('');
  };

  const selectedCategoryNames = categories
    .filter(cat => selectedCategories.includes(cat.id))
    .map(cat => cat.name);
  const handleApply = () => {
    onApply({
      distance,
      sortBy,
      state: stateName,
      city: cityName,
      categoryIds: selectedCategories,

      openNow,
      open24x7,
    });
    onClose();

  }
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

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const CheckBox = ({ label, checked, onPress }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <View style={[styles.checkbox, checked && styles.checked]}>
      {checked && <Text style={styles.tick}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const Chip = ({ text, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.chip,
      active && styles.chipActive,
    ]}
  >
    <Text
      style={[
        styles.chipText,
        active && styles.chipTextActive,
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
)
export default WomenHospitalFilterPopup;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(20),
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    maxHeight: '85%',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },

  title: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.bold,
    color: COLORS.darkgray,
  },

  clearText: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.pink,
  },

  section: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.medium,
    color: COLORS.black,
    marginTop: verticalScale(18),
    marginBottom: verticalScale(10),
  },

  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },

  chip: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
  },

  chipActive: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },

  chipText: {
    fontSize: scale(13),
    color: COLORS.gray,
    fontFamily: FONT.regular,
  },

  chipTextActive: {
    color: COLORS.white,
    fontFamily: FONT.medium,
  },

  locationRow: {
    flexDirection: 'row',
    gap: scale(12),
  },

  locationInput: {
    flex: 1,
    height: verticalScale(44),
    borderWidth: scale(1),
    borderColor: COLORS.pink,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.darkgray,
    backgroundColor: COLORS.lightpink,
  },

  sliderWrapper: {
    marginTop: verticalScale(6),
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  checkbox: {
    width: scale(22),
    height: verticalScale(22),
    borderRadius: scale(6),
    borderWidth: scale(2),
    borderColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  checked: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },

  tick: {
    color: COLORS.white,
    fontSize: scale(SIZES.small),
    fontFamily: FONT.bold,
  },

  checkboxLabel: {
    fontSize: scale(SIZES.small),
    color: COLORS.black,
    fontFamily: FONT.regular,
  },

  bottomRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: verticalScale(22),
  },

  applyBtn: {
    flex: 1,
    height: verticalScale(48),
    backgroundColor: COLORS.primary,
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },

  applyText: {
    color: COLORS.white,
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.bold,
  },

  cancelBtn: {
    flex: 1,
    height: verticalScale(48),
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: COLORS.darkgray,
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.bold,
  },
});

