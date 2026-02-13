import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const PackagesFilterModal = ({ visible, onClose, onApply }) => {
  const [sort, setSort] = useState('');
  const [feeRange, setFeeRange] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleApply = () => {
    onApply({
      sort,
      feeRange,
      age,
      gender,
    });
    onClose();
  };

  const clearAll = () => {
    setSort('');
    setFeeRange('');
    setAge('');
    setGender('');
  };

  
  const RadioOption = ({ label, selected, onPress }) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress}>
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modal}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clear}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>

            {/* PRICE */}
            <Text style={styles.section}>Price Range</Text>
            {['500-1000', '1000-2000','2000-3000','3000-4000','4000-5000']
              .map(f => (
                <RadioOption
                  key={f}
                  label={f}
                  selected={feeRange === f}
                  onPress={() => setFeeRange(feeRange === f ? '' : f)}
                />
              ))}

            {/* AGE */}
            <Text style={styles.section}>Age Range</Text>
            {['0-20', '20-40', '40-60', '60-100']
              .map(a => (
                <RadioOption
                  key={a}
                  label={a}
                  selected={age === a}
                  onPress={() => setAge(age === a ? '' : a)}
                />
              ))}

            {/* GENDER */}
            <Text style={styles.section}>Gender</Text>
            {['MALE', 'FEMALE','OTHERS']
              .map(g => (
                <RadioOption
                  key={g}
                  label={g}
                  selected={gender === g}
                  onPress={() => setGender(gender === g ? '' : g)}
                />
              ))}

            {/* SORT */}
            <Text style={styles.section}>Sort By</Text>
            {[
              { label: 'Price: Low to High', value: 'price_asc' },
              { label: 'Price: High to Low', value: 'price_desc' },
            ].map(s => (
              <RadioOption
                key={s.value}
                label={s.label}
                selected={sort === s.value}
                onPress={() => setSort(sort === s.value ? '' : s.value)}
              />
            ))}

          </ScrollView>

          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Apply
            </Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default PackagesFilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    marginTop: 15,
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  applyBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  clear: {
    color: 'blue',
  },

  
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1976D2',
  },
  radioLabel: {
    fontSize: 14,
  },
});
