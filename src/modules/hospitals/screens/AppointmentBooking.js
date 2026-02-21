import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONT, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '../utils/Validations';

import { useSelector, useDispatch } from 'react-redux';
import { setBookingId } from '../redux/slices/BookingSlice';

import api from '../../../api/client';

const AppointmentBooking = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const doctorId = route?.params?.doctorId;

  const { selectedDate, selectedTime } = useSelector(
    state => state.hospital.consultation,
  );
  const [doctor, setDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isPatientSelected = selectedIndex !== null;

  /*  FORM  */
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      gender: '',
      mobile: '',
      email: '',
      reason: '',
      dob: '',
    },
    mode: 'onChange',
  });

  /*  FETCH DOCTOR */
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) return;

        const res = await api.get(`/hospital/user/doctors/${doctorId}`);

        setDoctor(res?.data);
      } catch (error) {
        console.log('Doctor fetch error', error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  /*  SAVE PATIENT  */
  const onSubmit = data => {
    console.log('Patient DATAAA: ', data);
    if (editingIndex !== null) {
      const updated = [...patients];
      updated[editingIndex] = data;
      setPatients(updated);
    } else {
      setPatients(prev => [...prev, data]);
    }
    reset();
    setEditingIndex(null);
    setShowModal(false);
  };

  const onEdit = (item, index) => {
    reset(item);
    setEditingIndex(index);
    setShowModal(true);
  };

  /*  CONTINUE (HOLD APPOINTMENT)*/
  const onContinue = async () => {
    try {
      if (!selectedTime?.slotId) {
        console.log('No slot selected');
        return;
      }
      const patient = patients[selectedIndex];

      const [dd, mm, yyyy] = patient.dob.split('/');
      const formattedDob = `${yyyy}-${mm}-${dd}`;

      const payload = {
        slotId: selectedTime.slotId,
        bookingFor: 'OTHER',
        reason: patient.reason,
        patient: {
          fullName: patient.name,
          gender: patient.gender,
          phone: patient.mobile,
          email: patient.email,
          dob: formattedDob,
        },
      };

      console.log('Hold appointment payload:', payload);

      const res = await api.post('/appointments/hold', payload);

      const bookingId = res.data.bookingId;

      dispatch(setBookingId(bookingId));

      navigation.navigate('BookingDetails', { bookingId });

      console.log('Hold appointment success:', res.data);
    } catch (error) {
      if (error?.response?.status === 409) {
        Alert.alert(
          'Slot Unavailable',
          'This slot is no longer available. Please select another time.',
        );
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.log('ERRORR: ', error);
      }
    }
  };

  console.log(doctor?.imageUrl);
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book an Appointment</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* DOCTOR CARD */}
      <View style={styles.doctorCard}>
        <Image
          source={{
            uri: doctor?.imageUrl,
          }}
          style={styles.doctorImg}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.doctorName}>{doctor?.name}</Text>
          <Text style={styles.specialization}>
            {doctor?.specialization} |{' '}
            <Text style={styles.exp}>{doctor?.experience} Years</Text>
          </Text>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.5 (121 reviews)</Text>

          {selectedDate && selectedTime && (
            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeItem}>
                <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                <Text style={styles.dateTimeText}>{selectedDate}</Text>
              </View>

              <Text style={styles.separator}> | </Text>

              <View style={styles.dateTimeItem}>
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text style={styles.dateTimeText}>{selectedTime.time}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* PATIENT HEADER */}
      <View style={styles.patientHeader}>
        <Text style={styles.patientTitle}>Patient Details</Text>
        <TouchableOpacity
          onPress={() => {
            reset();
            setEditingIndex(null);
            setShowDatePicker(false);
            setShowModal(true);
          }}
        >
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* PATIENT LIST */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {patients.length === 0 ? (
          <View style={styles.patientBox}>
            <Text style={styles.placeholderText}>
              Please click Add to proceed
            </Text>
          </View>
        ) : (
          patients.map((item, index) => (
            <View
              key={index}
              style={[
                styles.patientCard,
                {
                  borderColor:
                    selectedIndex === index ? COLORS.primary : '#D1D5DB',
                },
              ]}
            >
              <View
                style={[
                  styles.patientTop,
                  {
                    backgroundColor:
                      selectedIndex === index ? '#EBF5FF' : '#FFFFFF',
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.patientRow}
                  onPress={() => setSelectedIndex(index)}
                >
                  <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={22} color="#fff" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <Text style={styles.patientInfo}>{item.gender}</Text>
                    <Text style={styles.patientInfo}>+91 {item.mobile}</Text>
                    <Text style={styles.patientInfo}>{item.email}</Text>
                  </View>

                  <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                    <Ionicons
                      name={
                        selectedIndex === index
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      size={22}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={styles.patientActions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => onEdit(item, index)}
                >
                  <Ionicons name="pencil" size={18} color={COLORS.primary} />
                  <Text style={styles.editText}> Edit</Text>
                </TouchableOpacity>

                <View style={styles.actionDivider} />

                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() =>
                    setPatients(prev => prev.filter((_, i) => i !== index))
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={COLORS.danger}
                  />
                  <Text style={styles.deleteText}> Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            !isPatientSelected && { backgroundColor: '#C7C7C7' },
          ]}
          disabled={!isPatientSelected}
          onPress={onContinue}
        >
          <Text
            style={[
              styles.continueText,
              !isPatientSelected && { color: '#6B7280' },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Patient</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker(false);
                  setShowModal(false);
                }}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Patient Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  style={styles.input}
                  placeholder="Enter Patient Name"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}

            <Text style={styles.inputLabel}>Gender</Text>

            <Controller
              control={control}
              name="gender"
              render={({ field: { value, onChange } }) => (
                <View style={styles.genderRow}>
                  {/* WOMEN */}
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => onChange('FEMALE')}
                  >
                    <View style={styles.outerCircle}>
                      {value === 'FEMALE' && (
                        <View style={styles.innerCircle} />
                      )}
                    </View>
                    <Text style={styles.genderText}>Women</Text>
                  </TouchableOpacity>

                  {/* MEN (Disabled but same layout) */}
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => onChange('MALE')}
                  >
                    <View style={styles.outerCircle}>
                      {value === 'MALE' && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.genderTextDisabled}>Men</Text>
                  </TouchableOpacity>

                  {/* OTHERS (Disabled but same layout) */}
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => onChange('OTHERS')}
                  >
                    <View style={styles.outerCircle}>
                      {value === 'OTHERS' && (
                        <View style={styles.innerCircle} />
                      )}
                    </View>
                    <Text style={styles.genderTextDisabled}>Others</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {errors.gender && (
              <Text style={styles.error}>{errors.gender.message}</Text>
            )}

            <Text style={styles.inputLabel}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  keyboardType="number-pad"
                  style={styles.input}
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles.error}>{errors.mobile.message}</Text>
            )}

            <Text style={styles.inputLabel}>Email ID</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  style={styles.input}
                  placeholder="Enter Email ID"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}

            <Text style={styles.inputLabel}>Reason</Text>
            <Controller
              control={control}
              name="reason"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  style={styles.input}
                  placeholder="Enter Reason"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={onChange}
                />
              )}
            />
            {errors.reason && (
              <Text style={styles.error}>{errors.reason.message}</Text>
            )}

            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{watch('dob') || 'DD/MM/YYYY'}</Text>
              <Ionicons name="calendar-outline" size={20} />
            </TouchableOpacity>
            {errors.dob && (
              <Text style={styles.error}>{errors.dob.message}</Text>
            )}

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            maximumDate={new Date()}
            onChange={(e, date) => {
              setShowDatePicker(false);
              if (date) {
                const d = String(date.getDate()).padStart(2, '0');
                const m = String(date.getMonth() + 1).padStart(2, '0');
                const y = date.getFullYear();
                setValue('dob', `${d}/${m}/${y}`, {
                  shouldValidate: true,
                });
              }
            }}
          />
        )}
      </Modal>
    </View>
  );
};
export default AppointmentBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
  },
  /*  Header  */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.large,
  },

  backBtn: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },

  backIcon: { fontSize: scale(26), color: '#101623' },

  headerTitle: {
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '600',
    color: '#101623',
    marginTop: verticalScale(30),
  },

  rightSpace: { width: 20 },
  /* Doctor Card  */
  doctorCard: {
    width: '100%',
    height: verticalScale(125),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: COLORS.seablue,
    backgroundColor: '#EBF5FF',
    marginBottom: verticalScale(16),
  },

  doctorImg: {
    width: scale(87),
    height: scale(87),
    borderRadius: scale(8),
    resizeMode: 'center',
    marginRight: scale(16),
  },

  doctorName: {
    fontSize: scale(20),
    fontWeight: '600',
    color: '#000000',
    marginBottom: verticalScale(4),
    flexWrap: 'wrap',
  },

  specialization: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginVertical: 4,
    fontWeight: '400',
    flexWrap: 'wrap',
  },

  exp: {
    width: 53,
    height: 18,
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '500',
    color: '#05A836',
  },

  rating: { fontSize: SIZES.small, color: COLORS.black, marginTop: 4 },
  /*  Patient Details  */
  patientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  patientTitle: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000000',
  },

  addText: { fontSize: 16, fontWeight: '600', color: COLORS.primary },

  patientBox: {
    width: '100%',
    height: 132,
    borderWidth: 1,
    borderColor: '#67B6FF',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  placeholderText: { color: COLORS.gray },

  patientCard: {
    borderWidth: 1,
    borderRadius: scale(12),
    marginTop: verticalScale(8),
    overflow: 'hidden',
  },

  patientTop: { padding: scale(12) },

  patientRow: { flexDirection: 'row', alignItems: 'center' },

  avatar: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(22),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  patientName: { fontSize: scale(18), fontWeight: '600', color: '#000000' },

  patientInfo: {
    fontSize: scale(14),
    color: COLORS.gray,
    marginTop: verticalScale(2),
  },

  actionBtn: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  patientActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#D6E9FF',
    paddingVertical: verticalScale(10),
  },

  actionDivider: {
    width: 1,
    height: verticalScale(16),
    backgroundColor: '#D6E9FF',
  },

  editText: { color: COLORS.primary, fontWeight: '500' },

  deleteText: { color: COLORS.danger, fontWeight: '500' },

  footer: {
    padding: scale(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  /*  Continue Button  */
  continueBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
  },

  continueText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: FONT.bold,
  },
  /*  Modal  */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    width: '100%',
    height: '80%',
    backgroundColor: COLORS.white,
    padding: scale(16),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },

  closeText: { fontSize: 18, color: COLORS.gray },

  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    color: '#000000',
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101623',
    marginBottom: 6,
  },

  /* ================= GENDER ================= */

  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: verticalScale(15),
    top: scale(3),
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(25),
  },

  outerCircle: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },

  innerCircle: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: COLORS.primary,
  },

  outerCircleDisabled: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: scale(8),
  },

  genderText: {
    fontSize: scale(14),
    color: '#111827',
  },

  genderTextDisabled: {
    fontSize: scale(14),
    color: '#9CA3AF',
  },

  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: 12,
    marginTop: 50,
  },

  saveText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },

  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(12),
  },

  error: { color: 'red', fontSize: 12, marginBottom: 6 },

  dateTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },

  dateTimeItem: { flexDirection: 'row', alignItems: 'center' },

  dateTimeText: { marginLeft: 4, fontSize: 13, color: '#374151' },

  separator: { marginHorizontal: 6, color: '#9CA3AF' },
});
