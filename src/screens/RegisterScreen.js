import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import { COLORS } from "../config/constants";

import api from "../api/client"
 

const RegisterScreen = ({ navigation }) => {
  const [fullname, setfullname]=useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get("/hospital/user/profile");
        if (res?.data) {
          setMobileNumber(res.data.mobileNumber || "");
          setEmail(res.data.email || "");
        }
      } catch (err) {
        console.log("Profile error:", err);
      }
    };

    getProfile();
  }, []);

  
  const validate = () => {
    let temp = {};

    if (!email.trim()) {
      temp.email = "Please enter email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      temp.email = "Invalid email address";
    }

    if (!mobileNumber.trim()) {
      temp.mobileNumber = "Please enter mobile number";
    } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
      temp.mobileNumber = "Invalid mobile number";
    }

    
    if (!bloodGroup.trim()) {
      temp.bloodGroup = "Please enter blood group";
    } else if (!/^(A|B|AB|O)[+-]$/.test(bloodGroup.toUpperCase())) {
      temp.bloodGroup = "Invalid blood group";
    }

    
    if (!password.trim()) {
      temp.password = "Please enter password";
    } else if (password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    if (!emergencyName.trim()) {
      temp.emergencyName = "Please enter emergency contact name";
    } else if (!/^[A-Za-z ]{3,}$/.test(emergencyName)) {
      temp.emergencyName = "Invalid emergency contact name";
    }

    
    if (!emergencyNumber.trim()) {
      temp.emergencyNumber = "Please enter emergency contact number";
    } else if (!/^[0-9]{10}$/.test(emergencyNumber)) {
      temp.emergencyNumber = "Invalid emergency contact number";
    }

   
    if (!agree) {
      temp.agree = "Please accept Terms & Conditions";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  
  const onRegister = async () => {
    if (!validate()) return;

    try {
      await api.post("/hospital/user/profile/complete", {
        email,
        mobileNumber,
        bloodGroup,
        emContactName,
        emContactNumber,
        fullName
      });

      Alert.alert(
        "Success",
        "Registered successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("HomeScreen"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.headerTitle}>Register</Text>
            <View style={{ width: 40 }} />
          </View>
          {/* Full Name */}
          
          <Label icon="person-outline" text="Full Name" />
          <InputField
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={setFullName}/>
          {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

           {/* EMAIL */}
          <Label icon="mail-outline" text="Email Address" />
          <InputField value={email} onChangeText={setEmail} />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          {/* MOBILE */}
          <Label icon="call-outline" text="Mobile Number" />
          <InputField value={mobileNumber} editable={false} />
          {errors.mobileNumber && (
            <Text style={styles.error}>{errors.mobileNumber}</Text>
          )}

          {/* BLOOD GROUP */}
          <Label icon="water-outline" text="Blood Group" />
          <InputField value={bloodGroup} onChangeText={setBloodGroup} />
          {errors.bloodGroup && (
            <Text style={styles.error}>{errors.bloodGroup}</Text>
          )}

          {/* PASSWORD */}
          <Label icon="lock-closed-outline" text="Password" />
          <InputField
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          {/* EMERGENCY NAME */}
          <Label icon="person-add-outline" text="Emergency Contact Name" />
          <InputField
            value={emergencyName}
            onChangeText={setEmergencyName}
          />
          {errors.emergencyName && (
            <Text style={styles.error}>{errors.emergencyName}</Text>
          )}

          {/* EMERGENCY NUMBER */}
          <Label icon="call-outline" text="Emergency Contact Number" />
          <InputField
            keyboardType="numeric"
            value={emergencyNumber}
            onChangeText={setEmergencyNumber}
          />
          {errors.emergencyNumber && (
            <Text style={styles.error}>{errors.emergencyNumber}</Text>
          )}

          {/* TERMS */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgree(!agree)}
          >
            <Ionicons
              name={agree ? "checkbox" : "square-outline"}
              size={22}
              color={agree ? COLORS.primary : "#9CA3AF"}
            />
            <Text style={styles.termsText}>
              I agree to Medidoc{" "}
              <Text style={styles.linkText}>
                Terms of Services & Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>
          {errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

          {/* REGISTER */}
          <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Label = ({ icon, text }) => (
  <View style={styles.labelRow}>
    <Ionicons name={icon} size={18} color="#6B7280" />
    <Text style={styles.label}>{text}</Text>
  </View>
);

export default RegisterScreen;

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  labelRow: { flexDirection: "row", marginLeft: 20, marginTop: 18 },
  label: { marginLeft: 8, fontSize: 14, fontWeight: "500" },
  error: { color: "red", fontSize: 12, marginLeft: 20, marginTop: 4 },
  termsRow: { flexDirection: "row", margin: 20 },
  termsText: { marginLeft: 10 },
  linkText: { color: COLORS.primary },
  registerBtn: {
    height: 56,
    backgroundColor: COLORS.primary,
    margin: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: { color: COLORS.white, fontSize: 16, fontWeight: "600" },
});
