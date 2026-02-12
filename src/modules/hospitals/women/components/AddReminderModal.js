import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../../../../api/client";

import { COLORS, FONT, SIZES } from "../../../../config/constants";
import { scale, verticalScale } from "../../../../utils/styling";

const AddReminderModal = ({ visible, onClose }) => {
  const [type, setType] = useState("MEDICINE");
  const [title, setTitle] = useState("");
  const [repeat, setRepeat] = useState("NONE");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const formatDate = (d) =>
    d.toLocaleDateString("en-GB");

  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter title");
      return;
    }

    if (!date || !time) {
      Alert.alert("Error", "Please select date and time");
      return;
    }

    const reminderDateTime = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  time.getHours(),
  time.getMinutes()
);

if (reminderDateTime <= new Date()) {
  Alert.alert("Invalid Time", "Please select a future date and time.");
  return;
}

    try {
      await api.post("/hospital/user/reminders", {
        type,
        title,
        reminderAt: reminderDateTime.toISOString(),
        repeat,
        notes,
        isImportant: false,
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        resetFields();
        onClose();
      }, 2000);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add reminder");
    }
  };

  const resetFields = () => {
    setTitle("");
    setNotes("");
    setDate(null);
    setTime(null);
    setRepeat("NONE");
    setType("MEDICINE");
  };

  const isToday = (selectedDate) => {
  const today = new Date();
  return (
    selectedDate &&
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear()
  );
};
  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

              <View style={styles.header}>
                <Text style={styles.headerTitle}>Add New Reminder</Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={22} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Reminder Type</Text>
              <View style={styles.typeRow}>
                {["MEDICINE", "APPOINTMENT", "TEST", "CUSTOM"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.typeButton,
                      type === item && styles.typeActive,
                    ]}
                    onPress={() => setType(item)}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        type === item && styles.typeTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Take BP Medicine"
                value={title}
                onChangeText={setTitle}
              />

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Date</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {date ? formatDate(date) : "Select Date"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: scale(12) }} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Time</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {time ? formatTime(time) : "Select Time"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showDatePicker && (
  <DateTimePicker
    value={date || new Date()}
    mode="date"
    display="default"
    minimumDate={new Date()}  
    onChange={(event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) setDate(selectedDate);
    }}
  />
)}

{showTimePicker && (
  <DateTimePicker
    value={time || new Date()}
    mode="time"
    display="default"
    onChange={(event, selectedTime) => {
      setShowTimePicker(false);

      if (!selectedTime) return;
      const combinedDateTime = new Date(
        date?.getFullYear() || new Date().getFullYear(),
        date?.getMonth() || new Date().getMonth(),
        date?.getDate() || new Date().getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      if (isToday(date) && combinedDateTime <= new Date()) {
        Alert.alert(
          "Invalid Time",
          "Please select a future time."
        );
        return;
      }

      setTime(selectedTime);
    }}
  />
)}
              <Text style={styles.label}>Repeat</Text>
              <View style={styles.repeatRow}>
                {["NONE", "DAILY", "WEEKLY", "MONTHLY"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.repeatButton,
                      repeat === item && styles.typeActive,
                    ]}
                    onPress={() => setRepeat(item)}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        repeat === item && styles.typeTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, { height: verticalScale(80) }]}
                multiline
                placeholder="Add any additional notes..."
                value={notes}
                onChangeText={setNotes}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                  <Text>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={{ color: COLORS.white }}>Save Reminder</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SUCCESS POPUP */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successCircle}>
              <Ionicons name="checkmark" size={42} color={COLORS.white} />
            </View>
            <Text style={styles.successText}>
              Reminder Added{"\n"}Successfully
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AddReminderModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: scale(20),
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    padding: scale(20),
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  label: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(6),
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
  },
  typeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(6),
    justifyContent:"center"
  },
  typeButton: {
    width:scale(140),
    paddingVertical: verticalScale(13),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
    borderWidth: 1,
    alignItems:"center",
    borderColor: COLORS.lightGray,
    marginBottom: scale(5),
  },
  typeActive: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },
  typeText: {
    fontSize: SIZES.small,
  },
  typeTextActive: {
    color: COLORS.white,
  },
  repeatRow:{
    flexDirection: "row",
    gap: scale(6),
    justifyContent:"center"
  },
  repeatButton:{
    width:scale(70),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(4),
    borderRadius: scale(10),
    borderWidth: 1,
    alignItems:"center",
    borderColor: COLORS.lightGray,
    marginBottom: scale(5),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    height: verticalScale(45),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(10),
    padding: scale(12),
    marginRight: scale(8),
    marginTop: verticalScale(6),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  cancelBtn: {
    flex: 1,
    padding: scale(12),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    marginRight: scale(8),
  },
  saveBtn: {
    flex: 1,
    padding: scale(12),
    borderRadius: scale(10),
    backgroundColor: COLORS.pink,
    alignItems: "center",
  },
  successOverlay: {
  flex: 1,
  backgroundColor: COLORS.black,
  justifyContent: "center",
  alignItems: "center",
},

successCard: {
  width: scale(280),
  backgroundColor: COLORS.white,
  borderRadius: scale(22),
  padding: scale(30),
  alignItems: "center",
},

successCircle: {
  width: scale(100),
  height: scale(100),
  borderRadius: scale(50),
  backgroundColor: COLORS.pink,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: verticalScale(20),
},

successText: {
  fontSize: SIZES.medium,
  fontFamily: FONT.bold,
  color: COLORS.pink,
  textAlign: "center",
},

});
