import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';

const DoctModalButton = ({
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
}) => {
  return (
    <Modal
      visible={showFilter}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilter(false)}
    >
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
              {specializations.map(dep => (
                <Picker.Item
                  key={dep.id}
                  label={dep.name}
                  value={dep.id}
                />
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
            {['100-500', '500-1000',].map(fee => (
              <TouchableOpacity
                key={fee}
                style={[styles.chip, feeRange === fee && styles.activeChip]}
                onPress={() => setFeeRange(prev => (prev === fee ? null : fee))}
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
            {[5, 10,15,20].map(km => (
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
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                clearFilters();
                setShowFilter(false);
              }}
            >
              <Text>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => {
                applyFilters();
                setShowFilter(false);
              }}
            >
              <Text style={{ color: '#fff' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DoctModalButton;

const styles = StyleSheet.create({
  /* ---------- MODAL BACKDROP ---------- */
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },

  /* ---------- MODAL CONTAINER ---------- */
  filterModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(25),
    maxHeight: '95%',
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
    marginBottom: verticalScale(10),
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
