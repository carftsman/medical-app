import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PrimaryButton from "../components/PrimaryButton";
import { COLORS } from "../config/constants";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const validate = () => {
    let temp = {};
    let valid = true;

    if (!firstName) (temp.firstName = "Enter first name"), (valid = false);
    if (!lastName) (temp.lastName = "Enter last name"), (valid = false);
    if (!email.includes("@")) (temp.email = "Enter valid email"), (valid = false);
    if (mobile.length !== 10)
      (temp.mobile = "Enter valid 10-digit mobile"), (valid = false);
    if (!password) (temp.password = "Enter password"), (valid = false);
    if (password !== confirmPassword)
      (temp.confirmPassword = "Passwords do not match"), (valid = false);
    if (!termsAccepted) (temp.terms = "Please accept terms and conditions"), (valid = false);

    setErrors(temp);
    return valid;
  };

 {/*} const handleRegister = async () => {
    if (!validate()) return;

    try {
      await fetch(
        "https://hospital-backend-1-9jq0.onrender.com/api/hospital/user/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            mobile,
            password,
          }),
        }
      );

      setSuccessModal(true);
    } catch (err) {
      alert("Error: Something went wrong");
    }
  };
  */}

  const handleRegister = async () => {
  if (!validate()) return;

  try {
    const response = await fetch(
      "https://hospital-backend-1-9jq0.onrender.com/api/hospital/user/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: `+91${mobile}`,
          password,
          confirmPassword,
          termsAccepted,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    setSuccessModal(true);
  } catch (err) {
    alert("Network error");
  }
};

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Register</Text>

      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={22} color="#7D8A99" />
        <TextInput
  style={styles.input}
  placeholder="Enter First Name"
  placeholderTextColor="#7D8A99"
  value={firstName}
  onChangeText={setFirstName}
/>

      </View>
      {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={22} color="#7D8A99" />
        {/*<TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />*/}
        <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            placeholderTextColor="#7D8A99"
            value={lastName}
            onChangeText={setLastName}
        />

      </View>
      {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={22} color="#7D8A99" />
       <TextInput
  style={styles.input}
  placeholder="Enter your email"
  placeholderTextColor="#7D8A99"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>

      </View>
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <View style={styles.inputBox}>
        <Ionicons name="call-outline" size={22} color="#7D8A99" />
        <TextInput
  style={styles.input}
  placeholder="Enter Mobile Number"
  placeholderTextColor="#7D8A99"
  value={mobile}
  onChangeText={setMobile}
  keyboardType="number-pad"
  maxLength={10}
/>

      </View>
      {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={22} color="#7D8A99" />
       <TextInput
  style={styles.input}
  placeholder="Create New Password"
  placeholderTextColor="#7D8A99"
  secureTextEntry={!showPassword}
  value={password}
  onChangeText={setPassword}
/>

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#7D8A99"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={22} color="#7D8A99" />
        <TextInput
  style={styles.input}
  placeholder="Confirm Password"
  placeholderTextColor="#7D8A99"
  secureTextEntry={!showConfirmPassword}
  value={confirmPassword}
  onChangeText={setConfirmPassword}
/>

        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#7D8A99"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* Terms & Conditions */}
      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() => setTermsAccepted(!termsAccepted)}
      >
        <Ionicons
          name={termsAccepted ? "checkbox-outline" : "square-outline"}
          size={20}
          color={termsAccepted ? "green" : "red"}
        />
        {/*<Text style={styles.termsText}>
          I agree to the medidoc Terms of Service and Privacy Policy
        </Text>*/}
       <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, paddingRight: 20 }}>
  {/* Checkbox */}
  {/*<TouchableOpacity
    onPress={() => setIsChecked(!isChecked)}
    style={{
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: isChecked ? "#056FD2" : "red",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    }}
  >
    {isChecked && (
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: "#056FD2",
          borderRadius: 2,
        }}
      />
    )}
  </TouchableOpacity>*/}

  {/* Text */}
  <Text style={{ fontSize: 13, color: "#7D8A99", flexShrink: 1 }}>
    By continuing, you agree to our{" "}
    <Text
      style={{ color: "#056FD2", fontWeight: "800" }}
      onPress={() => navigation.navigate("TermsOfService")}
    >
      Terms of Service
    </Text>{" "}
    and{" "}
    <Text
      style={{ color: "#056FD2", fontWeight: "800" }}
      onPress={() => navigation.navigate("PrivacyPolicy")}
    >
      Privacy Policy
    </Text>.
  </Text>
</View>


      </TouchableOpacity>
      {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

      <PrimaryButton 
                //title={loading ? "Please wait..." : "Register"}

       title="Register"
      onPress={handleRegister} />

      <Modal transparent visible={successModal} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.circle}>
              <Ionicons name="checkmark" size={42} color="#1A73E8" />
            </View>

            <Text style={styles.successTitle}>Success</Text>

            <Text style={styles.successMsg}>
              Your account has been successfully registered
            </Text>

            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => {
                setSuccessModal(false);
                navigation.navigate("Bottom");
              }}
            >
              <Text style={styles.popupButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 70,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    //color: COLORS.black,
    textAlign: "center",
    marginBottom: 30,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFF",
    alignSelf: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
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
    marginLeft: "auto",
    marginRight: 30,
    marginBottom: 6,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "150",
  },

  popup: {
    width: 327,
    backgroundColor: "#FFF",
    paddingVertical: 35,
    paddingHorizontal: 25,
    borderRadius: 24,
    alignItems: "center",
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 18,
    color: "#000",
  },

  successMsg: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.gray,
    marginTop: 10,
    marginBottom: 22,
    width: 225,
  },

  popupButton: {
    width: 200,
    height: 48,
    backgroundColor: "#1A73E8",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  popupButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    marginLeft: 35,
  },

  termsText: {
    marginLeft: 8,
    color: COLORS.black,
    fontSize: 14,
  },
});

