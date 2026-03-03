import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import { labApi } from '../services/labApi';
import useAuth from '../../../hooks/useAuth';

const SelectSlotScreen = ({ navigation, route }) => {
  const { labId, totalFee } = route.params || {};
  const { user } = useAuth();

  console.log('select slot', labId);

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [loadingDates, setLoadingDates] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (labId) loadAvailability();
  }, [labId]);

  const loadAvailability = async () => {
    try {
      setLoadingDates(true);

      const res = await labApi.getLabAvailability(labId);

      console.log('AVAILABILITY:', res.data);

      const days = res.data?.days || [];

      setAvailableDates(days);

      const firstAvailable = days.find(d => d.slotsAvailable > 0) || days[0];

      if (firstAvailable) {
        setSelectedDate(days[0]);
        loadSlots(firstAvailable.date);
      }
    } catch (error) {
      console.log(
        'Availability error:',
        error?.response?.data || error.message,
      );
    } finally {
      setLoadingDates(false);
    }
  };

  const loadSlots = async dateString => {
    try {
      setLoadingSlots(true);

      const res = await labApi.getLabSlots(labId, dateString, user.id);
      console.log('slots', res.data);
      setSlots(res.data?.slots || []);
    } catch (error) {
      console.log('Slots error:', error.response?.data || error.message);
    } finally {
      setLoadingSlots(false);
    }
  };

  const formatTime = time => {
    if (!time) return '';

    const [h, m] = time.split(':');
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${suffix}`;
  };

  if (loadingDates) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  const renderDateItem = item => {
    const isActive = selectedDate?.date === item.date;

    return (
      <TouchableOpacity
        key={item.date}
        style={[styles.dateBox, isActive && styles.dateBoxActive]}
        onPress={() => {
          console.log('date', item);
          setSelectedDate(item);
          setSelectedSlot(null);
          loadSlots(item.date);
        }}
      >
        <Text style={[styles.dateDay, isActive && styles.activeText]}>
          {new Date(item.date).getDate()}
        </Text>

        <Text style={[styles.dateLabel, isActive && styles.activeText]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSlotItem = slot => {
    const isSelected = selectedSlot?.slotId === slot.slotId;
    const isDisabled = slot.isBooked;

    return (
      <TouchableOpacity
        key={slot.slotId.toString()}
        disabled={isDisabled}
        style={[
          styles.slotBox,
          isSelected && styles.slotPillActive,
          isDisabled && styles.slotPillDisabled,
        ]}
        onPress={() => setSelectedSlot(slot)}
      >
        <Text
          style={[
            styles.slotText,
            isSelected && styles.slotTextActive,
            isDisabled && styles.slotTextDisabled,
          ]}
        >
          {slot.time.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;

    // navigation.navigate('Payments', {
    //   labId,
    //   selectedDate: selectedDate.date,
    //   selectedSlot,
    // });

    navigation.navigate('HospitalsMain', {
      screen: 'Payments',
      params: {
        totalFee,
        labId,
        slotId: selectedSlot.slotId,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Slot</Text>

          {/* <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <Ionicons name="calendar" size={22} color={COLORS.primary} />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.dateHeader}>
            <Text style={styles.dateTitle}>
              {selectedDate ? new Date(selectedDate.date).toDateString() : ''}
            </Text>

            <View style={styles.dateNav}>
              <Ionicons name="chevron-back" size={20} />
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          >
            {availableDates.map(renderDateItem)}
          </ScrollView>

          <Text style={styles.sectionTitle}>Time Slot</Text>

          <View style={styles.slotWrapper}>
            {loadingSlots ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: verticalScale(10),
                }}
              >
                <ActivityIndicator color={COLORS.primary} />
              </View>
            ) : (
              slots.map(renderSlotItem)
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          disabled={!selectedSlot}
          style={[styles.confirmButton, !selectedSlot && styles.disabledButton]}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>Confirm & Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectSlotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(16),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  headerTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: scale(12),
  },

  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },

  dateTitle: {
    fontSize: scale(14),
    fontWeight: '600',
  },

  dateNav: {
    flexDirection: 'row',
    gap: scale(10),
  },

  dateList: {
    flexDirection: 'row',
    marginVertical: verticalScale(12),
  },

  dateBox: {
    width: scale(60),
    height: verticalScale(70),
    borderWidth: 1.5,
    borderColor: '#D0E3FF',
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
    backgroundColor: '#F7FBFF',
  },

  dateBoxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  dateDay: {
    fontSize: scale(18),
    fontWeight: '700',
    color: COLORS.black,
  },

  dateLabel: {
    fontSize: scale(12),
    color: '#6B7280',
    marginTop: 2,
  },

  activeText: {
    color: COLORS.white,
  },

  sectionTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    marginVertical: verticalScale(16),
  },

  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },

  slotBox: {
    width: '48%',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(18),
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    marginBottom: verticalScale(12),
    marginRight: scale(5),
  },

  slotPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  slotPillDisabled: {
    borderColor: '#D1D5DB',
    backgroundColor: '#F3F4F6',
  },

  slotText: {
    fontSize: scale(11),
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },

  slotTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },

  slotTextDisabled: {
    color: '#9CA3AF',
  },

  confirmButton: {
    marginTop: 'auto',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#BDBDBD',
  },

  confirmText: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: '600',
  },

  content: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(120),
  },

  dateList: {
    paddingVertical: verticalScale(12),
  },

  sectionTitle: {
    fontSize: scale(14),
    fontWeight: '600',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(8),
  },

  slotWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
