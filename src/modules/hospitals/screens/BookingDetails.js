import React, { useState } from "react";
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
import { COLORS, FONT, SIZES } from "../../../config/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../utils/styling";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../utils/Validations";


const BookingDetails = () => {
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
      name: "",
      mobile: "",
      email: "",
      reason: "",
      dob: "",
    },
    mode: "onChange",
  });

  /*  SUBMIT  */
  const onSubmit = (data) => {
    if (editingIndex !== null) {
      const updated = [...patients];
      updated[editingIndex] = data;
      setPatients(updated);
    } else {
      setPatients((prev) => [...prev, data]);
    }
    reset();
    setEditingIndex(null);
    setShowModal(false);
  };

  /*  EDIT  */
  const onEdit = (item, index) => {
    reset(item);
    setEditingIndex(index);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Book an Appointment</Text>
        </View>

        <View style={styles.rightSpace} />
      </View>
      
      {/* DOCTOR CARD */}
      <View style={styles.doctorCard}>
        <Image
          source={require("../../../../assets/Doctor.jpg")}
          style={styles.doctorImg}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.doctorName}>Dr. John Wick</Text>
          <Text style={styles.specialization}>
            Gynaecologist | <Text style={styles.exp}>7 Years</Text>
          </Text>
          <Text style={styles.rating}>⭐⭐⭐⭐⭐ 4.5 (121 reviews)</Text>
        </View>
      </View>

      {/* PATIENT HEADER */}
      <View style={styles.patientHeader}>
        <Text style={styles.patientTitle}>Patient Details</Text>
        <TouchableOpacity
          onPress={() => {
            reset();
            setEditingIndex(null);
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
                  borderColor: selectedIndex === index ? COLORS.primary : "#D1D5DB",
                },
              ]}
            >
              <View
                style={[
                  styles.patientTop,
                  { backgroundColor: selectedIndex === index ? "#EBF5FF" : "#FFFFFF", },
                ]} >
                <View style={styles.patientRow}>
                  <View style={styles.avatar}>
                    <Ionicons name="person-outline" size={22} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <Text style={styles.patientInfo}>+91 {item.mobile}</Text>
                    <Text style={styles.patientInfo}>{item.email}</Text>
                  </View>

                  <TouchableOpacity onPress={() => setSelectedIndex(index)}>
                    <Ionicons name={selectedIndex === index ? "radio-button-on" : "radio-button-off"} size={22} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
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
                    setPatients((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  <Ionicons
                    name="trash-outline" size={18} color={COLORS.danger} />
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
            !isPatientSelected && { backgroundColor: "#C7C7C7" }, // disabled look
          ]}
          disabled={!isPatientSelected}
          onPress={() => {
            console.log("Selected patient:", patients[selectedIndex]);
          }}
        >
          <Text
            style={[
              styles.continueText,
              !isPatientSelected && { color: "#6B7280" },]}>Continue </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Patient</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* NAME */}
            <Text style={styles.inputLabel}>Patient Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  placeholder="Enter Patient Name"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            {/* MOBILE */}
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <Controller
              control={control}
              name="mobile"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  keyboardType="number-pad"
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles.error}>{errors.mobile.message}</Text>
            )}
            {/* EMAIL */}
            <Text style={styles.inputLabel}>Email ID</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  placeholder="Enter Email ID"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.error}>{errors.email.message}</Text>
            )}
            {/* REASON */}
            <Text style={styles.inputLabel}>Reason</Text>
            <Controller
              control={control}
              name="reason"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  placeholder="Enter Reason"
                  placeholderTextColor="#9CA3AF"
                  style={styles.input}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.reason && (
              <Text style={styles.error}>{errors.reason.message}</Text>
            )}

            {/* DOB */}
            <Text style={styles.inputLabel}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {watch("dob") || "DD/MM/YYYY"}
              </Text>
              <Ionicons name="calendar-outline" size={20} />
            </TouchableOpacity>
            {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

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

export default BookingDetails;

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: COLORS.white, padding: SIZES.medium },
  /*  Header  */
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: SIZES.large },

  backBtn: { width: scale(40), height: scale(40), justifyContent: "center", alignItems: "center", marginTop: verticalScale(30) },

  backIcon: { fontSize: scale(26), color: "#101623" },

  headerTitle: { width: scale(188), textAlign: "center", fontSize: scale(18), fontWeight: "600", color: "#101623", marginTop: verticalScale(30) },

  rightSpace: { width: 20, },
  /* Doctor Card  */
  doctorCard: { width: "100%", height: verticalScale(123), flexDirection: "row", alignItems: "center", padding: scale(16), borderRadius: scale(12), borderWidth: 1, borderColor: COLORS.seablue, backgroundColor: "#EBF5FF", marginBottom: verticalScale(16), },

  doctorImg: { width: scale(87), height: scale(87), borderRadius: scale(8), resizeMode: "cover", marginRight: scale(16) },

  doctorName: { width: 133, height: 24, fontSize: 20, lineHeight: 20, fontWeight: "600", color: "#000000" },

  specialization: { fontSize: SIZES.medium, color: COLORS.gray, marginVertical: 4, fontWeight: "400" },

  exp: { width: 53, height: 18, fontSize: 15, lineHeight: 15, fontWeight: "500", color: "#05A836" },

  rating: { fontSize: SIZES.small, color: COLORS.black, marginTop: 4 },
  /*  Patient Details  */
  patientHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 8 },

  patientTitle: { width: 141, height: 24, fontSize: 20, lineHeight: 20, fontWeight: "600", color: "#000000", },

  addText: { fontSize: 16, fontWeight: "600", color: COLORS.primary, },

  patientBox: { width: "100%", height: 132, borderWidth: 1, borderColor: "#67B6FF", borderRadius: 10, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center", marginTop: 8, },

  placeholderText: { color: COLORS.gray, },

  patientCard: { borderWidth: 1, borderRadius: scale(12), marginTop: verticalScale(8), overflow: "hidden", },

  patientTop: { padding: scale(12), },

  patientRow: { flexDirection: "row", alignItems: "center", },

  avatar: { width: scale(45), height: scale(45), borderRadius: scale(22), backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center", marginRight: scale(12), },

  patientName: { fontSize: scale(18), fontWeight: "600", color: "#000000", },

  patientInfo: { fontSize: scale(14), color: COLORS.gray, marginTop: verticalScale(2), },

  actionBtn: { flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "center" },

  patientActions: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: "#D6E9FF", paddingVertical: verticalScale(10), },

  actionDivider: { width: 1, height: verticalScale(16), backgroundColor: "#D6E9FF", },

  editText: { color: COLORS.primary, fontWeight: "500", },

  deleteText: { color: COLORS.danger, fontWeight: "500", },

  footer: { padding: scale(16), backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: "#E5E7EB" },
  /*  Continue Button  */
  continueBtn: { backgroundColor: COLORS.primary, paddingVertical: verticalScale(14), borderRadius: scale(12), },

  continueText: { color: COLORS.white, textAlign: "center", fontSize: scale(16), fontFamily: FONT.bold },
  /*  Modal  */
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },

  modalContent: { width: "100%", height: "80%", backgroundColor: COLORS.white, padding: scale(16), borderTopLeftRadius: scale(20), borderTopRightRadius: scale(20), },

  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SIZES.medium, },

  modalTitle: { fontSize: 18, fontWeight: "600", color: "#000000", marginBottom: 10 },

  closeText: { fontSize: 18, color: COLORS.gray, },

  input: { borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 12, padding: SIZES.medium, marginBottom: SIZES.small, color: "#000000" },

  inputLabel: { fontSize: 14, fontWeight: "500", color: "#101623", marginBottom: 6, },

  saveBtn: { backgroundColor: COLORS.primary, padding: SIZES.medium, borderRadius: 12, marginTop: 50 },

  saveText: { color: COLORS.white, textAlign: "center", fontSize: SIZES.medium, fontFamily: FONT.bold, },

  dateInput: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: scale(12), paddingVertical: verticalScale(14), paddingHorizontal: scale(14), marginBottom: verticalScale(12), },

  dateText: { fontSize: scale(14), },

  error: { color: "red", fontSize: 12, marginBottom: 6, },
});
