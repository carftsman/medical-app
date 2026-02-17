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


  const singleSelect = (value, selected, setSelected) => {
    if (selected === value) {
      setSelected('');
    } else {
      setSelected(value);
    }
  };


  const handleApply = () => {
    onApply({
      sort,
      feeRange,
      age,
    });
    onClose();
  };

  const clearAll = () => {
    setSort('');
    setFeeRange('');
    setAge('');

  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clear}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>

            {/* SORT */}


            {/* PRICE */}
            <Text style={styles.section}>Fee Range</Text>
            {['0-100', '100-300', '300-500', '500-1000', '1000-2000']
              .map(f => (
                <TouchableOpacity
                  key={f}
                  style={styles.checkboxRow}
                  onPress={() => singleSelect(f, feeRange, setFeeRange)}
                >
                  <Text>{feeRange === f ? '☑' : '☐'} {f}</Text>
                </TouchableOpacity>
              ))}


            {/* AGE */}
            <Text style={styles.section}>Age</Text>
            {['<10-20', '20-40', '40-60', '>60'].map(a => (
              <TouchableOpacity
                key={a}
                style={styles.checkboxRow}
                onPress={() => singleSelect(a, age, setAge)}
              >
                <Text>{age === a ? '☑' : '☐'} {a}</Text>
              </TouchableOpacity>
            ))}



          </ScrollView>

          {/* BUTTONS */}
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Apply
            </Text>
          </TouchableOpacity>



        </View>
      </View>
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
  chip: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    borderRadius: 8,
  },
  selectedChip: {
    backgroundColor: '#cce5ff',
  },
  checkboxRow: {
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  clearTop: {
    color: '#1976D2',
    fontWeight: '600',
  },

  applyBtn: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  clear: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
  close: {
    textAlign: 'center',
    marginTop: 8,
    color: 'red',
  },
});
