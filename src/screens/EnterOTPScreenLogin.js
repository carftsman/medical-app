import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authApi } from "../api/authApi";
import { scale, verticalScale } from "../utils/styling";
import api from "../api/client";
import useAuth from "../hooks/useAuth";
 
 
 
const OTP_LENGTH = 6;
 
export default function EnterOTPScreenLogin({ navigation, route }) {
  const value = route?.params?.value || '';
const type = route?.params?.type || 'phone';
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  const inputs = useRef([]);
 
  const { handleSaveToken, handleAuthState } = useAuth()
  useEffect(() => {
    const i = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(i);
  }, []);
 
  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
 
    const copy = [...otp];
    copy[i] = v;
    setOtp(copy);
 
    if (v && i < OTP_LENGTH - 1) {
      inputs.current[i + 1]?.focus();
    }
  };
  const handleResendOtp = async () => {
    if (timer > 0) return;
 
    try {
      setError("");
      setTimer(30);
 
      await authApi.sendOtp({ phone });
 
      const i = setInterval(() => {
        setTimer(t => {
          if (t <= 1) {
            clearInterval(i);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (e) {
      setError("Failed to resend OTP");
    }
  };
 
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    console.log(code)
 
    setError("")
    setLoading(true)
    try {
      const payload =
      type === 'phone'
        ? { phone: value, otp: code }
        : { email: value, otp: code };
    const res = await authApi.verifyOtp(payload);
      //const res = await api.post("/hospital/user/auth/verify-otp", {phone, otp:code});
      setLoading(false)
      if (res.data.isOnboardingCompleted) {
        handleAuthState(true)
        handleSaveToken(res.data.token)
        // navigation.navigate("Bottom")
        return
      } else {
 
        handleSaveToken(res.data.token)
        navigation.navigate("Register")
      }
 
      // setAuthState(res.data.token)
 
      // navigation.navigate({
      //   index: 0,
      //   routes: [{ name: "Bottom" }],
      // });
 
 
 
    } catch (e) {
      
      setLoading(false)
      console.log("error while sending otp", e)
      setError("Invalid OTP");
    }
  };
 
  const isOtpComplete = otp.every(v => v !== "");
 
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
 
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        />
 
        <Text style={styles.title}>Verify OTP</Text>
 
        {/* OTP SENT + CHANGE NUMBER */}
        <View style={styles.subRow}>
          <Text style={styles.subText}>
          OTP sent to {type === 'phone' ? `+91 ${value}` : value}
        </Text>


          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.changeText}>Change Number</Text>
          </TouchableOpacity>
        </View>
 
        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {otp.map((v, i) => (
            <TextInput
              key={i}
              ref={r => (inputs.current[i] = r)}
              value={v}
              style={[
                styles.otpBox,
                v && styles.otpFilled,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={i === 0}
              onChangeText={t => handleChange(i, t)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && !otp[i] && i > 0) {
                  inputs.current[i - 1]?.focus();
                }
              }}
            />
          ))}
        </View>
 
        {!!error && <Text style={styles.error}>{error}</Text>}
 
        {/* VERIFY */}
        <TouchableOpacity
          style={[
            styles.verifyBtn,
            (!isOtpComplete || loading) && styles.verifyDisabled,
          ]}
          onPress={handleVerify}
          disabled={!isOtpComplete || loading}
        >
          <Text style={styles.verifyText}>{loading ? "Please wait..." : "Verify"}</Text>
        </TouchableOpacity>
 
        <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0}>
          <Text
            style={[
              styles.resend,
              timer > 0 && { color: "#9CA3AF" },
            ]}
          >
            {timer > 0 ? `Resend OTP in ${timer} sec` : "Resend OTP"}
          </Text>
        </TouchableOpacity>
 
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },
 
  container: {
    flex: 1,
    padding: scale(24),
    alignItems: "center",
  },
 
  logo: {
    width: scale(130),
    height: scale(130),
    resizeMode: "contain",
    marginBottom: verticalScale(20),
  },
 
  title: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#397AE4",
    alignSelf: "flex-start",
    marginBottom: verticalScale(8),
  },
 
  subRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: verticalScale(24),
  },
 
  subText: {
    fontSize: scale(13),
    color: "#6B7280",
  },
 
  changeText: {
    fontSize: scale(13),
    color: "#2563EB",
    fontWeight: "600",
  },
 
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: verticalScale(16),
  },
 
  otpBox: {
    width: scale(48),
    height: verticalScale(56),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: "#D1D5DB",
    textAlign: "center",
    fontSize: scale(18),
  },
 
  otpFilled: {
    borderColor: "#2563EB",
  },
 
  error: {
    color: "#DC2626",
    fontSize: scale(13),
    marginBottom: verticalScale(10),
  },
 
  verifyBtn: {
    width: "100%",
    height: verticalScale(52),
    backgroundColor: "#397AE4",
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
 
  verifyDisabled: {
    backgroundColor: "#9CA3AF",
  },
 
  verifyText: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "600",
  },
 
  resend: {
    marginTop: verticalScale(18),
    color: "#2563EB",
    fontSize: scale(13),
  },
});
 