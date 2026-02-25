import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const AddPatientModal = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (name.trim().length < 3)
      err.name = "Enter valid full name";

    if (!gender)
      err.gender = "Select gender";

    if (!/^\d{1,3}$/.test(age) || Number(age) < 1 || Number(age) > 120)
      err.age = "Enter valid age";

    if (!/^\d{10}$/.test(mobile))
      err.mobile = "Enter valid 10 digit mobile number";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddPatient = () => {
    if (!validate()) return;

    const patient = {
      id: Date.now().toString(),
      name,
      gender,
      age,
      mobile,
    };

    onSubmit(patient);
    onClose();

    // reset form
    setName("");
    setGender("");
    setAge("");
    setMobile("");
    setErrors({});
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

        {/* NAME */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter patient name"
        />
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        {/* GENDER SELECTOR */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {["Male", "Female"].map(g => (
            <TouchableOpacity
              key={g}
              style={[
                styles.genderBtn,
                gender === g && styles.genderSelected,
              ]}
              onPress={() => setGender(g)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === g && { color: COLORS.white },
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

        {/* AGE */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          keyboardType="number-pad"
          onChangeText={setAge}
          placeholder="Enter age"
          maxLength={3}
        />
        {errors.age && <Text style={styles.error}>{errors.age}</Text>}

        {/* MOBILE */}
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          keyboardType="number-pad"
          onChangeText={setMobile}
          placeholder="Enter mobile number"
          maxLength={10}
        />
        {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

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

  error: {
    color: "red",
    fontSize: scale(11),
    marginBottom: verticalScale(8),
  },

  genderRow: {
    flexDirection: "row",
    gap: scale(10),
    marginBottom: verticalScale(10),
  },

  genderBtn: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: COLORS.blue,
    alignItems: "center",
  },

  genderSelected: {
    backgroundColor: COLORS.blue,
  },

  genderText: {
    fontSize: scale(14),
    color: COLORS.blue,
    fontWeight: "600",
  },

});
