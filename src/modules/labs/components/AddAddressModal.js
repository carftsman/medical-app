import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const AddAddressModal = ({ visible, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    house: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [showStateModal, setShowStateModal] = useState(false)

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 3)
      newErrors.name = "Enter valid name";

    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10-digit number";

    if (!form.house.trim())
      newErrors.house = "Required";

    if (!form.street.trim())
      newErrors.street = "Required";

    if (!form.city.trim())
      newErrors.city = "Required";

    if (!form.state)
      newErrors.state = "Select state";

    if (!/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Enter valid 6-digit pin";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validate()) return;

    await onSubmit(form);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Add Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.gray}
              onChangeText={(v) => handleChange("name", v)}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.gray}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(v) => handleChange("mobile", v)}
            />
            {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <TextInput
              style={styles.input}
              placeholder="House / Flat No"
              placeholderTextColor={COLORS.gray}
              onChangeText={(v) => handleChange("house", v)}
            />
            {errors.house && <Text style={styles.error}>{errors.house}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Street / Area"
              placeholderTextColor={COLORS.gray}
              onChangeText={(v) => handleChange("street", v)}
            />
            {errors.street && <Text style={styles.error}>{errors.street}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Landmark (optional)"
              placeholderTextColor={COLORS.gray}
              onChangeText={(v) => handleChange("landmark", v)}
            />

            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor={COLORS.gray}
              onChangeText={(v) => handleChange("city", v)}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}

            <View style={styles.pickerWrapper}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowStateModal(true)}
                >
                <Text style={{ color: form.state ? COLORS.black : COLORS.gray }}>
                    {form.state || "Select State"}
                </Text>
                </TouchableOpacity>


            </View>
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}

            {/* Pincode */}
            <TextInput
              style={styles.input}
              placeholder="Pin code"
              placeholderTextColor={COLORS.gray}
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={(v) => handleChange("pincode", v)}
            />
            {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={handleAddAddress}
            >
              <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
          </ScrollView>
        </Pressable>
      </Pressable>

    <Modal
    visible={showStateModal}
    transparent
    animationType="slide"
    onRequestClose={() => setShowStateModal(false)}
    >
    <Pressable
        style={styles.stateOverlay}
        onPress={() => setShowStateModal(false)}
    >
        <View style={styles.stateSheet}>
        <Text style={styles.sheetTitle}>Select State</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
            {INDIAN_STATES.map((state) => (
            <TouchableOpacity
                key={state}
                style={styles.stateItem}
                onPress={() => {
                handleChange("state", state);
                setShowStateModal(false);
                }}
            >
                <Text style={styles.stateText}>{state}</Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    </Pressable>
    </Modal>
    </Modal>
  );
};

export default AddAddressModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: scale(16),
  },

  container: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    padding: scale(16),
  },

  title: {
    fontSize: scale(16),
    fontWeight: "700",
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
    padding: scale(10),
    marginBottom: verticalScale(10),
    color: COLORS.black,
  },

  row: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    marginTop: verticalScale(10),
  },

  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: scale(14),
    fontWeight: "600",
  },

  error: {
    color: "red",
    fontSize: scale(11),
    marginBottom: verticalScale(6),
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },

  stateOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    },

  stateSheet: {
    backgroundColor: COLORS.white,
    padding: scale(16),
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    maxHeight: "70%",
    },

  sheetTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    marginBottom: verticalScale(12),
    textAlign: "center",
    },

  stateItem: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    },

  stateText: {
    fontSize: scale(14),
    color: COLORS.black,
    },

});
