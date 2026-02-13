import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddReminderModal from '../components/AddReminderModal';
import { scale, verticalScale } from '../../../../utils/styling';
import api from '../../../../api/client';

const WomenReminders = ({ navigation }) => {

  const [showReminderModal, setShowReminderModal] = useState(false);

  const data = [
    {
      title: "Take Medicine",
      reminderAt: "2026-02-11T06:30:58.730Z",
    },
    {
      title: "Take Sleep",
      reminderAt: "2026-02-12T12:00:58.730Z",
    },
    {
      title: "Do Exercise",
      reminderAt: "2026-02-13T00:10:58.730Z",
    }
  ];

  const [reminders, setReminders] = useState([]);

  const getReminders = async () => {
    try {
      const response = await api.get(`/hospital/user/reminders`);
      setReminders(response?.data.data);
      console.log("DATAAAAAA: ", response?.data.data);
    }
    catch (error) {
      console.log("Failed to get reminders", error);
    }
  }

  const deleteReminders = async (selectedId) => {
    try {
      const response = await api.delete(`/hospital/user/reminders/${selectedId}`);
      console.log(response?.data);
      setReminders(prevReminders =>
        prevReminders.filter(reminder => reminder.id !== selectedId));
    }
    catch (error) {
      console.log("Error deleting reminder: ", error);
    }
  }

  const [selectedId, setSelectedId] = useState(0);

  const formatTo12Hour = (dateString) => {
    const timePart = dateString.split("T")[1];
    const [hoursStr, minutes] = timePart.split(":");

    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${hours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderText}>Manage Reminders</Text>
        <View style={{ width: scale(26) }}></View>
      </View>

      <TouchableOpacity
        style={styles.addReminderBtn}
        onPress={() => setShowReminderModal(true)}
      >
        <Text style={styles.addReminderBtnText}>+ Add New Reminder</Text>
      </TouchableOpacity>

      <AddReminderModal
        visible={showReminderModal}
        onClose={() => setShowReminderModal(false)}
      />

      <Text style={styles.allReminders}>All Reminders ({reminders.length})</Text>

      {
        reminders.map((item) => {
          return (
            <Pressable
              key={item.id.toString()}
              onPress={() => setSelectedId(item.id)}
            >
              <View
                style={[
                  styles.remindersBox,
                  selectedId === item.id && styles.selectedRemindersBox
                ]}
              >
                <View>
                  <Text style={styles.reminderTitle}>{item.title}</Text>
                  <View style={styles.dateTimeContainer}>
                    <Feather name="calendar" size={12} color="black" />
                    <Text style={styles.reminderDateTime}>{item.reminderAt.split("T")[0]}</Text>
                    <Text style={{ fontSize: scale(20) }}>|</Text>
                    <Feather name="clock" size={12} color="black" />
                    <Text style={styles.reminderDateTime}>{formatTo12Hour(item.reminderAt)}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => deleteReminders(item.id)}
                  style={styles.deleteBtn}
                >
                  <MaterialIcons name="delete-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </Pressable>
          )
        })
      }
    </SafeAreaView>
  );
}

export default WomenReminders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: 'white',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(15),
  },
  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(22),
    fontWeight: '600',
  },
  addReminderBtn: {
    backgroundColor: '#F47FBB',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addReminderBtnText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontWeight: '500',
    paddingVertical: verticalScale(15),
  },
  allReminders: {
    paddingVertical: verticalScale(20),
    fontSize: scale(18),
    fontWeight: '500'
  },
  remindersBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  selectedRemindersBox: {
    borderWidth: 1,
    borderColor: '#E7000B',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  reminderTitle: {
    fontSize: scale(16),
    fontWeight: '400',
    color: '#101828',
  },
  dateTimeContainer: {
    gap: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderDateTime: {
    fontSize: scale(14),
    fontWeight: '400',
    color: '#4A5565',
  },
  deleteBtn: {
    // backgroundColor: '',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  }
})