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

import InputField from "../components/InputField";
import { COLORS } from "../config/constants";
import useAuth from "../hooks/useAuth";
import { scale, verticalScale } from "../utils/styling";
import api from "../api/client";

const RegisterScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState(""); 
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState({});

  const { handleAuthState } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get("/hospital/user/profile");
        if (res?.data) {
          setMobileNumber(res.data.user.phone || "");
          setEmail(res.data.user.email || "");
        }
      } catch (err) {
        console.log("Profile error:", err);
      }
    };
    getProfile();
  }, []);

  const validate = () => {
    let temp = {};

    if (!fullname.trim()) temp.fullname = "Please enter full name";
    else if (!/^[A-Za-z ]{3,}$/.test(fullname))
      temp.fullname = "Invalid full name";

    if (!email.trim()) temp.email = "Please enter email address";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      temp.email = "Invalid email address";

    if (!mobileNumber.trim())
      temp.mobileNumber = "Please enter mobile number";
    else if (!/^[0-9]{10}$/.test(mobileNumber))
      temp.mobileNumber = "Invalid mobile number";

    if (!bloodGroup.trim())
      temp.bloodGroup = "Please enter blood group";
    else if (!/^(A|B|AB|O)(\+ve|-ve)$/i.test(bloodGroup))
      temp.bloodGroup = "Invalid blood group eg., A+ve, A-ve";
 
     if (!gender) temp.gender = "Please select gender";

    if (!emergencyName.trim())
      temp.emergencyName = "Please enter emergency contact name";
    else if (!/^[A-Za-z ]{3,}$/.test(emergencyName))
      temp.emergencyName = "Invalid emergency contact name";

    if (!emergencyNumber.trim())
      temp.emergencyNumber = "Please enter emergency contact number";
    else if (!/^[0-9]{10}$/.test(emergencyNumber))
      temp.emergencyNumber = "Invalid emergency contact number";

    if (!agree) temp.agree = "Please accept Terms & Conditions";

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
        gender,
        emContactName: emergencyName,
        emContactNumber: emergencyNumber,
        fullName: fullname,

      });

      handleAuthState(true);


    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white }}

    >
      {/* FIXED HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile Details</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >


        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: verticalScale(85),
            paddingBottom: verticalScale(30),
          }}
        >

          <View style={styles.container}>
            <Label icon="person-outline" text="Full Name" />
            <InputField value={fullname} onChangeText={setFullname} placeholder={"Enter your Full Name"} />
            {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

            <Label icon="mail-outline" text="Email Address" />
            <InputField value={email} onChangeText={setEmail} placeholder={"Enter your Email Address"} />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Label icon="call-outline" text="Mobile Number" />
            <InputField value={mobileNumber} placeholder={"Enter your Mobile Number"} editable={false} />

            <Label icon="water-outline" text="Blood Group" />
            <InputField value={bloodGroup} onChangeText={setBloodGroup} placeholder={"Ex: A+ve"} />
            {errors.bloodGroup && (
              <Text style={styles.error}>{errors.bloodGroup}</Text>
            )}
            <Label icon="male-female-outline" text="Gender" />

            <View style={styles.radioContainer}>
              {["male", "female", "other"].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.radioItem}
                  onPress={() => setGender(item)}
                >
                  <Ionicons
                    name={
                      gender === item
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color={gender === item ? COLORS.primary : "#9CA3AF"}
                  />
                  <Text style={styles.radioText}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {errors.gender && (
              <Text style={styles.error}>{errors.gender}</Text>
            )}

            <Label icon="person-add-outline" text="Emergency Contact Name" />
            <InputField
              value={emergencyName}
              onChangeText={setEmergencyName}
              placeholder={"Enter your Emergency Contact Name"}
            />
            {errors.emergencyName && (
              <Text style={styles.error}>{errors.emergencyName}</Text>
            )}

            <Label icon="call-outline" text="Emergency Contact Number" />
            <InputField
              keyboardType="numeric"
              value={emergencyNumber}
              onChangeText={setEmergencyNumber}
              placeholder={"Enter your Emergency Contact Number"}
            />
            {errors.emergencyNumber && (
              <Text style={styles.error}>{errors.emergencyNumber}</Text>
            )}


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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
          <Text style={styles.registerText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Label = ({ icon, text }) => (
  <View style={styles.labelRow}>
    <Ionicons name={icon} size={18} color="#6B7280" />
    <Text style={styles.label}>{text}</Text>
  </View>
);

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(80),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,

  },

  headerTitle: {
    fontSize: scale(18),
    paddingTop: 45,
    fontWeight: "600",
    color: "#111827",
  },

  labelRow: {
    flexDirection: "row",
    marginLeft: scale(20),
    marginTop: verticalScale(14),
  },

  label: {
    marginLeft: scale(8),
    fontSize: scale(14),
    fontWeight: "500",
  },

  error: {
    color: "red",
    fontSize: scale(12),
    marginLeft: scale(20),
    marginTop: verticalScale(2),
  },
radioContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: scale(20),
  marginTop: verticalScale(8),
},

radioItem: {
  flexDirection: "row",
  alignItems: "center",
},

radioText: {
  marginLeft: scale(6),
  fontSize: scale(14),
},

  termsRow: {
    flexDirection: "row",
    marginHorizontal: scale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(4),
  },

  termsText: {
    marginLeft: scale(10),
    fontSize: scale(14),
  },

  linkText: {
    color: COLORS.primary,
  },

  registerBtn: {
    height: verticalScale(56),
    backgroundColor: COLORS.primary,
    marginHorizontal: scale(20),
    marginTop: verticalScale(6),
    borderRadius: scale(12),
    justifyContent: "center",
    alignItems: "center",
  },

  fixedButtonContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: verticalScale(10),
  },

  registerText: {
    color: COLORS.white,
    fontSize: scale(16),
    fontWeight: "600",

  },
});
