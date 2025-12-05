

import React, { useEffect, useState, useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";

import PrimaryButton from "../../components/PrimaryButton";
import OTPInputs from "../../components/OTPInputs";
import SuccessModal from "../../components/SuccessModal";

import { verifyOtp, sendOtp } from "../../services/authService";
import { isValidOtp } from "../../utils/validation";
import { COLORS, FONT, SIZES } from "../../config/constants";
import BackButton from "../../components/BackButton";

const OTP_LENGTH = 6;
const RESEND_DELAY = 60;

export default function EnterOTPScreen({ navigation, route }) {
  const phone = route?.params?.phone;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [showSuccess, setShowSuccess] = useState(false);

  const [timer, setTimer] = useState(RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [inlineError, setInlineError] = useState(null);

  const intervalRef = useRef(null);
  const verifyRef = useRef(false);
  const resendRef = useRef(false); 

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  
  const handleChange = useCallback((index, text) => {
    const digit = text.replace(/\D/g, "");
    setDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  }, []);

  // -------------------------------------------------
  // VERIFY OTP
  // -------------------------------------------------
  const handleVerify = useCallback(async () => {
    if (verifyRef.current) return;
    verifyRef.current = true;

    Keyboard.dismiss();
    const otp = digits.join("");

    if (!isValidOtp(otp, OTP_LENGTH)) {
      setInlineError(`Please enter ${OTP_LENGTH} digits`);
      verifyRef.current = false;
      return;
    }

    setLoading(true);
    const resp = await verifyOtp({ phone, otp });
    setLoading(false);

    if (resp.success && resp.verified) {
      setShowSuccess(true);
    } else {
      setInlineError(resp.message || "Verification failed");
    }

    setTimeout(() => {
      verifyRef.current = false;
    }, 500);
  }, [digits, phone]);

  // -------------------------------------------------
  // RESEND OTP 
  // -------------------------------------------------
  const handleResend = useCallback(async () => {
    if (!canResend || resendRef.current) return;
    resendRef.current = true;

    setInlineError(null);
    setCanResend(false);
    setTimer(RESEND_DELAY);

    const resp = await sendOtp(phone);

    if (!resp.success) {
      setInlineError(resp.message || "Failed to resend OTP");
    }

    // restart timer
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    setTimeout(() => {
      resendRef.current = false;
    }, 800);
  }, [canResend, phone]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.top}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.header}>OTP Verification</Text>
        </View>

        <Text style={styles.info}>
          A 6 digit OTP has been sent to your phone number{" "}
          <Text style={styles.phoneNumber}>{phone}</Text>{" "}
          <Text style={styles.change} onPress={() => navigation.goBack()}>
            Change
          </Text>
        </Text>

        <Text style={styles.label}>Enter OTP Text</Text>

        <OTPInputs length={OTP_LENGTH} values={digits} onChange={handleChange} />

        {inlineError && <Text style={styles.errorText}>{inlineError}</Text>}

        <PrimaryButton
          title={loading ? "Verifying..." : "Verify OTP"}
          onPress={handleVerify}
        />

        <TouchableOpacity
          style={styles.resendRow}
          disabled={!canResend}
          onPress={handleResend}
        >
          <Text
            style={[styles.resendText, !canResend && styles.resendDisabled]}
          >
            {canResend
              ? "Resend code"
              : `Resend code in 00:${String(timer).padStart(2, "0")}`}
          </Text>
        </TouchableOpacity>

        {showSuccess && (
          <View style={styles.modalWrapper}>
            <View style={styles.backdrop} />
            <View style={styles.modalContent}>
              <SuccessModal
                title="Yeay! Welcome Back"
                subtitle="Once again you login successfully into medidoc app"
                buttonText="Go to home"
                onPress={() => navigation.replace("Home")}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: SIZES.large },
  top: { flexDirection: "row", alignItems: "center", marginBottom: 25, marginTop: 5 },
  header: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft: 50,
    fontWeight: "700",
    marginTop: 20,
  },
  info: { fontSize: SIZES.small + 1, color: COLORS.gray, marginBottom: SIZES.large },
  change: { color: COLORS.danger, fontFamily: FONT.medium },
  label: { fontSize: SIZES.medium, fontFamily: FONT.bold, color: COLORS.black, marginBottom: SIZES.small },
  resendRow: { marginTop: SIZES.large, alignItems: "center" },
  resendText: { fontSize: SIZES.small + 1, color: COLORS.primary, fontFamily: FONT.medium },
  resendDisabled: { color: COLORS.gray },
  errorText: { color: COLORS.danger, marginTop: 10, textAlign: "center" },
  modalWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.1)" },
  modalContent: { width: "85%" },
});
