// src/screens/ForgotPassword/EnterOTPScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import PrimaryButton from "../components/PrimaryButton";
import AuthService from "../services/auth";
import { COLORS, SIZES } from "../config/constants";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const EnterOTPScreen = ({ route, navigation }) => {
  const { rawPhone = "", txnId = null } = route.params || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const hiddenInputRef = useRef(null);

  // Auto focus the hidden OTP input 
  useEffect(() => {
    setTimeout(() => hiddenInputRef.current?.focus(), 300);
  }, []);

  //  Resend countdown timer 
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  /** OTP text handler */
  const onChangeOtp = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(cleaned);
  };

  //  Verify OTP handler 
  const handleVerify = async () => {
    if (otp.length !== OTP_LENGTH) {
      Alert.alert("Validation", "Enter complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    const response = await AuthService.verifyOtpWithFallback({ rawPhone, otp, txnId });
    setLoading(false);

    if (!response.ok) {
      Alert.alert("Error", response.message || "OTP verification failed.");
      return;
    }

    const resetToken = response.data?.resetToken || null;

    navigation.navigate("ResetPassword", { rawPhone, resetToken });
  };

  //  Resend OTP handler 
  const handleResend = () => {
    if (timer > 0) return;
    navigation.navigate("RequestOTP", { phone: rawPhone });
  };

  //  Render 6 OTP Boxes 
  const renderBoxes = () => {
    const chars = otp.split("");

    return [...Array(OTP_LENGTH)].map((_, i) => (
      <View
        key={i}
        style={[
          styles.otpBox,
          otp.length === i && styles.otpBoxFocused,
        ]}
      >
        <Text style={styles.otpChar}>{chars[i] || ""}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.title}>OTP Verification</Text>
      </View>

     
      <Text style={styles.subtitle}>
        A 6 digit OTP has been sent to your phone number +91{" "}
        <Text style={styles.phoneText}>{rawPhone}</Text>{" "}
        <Text
          onPress={() => navigation.navigate("RequestOTP", { phone: rawPhone })}
          style={styles.changeText}
        >
          Change
        </Text>
      </Text>

      <Text style={styles.label}>Enter OTP Text</Text>

      {/* OTP boxes  */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => hiddenInputRef.current?.focus()}
        style={styles.otpWrapper}
      >
        <View style={styles.otpRow}>{renderBoxes()}</View>

        {/* Hidden input */}
        <TextInput
          ref={hiddenInputRef}
          value={otp}
          onChangeText={onChangeOtp}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          style={styles.hiddenInput}
        />
      </TouchableOpacity>

      
<View style={{ marginTop: 18 }}>
  <PrimaryButton
    title={loading ? "Verifying..." : "Verify OTP"}
    onPress={handleVerify}
    disabled={otp.length !== OTP_LENGTH || loading}
  />
</View>


     {/* resend code */}
<TouchableOpacity
  onPress={handleResend}
  disabled={timer > 0}
  style={{ marginTop: 8 }}
>
  <Text
    style={[
      styles.resendText,
      timer > 0 && { color: COLORS.gray },
    ]}
  >
    {timer > 0 ? `Resend Code 00:${timer.toString().padStart(2, "0")}` : "Resend Code"}
  </Text>
</TouchableOpacity>

    </View>
  );
};

export default EnterOTPScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 60, 
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  backBtn: { padding: 8 },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: SIZES.xLarge ,
    fontWeight: "600",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 10,
    marginHorizontal: 24,
    textAlign: "left",
    color: COLORS.black,
    fontSize: SIZES.medium, 
    lineHeight: 24,
  },

  phoneText: {
    fontWeight: "700",
    color: COLORS.black, 
  },

  changeText: {
    color: "red", 
    fontWeight: "600",
  },

  label: {
    marginTop: 20,
    marginLeft: 24,
    color: COLORS.black,
  },

  otpWrapper: {
    marginTop: 18,
    alignItems: "center",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
  },

  otpBox: {
    width: 50,
    height: 50,
    marginHorizontal: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  otpBoxFocused: {
    borderColor: COLORS.primary,
  },

  otpChar: {
    fontSize: 20,
    color: COLORS.black,
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  resendText: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: SIZES.small,
    marginTop: 5,
  },
});

