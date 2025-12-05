

import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, FONT, SIZES } from "../../config/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/BackButton";
import { sendOtp } from "../../services/authService";


const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);


const normalizePhone = (raw) => `+91${raw.replace(/\D/g, "")}`;


let debounceTimer = null;
const debounce = (fn, delay = 300) => {
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fn(...args), delay);
  };
};

export default function EnterMobileNumberScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const trimmed = useMemo(() => input.trim(), [input]);

  const validatedPhone = useMemo(() => {
    if (!isValidPhone(trimmed)) return null;
    return normalizePhone(trimmed);
  }, [trimmed]);

  const handleInputChange = useCallback(
    debounce((val) => setInput(val)),
    []
  );

  const handleSendOtp = useCallback(async () => {
    setError(null);

    if (!validatedPhone) {
      setError("Please enter a valid phone number");
      return;
    }

    if (loading) return;

    setLoading(true);
    const resp = await sendOtp(validatedPhone);
    setLoading(false);

    if (resp.success) {
      navigation.navigate("OTP", {
        phone: validatedPhone,
      });
    } else {
      setError(resp.message);
    }
  }, [validatedPhone, loading, navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.container}>
        
        <View style={styles.headerRow}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Login</Text>
        </View>

        <InputField
          placeholder="Enter your Phone Number"
          value={input}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          style={{ marginTop: 10, paddingLeft: 45 }}
        />

        
        <Ionicons
          name="call-outline"
          size={22}
          color={COLORS.gray}
          style={{
            position: "absolute",
            left: SIZES.large + 35,
            top: 115,
            zIndex: 20,
          }}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <PrimaryButton
          title={loading ? "Sending..." : "Login Using OTP"}
          onPress={handleSendOtp}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SIZES.large },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft: 90,
    fontWeight: "700",
  },
  error: { color: COLORS.danger, marginTop: 10, marginLeft: 10 },
});
