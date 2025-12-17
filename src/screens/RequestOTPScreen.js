// src/screens/ForgotPassword/RequestOTPScreen.js
import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import AuthService from "../services/auth";
import { COLORS, SIZES } from "../config/constants";

// debounce hook
function useDebounce(fn, delay = 300) {
  const timer = useRef(null);
  return useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]);
}

// UI expects 10-digit local input)
function normalizePhoneInput(val = "") {
  return String(val).replace(/\D/g, "");
}
function isValidPhone(val = "") {
  return /^\d{10}$/.test(val);
}

const RequestOTPScreen = ({ navigation, route }) => {
  const [rawPhone, setRawPhone] = useState(route?.params?.phone || "");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const digits = normalizePhoneInput(rawPhone);
    if (!digits) return "Enter phone number.";
    if (!isValidPhone(digits)) return "Enter a valid 10-digit phone number.";
    return null;
  };

  const handleSendOTP = async () => {
    Keyboard.dismiss();
    const err = validate();
    if (err) {
      Alert.alert("Validation", err);
      return;
    }

    setLoading(true);
    const response = await AuthService.requestOtpWithFallback(rawPhone); // service formats +91
    setLoading(false);

    if (!response.ok) {
      Alert.alert("Error", response.message || "Unable to send OTP");
      return;
    }

    const txnId = response.data?.txnId || null;

    
    navigation.navigate("EnterOTP", { rawPhone, txnId });
  };

  const debouncedSend = useDebounce(handleSendOTP, 300);

  const isDisabled = () => validate() !== null || loading;

  return (
  <View style={styles.container}>
    <View style={styles.headerRow}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={26} color={COLORS.black} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter Mobile Number</Text>
    </View>

    <Text style={styles.subtitle}>
      Enter your registered mobile number to receive an OTP.
    </Text>

    {/* 📌 1️⃣ PHONE NUMBER INPUT CONTAINER */}
    <View style={styles.inputContainer}>
  <InputField
  icon={<Ionicons name="call-outline" size={22} color="#7D8A99" />}
  placeholder="Enter phone number"
  value={rawPhone}
  onChangeText={setRawPhone}
  keyboardType="phone-pad"
/>

</View>


    {/* 📌 2️⃣ GET OTP BUTTON CONTAINER */}
    <View style={styles.buttonContainer}>
      <PrimaryButton
        title={loading ? "Sending OTP..." : "Get OTP"}
        onPress={debouncedSend}
        disabled={isDisabled()}
      />
    </View>

    {/* 📌 3️⃣ HINT TEXT CONTAINER */}
    <View style={styles.hintContainer}>
      <Text style={styles.hint}>
        We will send a 6-digit code to verify your account.
      </Text>
    </View>
  </View>
);

};

export default RequestOTPScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, paddingTop: 70 },
  headerRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 8 },
  backBtn: { padding: 8 },
  title: { flex: 1, textAlign: "center", fontSize: SIZES.xLarge , fontWeight: "600", color: COLORS.black },
  subtitle: { textAlign: "center", color: COLORS.gray, fontSize: SIZES.medium, marginHorizontal: 24, marginTop: 2, lineHeight: 22 },
  form: { marginTop: 35, alignItems: "center" },
  hint: { marginTop: 14, color: COLORS.gray, fontSize: SIZES.small, textAlign: "center" },
});


