import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

import { COLORS, FONT, SIZES } from "../../../../config/constants";
import { scale, verticalScale } from "../../../../utils/styling";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../../../../modules/hospitals/utils/Validations";
import { useSelector, useDispatch } from "react-redux";
import { setBookingId } from "../redux/slices/BookingSlice";


import api from "../../../../api/client";

const AppointmentBooking = ({ route }) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const doctorId = route?.params?.doctorId || 1;
  const doctorName = route?.params?.doctorName || "Likith";
  const doctorSpecialization = route?.params?.doctorSpecialization || "General Medicine";
  const doctorExperience = route?.params?.doctorExperience || "15";
  const doctorRating = route?.params?.doctorRating || "4";
  const doctorReviews = route?.params?.doctorReviews || "111";

  const { selectedDate, selectedTime } = useSelector(
    state => state.hospital.consultation
  );
  const [doctor, setDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const slotId = selectedTime?.slotId;



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
      name: "",
      mobile: "",
      email: "",
      reason: "",
      dob: "",
      gender: "",
    },
    mode: "onChange",
  });

  /*  FETCH DOCTOR */
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!doctorId) return;

        const res = await api.get(`/hospital/user/doctors/${doctorId}`);
        setDoctor(res?.data);
      } catch (error) {
        console.log("Doctor fetch error", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);


  /*  SAVE PATIENT  */
  const onSubmit = data => {
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
        console.log("No slot selected");
        return;
      }
      const patient = patients[selectedIndex];

      const [dd, mm, yyyy] = patient.dob.split("/");
      const formattedDob = `${yyyy}-${mm}-${dd}`;

      const payload = {
        slotId: selectedTime.slotId,
        bookingFor: "OTHER",
        patient: {
          fullName: patient.name,
          gender: patient.gender,
          phone: patient.mobile,
          email: patient.email,
          reason: patient.reason,
          dob: formattedDob,
        },
      };

      console.log("Hold appointment payload:", payload);

      const res = await api.post("/api/appointments/hold", payload);

      console.log("STATUS:", res.status);
      console.log("FULL RESPONSE:", JSON.stringify(res.data, null, 2));
      const bookingId = res.data.bookingId || res.data.id;

      dispatch(setBookingId(bookingId));

      navigation.navigate("WomenAppointmentBooking", {
        bookingId,
      });


      console.log("Hold appointment success:", res.data);
    } catch (error) {
      if (error?.response?.status === 409) {
        Alert.alert(

          "Slot Unavailable",
          "This slot is no longer available. Please select another time."
        );
      } else {
        Alert.alert(
          "Error",
          "Something went wrong. Please try again."
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book an Appointment</Text>
        <View style={{ width: 20 }} />
      </View>

      {/* DOCTOR CARD */}
      <View style={styles.doctorCard}>
        <Image
          source={
            doctor?.imageUrl
              ? { uri: doctor.imageUrl }
              : require("../../../../../assets/Doctor5.jpg")
          }
          style={styles.doctorImg}
        />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>
            Dr. {doctor?.name}
          </Text>

          <Text style={styles.specialization}>
            {doctor?.specialization}
            <Text> | </Text>
            <Text style={styles.exp}>
              {doctor?.experience} Years
            </Text>
          </Text>

          <View style={styles.ratingRow}>

            {[...Array(5)].map((_, index) => (
              <MaterialIcons
                key={index}
                name={index < doctor?.rating ? 'star' : 'star-border'}
                size={15}
                color="#FDC700"
              />
            ))}

            <Text style={styles.ratingText}>
              {doctor?.rating}
            </Text>

            <Text style={styles.reviewText}>
              ({doctor?.reviews || 112} reviews)
            </Text>
          </View>

          {selectedDate && selectedTime && (
            <View style={styles.dateTimeRow}>
              <Ionicons name="calendar-outline" size={14} color="#6B7280" />
              <Text>{selectedDate}</Text>

              <Text> | </Text>

              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text>{selectedTime.time}</Text>
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
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() =>
                setSelectedIndex(selectedIndex === index ? null : index)
              }
              style={[
                styles.patientCard,
                {
                  borderColor:
                    selectedIndex === index ? COLORS.pink : "#F6339A",
                },
              ]}
            >
              {/* TOP SECTION */}
              <View style={styles.patientTop}>
                <View style={styles.patientRow}>
                  <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={22} color="#fff" />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <Text style={styles.patientInfo}>+91 {item.mobile}</Text>
                    <Text style={styles.patientInfo}>{item.email}</Text>
                  </View>

                  <Ionicons
                    name={
                      selectedIndex === index
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={22}
                    color={COLORS.pink}
                  />
                </View>
              </View>

              {/* ACTIONS – ONLY WHEN SELECTED */}
              {selectedIndex === index && (
                <View style={styles.patientActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => onEdit(item, index)}
                  >
                    <Ionicons name="pencil" size={18} color={COLORS.pink} />
                    <Text style={styles.editText}> Edit</Text>
                  </TouchableOpacity>

                  <View style={styles.actionDivider} />

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() =>
                      setPatients(prev =>
                        prev.filter((_, i) => i !== index)
                      )
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
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>


      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueBtn,
            {
              backgroundColor: isPatientSelected
                ? "#F472B6"
                : "#FBCFE8",
            },
          ]}
          disabled={!isPatientSelected}
          onPress={onContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
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

                  {/* WOMEN OPTION */}
                  <TouchableOpacity
                    style={styles.genderOption}
                    onPress={() => onChange("Female")}
                  >
                    <View style={styles.outerCircle}>
                      {value === "Female" && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.genderText}>Women</Text>
                  </TouchableOpacity>

                  {/* MEN OPTION - DISABLED */}
                  <TouchableOpacity
                    style={[styles.genderOption, styles.disabled]}
                    disabled={true}
                  >
                    <View style={styles.outerCircleDisabled} />
                    <Text style={styles.disabledText}>Men</Text>
                  </TouchableOpacity>

                  {/* OTHER OPTION - DISABLED */}
                  <TouchableOpacity
                    style={[styles.OtherOption, styles.disabled]}
                    disabled={true}
                  >
                    <View style={styles.outerCircleDisabled} />
                    <Text style={styles.disabledText}>Others</Text>
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
                  placeholder="Enter Mobile Number" c
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
              <Text>{watch("dob") || "DD/MM/YYYY"}</Text>
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
                const d = String(date.getDate()).padStart(2, "0");
                const m = String(date.getMonth() + 1).padStart(2, "0");
                const y = date.getFullYear();
                setValue("dob", `${d}/${m}/${y}`, {
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
    padding: SIZES.medium,
  },

  /* ================= HEADER ================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.large,
  },

  backBtn: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(30),
  },

  backIcon: {
    fontSize: scale(26),
    color: "#101623",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: scale(18),
    fontWeight: "600",
    color: "#101623",
    marginTop: verticalScale(30),
  },

  rightSpace: {
    width: scale(40),
  },

  /* ================= DOCTOR CARD ================= */
  doctorCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: scale(18),
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "#F472B6",
    backgroundColor: "#FFF1F5",
    marginBottom: verticalScale(18),
  },

  doctorImg: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(12),
    resizeMode: "cover",
    marginRight: scale(16),
  },

  doctorDetails: {
    flex: 1,
    justifyContent: "center",
  },

  doctorName: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: verticalScale(4),
  },

  specRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(6),
  },

  specialization: {
    fontSize: scale(14),
    color: "#6B7280",
  },

  separator: {
    marginHorizontal: scale(6),
    color: "#9CA3AF",
  },

  exp: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#16A34A",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  starIcon: {
    marginRight: scale(2),
  },

  ratingNumber: {
    marginLeft: scale(6),
    fontSize: scale(14),
    fontWeight: "600",
    color: "#1F2937",
  },

  reviewText: {
    marginLeft: scale(4),
    fontSize: scale(13),
    color: "#6B7280",
  },

  /* ================= PATIENT HEADER ================= */

  patientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(8),
  },

  patientTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#111827",
  },

  addText: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#EC4899",
  },

  /* ================= EMPTY BOX ================= */

  patientBox: {
    width: "100%",
    height: verticalScale(120),
    borderWidth: 1,
    borderColor: "#EC4899",
    borderRadius: scale(12),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(8),
  },

  placeholderText: {
    color: "#9CA3AF",
    fontSize: scale(14),
  },

  /* ================= PATIENT CARD ================= */

  patientCard: {
    borderWidth: 1,
    borderColor: "#F472B6",
    borderRadius: scale(14),
    marginTop: verticalScale(10),
    backgroundColor: "#FFF1F5",
    padding: scale(14),
  },

  patientTop: {
    width: "100%",
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },

  patientDetails: {
    flex: 1,
    justifyContent: "center",
  },

  patientName: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#111827",
  },

  patientInfo: {
    fontSize: scale(13),
    color: "#6B7280",
    marginTop: 2,
  },

  /* RADIO BUTTON */

  radioOuter: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    borderWidth: 2,
    borderColor: "#EC4899",
    justifyContent: "center",
    alignItems: "center",
  },

  radioInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#EC4899",
  },

  /* ================= ACTIONS ================= */

  patientActions: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#FBCFE8",
    marginTop: verticalScale(12),
    paddingVertical: verticalScale(10),
  },

  actionBtn: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  actionDivider: {
    width: 1,
    height: verticalScale(18),
    backgroundColor: "#FBCFE8",
  },

  editText: {
    color: "#EC4899",
    fontWeight: "500",
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "500",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    marginBottom: verticalScale(15),
    backgroundColor: "#FFF",
  },

  dateText: {
    fontSize: scale(14),
    color: "#111827",
  },

  genderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },

  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(30),
  },

  outerCircle: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: "#EC4899",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(8),
  },

  innerCircle: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: "#EC4899",
  },

  outerCircleDisabled: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: scale(8),
  },

  genderText: {
    fontSize: scale(14),
    color: "#111827",
  },

  disabled: {
    opacity: 0.4,
  },

  disabledText: {
    fontSize: scale(14),
    color: "#9CA3AF",
  },

  OtherOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(30),
  },



  /* ================= FOOTER ================= */

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: scale(16),
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  continueBtn: {
    width: "100%",
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: "center",
    backgroundColor: "#EC4899",
  },

  continueText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: scale(16),
    fontWeight: "600",
  },

  /* ================= MODAL ================= */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContent: {
    width: "100%",
    height: "80%",
    backgroundColor: COLORS.white,
    padding: scale(16),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },

  modalTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#111827",
  },

  closeText: {
    fontSize: scale(18),
    color: "#6B7280",
  },

  inputLabel: {
    fontSize: scale(14),
    fontWeight: "500",
    color: "#111827",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(12),
    color: "#111827",
  },

  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
  },

  saveBtn: {
    backgroundColor: "#EC4899",
    padding: scale(14),
    borderRadius: scale(12),
    marginTop: verticalScale(30),
  },

  saveText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: scale(15),
    fontWeight: "600",
  },
});
