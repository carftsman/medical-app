import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const AddPatientModal = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");

  const handleAddPatient = () => {
    const patient = {
      id: Date.now().toString(),
      name,
      gender,
      age,
      mobile,
    };

    onSubmit(patient);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add New Patient</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} onChangeText={setName} />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} onChangeText={setGender} />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} keyboardType="number-pad" onChangeText={setAge} />

        <Text style={styles.label}>Mobile</Text>
        <TextInput style={styles.input} keyboardType="number-pad" onChangeText={setMobile} />

        <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
          <Text style={styles.buttonText}>Add Patient</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddPatientModal;


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    padding: scale(16),
  },

  title: {
    fontSize: scale(16),
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: verticalScale(12),
    textAlign: "center",
  },

  label: {
    fontSize: scale(12),
    color: COLORS.gray,
    marginBottom: verticalScale(4),
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    fontSize: scale(14),
    color: COLORS.black,
    marginBottom: verticalScale(12),
  },

  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
  },

  buttonText: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: "600",
    textAlign: "center",
  },
});
