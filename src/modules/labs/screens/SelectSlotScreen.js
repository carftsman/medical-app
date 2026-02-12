import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";
import { labApi } from "../services/labApi";


const DATES = [
  { id: "26", day: "26", label: "Tue" },
  { id: "27", day: "27", label: "Wed" },
  { id: "28", day: "28", label: "Thu" },
  { id: "29", day: "29", label: "Fri" },
  { id: "30", day: "30", label: "Sat" },
  { id: "31", day: "31", label: "Sun" },
];


const SelectSlotScreen = ({ navigation, route }) => {

  const { labId } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(DATES[4]);

  useEffect(() => {
    if (labId) {
      fetchSlots();
    }
  }, [labId]);

  const fetchSlots = async () => {
    try {
      const res = await labApi.getLabSlots(labId, "2026-02-09");

      setDate(res.data.date);
      setSlots(res.data.slots);
    } catch (error) {
      console.log(
        "Slot API error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${suffix}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Slot</Text>
      </View>


      <View style={styles.dateHeader}>
        <Text style={styles.dateTitle}>Jan {selectedDate.day}, 2026</Text>

        <View style={styles.dateNav}>
          <Ionicons name="chevron-back" size={18} />
          <Ionicons name="chevron-forward" size={18} />
        </View>
      </View>

      <View style={styles.dateList}>
        {DATES.map((item) => {
          const isActive = item.id === selectedDate.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.dateBox,
                isActive && styles.dateBoxActive,
              ]}
              onPress={() => setSelectedDate(item)}
            >
              <Text
                style={[
                  styles.dateDay,
                  isActive && styles.activeText,
                ]}
              >
                {item.day}
              </Text>

              <Text
                style={[
                  styles.dateLabel,
                  isActive && styles.activeText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>


      <Text style={styles.sectionTitle}>Time Slot</Text>

      <View style={styles.slotContainer}>
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isDisabled = slot.isBooked;

          return (
            <TouchableOpacity
              key={slot.id}
              disabled={isDisabled}
              style={[
                styles.slotBox,
                isSelected && styles.slotBoxActive,
                isDisabled && styles.slotBoxDisabled,
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
                {formatTime(slot.startTime)} -{" "}
                {formatTime(slot.endTime)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        disabled={!selectedSlot}
        style={[
          styles.confirmButton,
          !selectedSlot && styles.disabledButton,
        ]}
        onPress={() => {
          navigation.navigate("AddAddress",{
            selectedDate,
            selectedSlot,
            labId,
          });
        }}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },

  headerTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    marginLeft: scale(12),
  },

  dateText: {
    fontSize: scale(14),
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    marginVertical: verticalScale(16),
  },

  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
  },

  slotBox: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: scale(20),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(14),
  },

  slotBoxActive: {
    backgroundColor: COLORS.blue,
  },

  slotBoxDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },

  slotText: {
    fontSize: scale(12),
    color: COLORS.blue,
  },

  slotTextActive: {
    color: COLORS.white,
  },

  slotTextDisabled: {
    color: "#9CA3AF",
  },

  confirmButton: {
    marginTop: "auto",
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#BDBDBD",
  },

  confirmText: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: "600",
  },

  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },

  dateTitle: {
    fontSize: scale(14),
    fontWeight: "600",
  },

  dateNav: {
    flexDirection: "row",
    gap: scale(10),
  },

  dateList: {
    flexDirection: "row",
    marginBottom: verticalScale(16),
  },

  dateBox: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: scale(8),
    padding: scale(10),
    alignItems: "center",
    marginRight: scale(8),
    width: scale(60),
  },

  dateBoxActive: {
    backgroundColor: COLORS.blue,
  },

  dateDay: {
    fontSize: scale(14),
    fontWeight: "600",
    color: COLORS.blue,
  },

  dateLabel: {
    fontSize: scale(12),
    color: COLORS.gray,
  },

  activeText: {
    color: COLORS.white,
  },

});
