import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { scale, verticalScale } from "../../../utils/styling";
import { Calendar } from 'react-native-calendars';

const STATUS = ['Normal', 'Abnormal', 'Borderline'];

const TIME_OPTIONS = [
  'Last 15 Days',
  'Last 30 Days',
  'Last 3 Months',
  'Last 6 Months',
  'Last 1 Year', 
];

export default function FilterBottomSheet({ visible, onClose, onApply }) {
  const [selectedStatus, setSelectedStatus] = useState('*');
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getDateFromRange = () => {
    const today = new Date();
    let past = new Date();

    if (timeRange === 'Last 15 Days') past.setDate(today.getDate() - 15);
    if (timeRange === 'Last 30 Days') past.setDate(today.getDate() - 30);
    if (timeRange === 'Last 3 Months') past.setMonth(today.getMonth() - 3);
    if (timeRange === 'Last 6 Months') past.setMonth(today.getMonth() - 6);
    if (timeRange === 'Last 1 Year') past.setFullYear(today.getFullYear() - 1);

    return {
      fromDate: past.toISOString().split('T')[0],
      toDate: today.toISOString().split('T')[0],
    };
  };

  const handleApply = () => {
    let fromDate = startDate;
    let toDate = endDate;

    if (!fromDate || !toDate) {
      const range = getDateFromRange();
      fromDate = range.fromDate;
      toDate = range.toDate;
    }

    onApply({
      reportStatus: selectedStatus,
      fromDate,
      toDate,
    });

    onClose();
  };

  const handleClear = () => {
    setSelectedStatus('*');
    setStartDate(null);
    setEndDate(null);
    setTimeRange('Last 30 Days');

    onApply({
      reportStatus: '*',
      fromDate: null,
      toDate: null,
    });

    onClose();
  };

  const onDayPress = day => {
    console.log(day)
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else {
      setEndDate(day.dateString);
    }
  };

  const StatusButton = ({ label }) => {
    const active = selectedStatus === label;
    return (
      <TouchableOpacity
        style={[styles.statusBtn, active && styles.activeStatus]}
        onPress={() => setSelectedStatus(label)}
      >
        <Text style={[styles.statusText, active && styles.activeText]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  console.log(startDate, endDate)
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clear}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Report Status</Text>
        <View style={styles.statusRow}>
          {STATUS.map(item => (
            <StatusButton key={item} label={item} />
          ))}
        </View>

        <Text style={styles.label}>Time Range</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>{timeRange}</Text>
          <Ionicons name="chevron-down" size={scale(16)} color="#444" />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {TIME_OPTIONS.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => {
                  setTimeRange(item);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Date Range</Text>

        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.dateText}>
            {startDate && endDate
              ? `${startDate} → ${endDate}`
              : 'Select Date Range'}
          </Text>
          <Ionicons name="calendar-outline" size={scale(16)} color="#444" />
        </TouchableOpacity>

        {showCalendar && (
          <Modal transparent animationType="fade">
            <Pressable
              style={styles.calendarOverlay}
              onPress={() => setShowCalendar(false)}
            />
            <View style={styles.calendarContainer}>
              <Calendar
                markingType={'period'}
                markedDates={{
                  ...(startDate && {
                    [startDate]: { startingDay: true, color: '#1976D2', textColor: '#fff' },
                  }),
                  ...(endDate && {
                    [endDate]: { endingDay: true, color: '#1976D2', textColor: '#fff' },
                  }),
                }}
                onDayPress={onDayPress}
              />
            </View>
          </Modal>
        )}

        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({ 
  overlay: { 
   flex: 1,
   backgroundColor: '#00000040',
   }, 
    sheet: {
    backgroundColor: '#fff',
    padding: scale(16), 
    borderTopLeftRadius: scale(16), 
    borderTopRightRadius: scale(16),
    maxHeight: '90%', 
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: verticalScale(10),
   },
   title: { 
    fontSize: scale(16), 
    fontWeight: '700', 
    }, 
    clear: { 
    fontSize: scale(13), 
    color: '#1976D2', 
    fontWeight: '600',
    },
     label: { 
    fontSize: scale(12),
    color: '#555',
    marginTop: verticalScale(10), 
    marginBottom: verticalScale(6),
    fontWeight: '600', 
  }, 
   statusRow: {
    flexDirection: 'row',
  },
statusBtn: { 
paddingVertical: verticalScale(6),
 paddingHorizontal: scale(12),
  borderRadius: scale(16), 
  backgroundColor: '#F1F3F5',
   marginRight: scale(8), 
  }, 
  activeStatus: { 
    backgroundColor: '#E3F2FD',
   },
 statusText: { 
   fontSize: scale(12),
    color: '#444',
   }, 
   activeText: { 
    color: '#1976D2',
     fontWeight: '600',
     },
  dropdown: { 
    backgroundColor: '#F4F6F8', 
    borderRadius: scale(10),
     paddingHorizontal: scale(12),
      paddingVertical: verticalScale(10),
       flexDirection: 'row', 
       justifyContent: 'space-between',
        alignItems: 'center', 
      }, 
      dropdownText: { 
        fontSize: scale(13),
       },
  dropdownList: {
    backgroundColor: '#fff',
     borderRadius: scale(10), 
     elevation: 3,
      marginTop: verticalScale(6),
     },
      option: { 
        padding: scale(10),
       }, 
       optionText: { 
        fontSize: scale(13),
       },
   applyBtn: {
     marginTop: verticalScale(10),
      backgroundColor: '#1976D2',
       paddingVertical: verticalScale(12), 
       borderRadius: scale(10),
        alignItems: 'center', 
      }, 
      applyText: { 
        color: '#fff', 
        fontSize: scale(14),
         fontWeight: '600', 
        },
   dateInput: {
     backgroundColor: '#F4F6F8',
      borderRadius: scale(10),
       paddingHorizontal: scale(12), 
       paddingVertical: verticalScale(12),
        flexDirection: 'row',
         justifyContent: 'space-between',
          alignItems: 'center',
         }, 
         dateText: { 
          fontSize: scale(13),
           color: '#000', 
          },
    calendarOverlay: { 
      flex: 1, 
      backgroundColor: '#00000040',
     }, 
     calendarContainer: { 
      position: 'absolute',
       bottom: 0,
        width: '100%',
         backgroundColor: '#fff',
          borderTopLeftRadius: scale(16),
           borderTopRightRadius: scale(16), 
           padding: scale(12),
           }, 
          });