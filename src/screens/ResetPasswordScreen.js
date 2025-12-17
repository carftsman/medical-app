// src/screens/ForgotPassword/ResetPasswordScreen.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import PrimaryButton from "../components/PrimaryButton";
import AuthService from "../services/auth";
import { COLORS, SIZES } from "../config/constants";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function ResetPasswordScreen({ route, navigation }) {
  const { resetToken = null } = route.params || {};  // ONLY REAL TOKEN NOW

  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordTrim = password.trim();
  const confirmTrim = confirmPwd.trim();

  const passwordValid = useMemo(() => PASSWORD_REGEX.test(passwordTrim), [passwordTrim]);
  const passwordsMatch = useMemo(() => passwordTrim && passwordTrim === confirmTrim, [passwordTrim, confirmTrim]);

  const canSubmit = useMemo(
    () => passwordValid && passwordsMatch && !!resetToken && !loading,
    [passwordValid, passwordsMatch, resetToken, loading]
  );

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!resetToken) {
      return Alert.alert("Error", "Missing reset token. Please verify OTP again.");
    }
    if (!passwordValid) {
      return Alert.alert(
        "Validation",
        "Password must include uppercase, lowercase, number and be at least 8 characters."
      );
    }
    if (!passwordsMatch) {
      return Alert.alert("Validation", "Passwords do not match.");
    }

    setLoading(true);

    const res = await AuthService.resetPassword({
      resetToken,
      newPassword: passwordTrim,
      confirmPassword: confirmTrim,
    });

    setLoading(false);

    if (!res.ok) {
      return Alert.alert("Error", res.message || "Unable to reset password.");
    }

    Alert.alert("Success", "Password reset successful!", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      {/*  INPUT: New Password */}
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#9AA4B2" />

        <TextInput
          style={styles.input}
          placeholder="Enter New Password"
          placeholderTextColor="#9AA4B2"
          secureTextEntry={!showPwd}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
          <Ionicons
            name={showPwd ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {!passwordValid && password ? (
        <Text style={styles.error}>
          Password must include uppercase, lowercase, number and 8+ characters.
        </Text>
      ) : null}

      {/* INPUT: Confirm Password  */}
      <View style={[styles.inputBox, { marginTop: 12 }]}>
        <Ionicons name="lock-closed-outline" size={20} color="#9AA4B2" />

        <TextInput
          style={styles.input}
          placeholder="Re-enter Password"
          placeholderTextColor="#9AA4B2"
          secureTextEntry={!showConfirm}
          value={confirmPwd}
          onChangeText={setConfirmPwd}
        />

        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Ionicons
            name={showConfirm ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {!passwordsMatch && confirmPwd ? (
        <Text style={styles.error}>Passwords do not match</Text>
      ) : null}

      {/* SUBMIT BUTTON */}
      <View style={{ marginTop: 26 }}>
        <PrimaryButton
          title={loading ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          disabled={!canSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", paddingTop: 60 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  backBtn: { padding: 8 },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: SIZES.xLarge ,
    fontWeight: "600",
    color: COLORS.black,
    marginRight: 26,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFF",
    alignSelf: "center",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#000",
  },

  error: {
    width: 330,
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 8,
    alignSelf: "center",
  },
});


