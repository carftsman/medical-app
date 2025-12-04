import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const whiteAlert = (msg) => {
    setAlertMsg(msg);
    setShowAlert(true);
  };

  const handleLogin = async () => {
    let errorMessage = null;

    if (!email.trim()) {
      errorMessage = "Please enter email";
    } else if (!validateEmail(email)) {
      errorMessage = "Please enter valid email";
    } else if (!password.trim()) {
      errorMessage = "Please enter password";
    }

    if (errorMessage) {
      whiteAlert(errorMessage);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://692d1754e5f67cd80a4a112d.mockapi.io/api/medical/login"
      );
      const data = await res.json();

      const user = data.find(
        (item) =>
          item.email.toLowerCase() === email.toLowerCase() &&
          item.password === password
      );

      setLoading(false);

      if (!user) {
        whiteAlert("Invalid email or password");
        return;
      }

      setSuccessModal(true);
    } catch (err) {
      setLoading(false);
      whiteAlert("Network error, please try again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        {/* EMAIL */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={22} color="#7D8A99" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email/Phone Number"
            placeholderTextColor="#7D8A99"
            value={email}
            onChangeText={setEmail}
          />
          {validateEmail(email) && (
            <Ionicons name="checkmark" size={22} color="#056FD2" />
          )}
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={22} color="#7D8A99" />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
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

        {/* FORGOT PASSWORD */}
        <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 30 }}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* LOGIN BUTTON */}
        <PrimaryButton
          title={loading ? "Please wait..." : "Login"}
          onPress={!loading ? handleLogin : () => {}}
        />

        {/* OTP BUTTON */}
        <PrimaryButton title="Login Using OTP" onPress={() => {}} />

        {/* REGISTER */}
        <View style={styles.footer}>
          <Text style={styles.footerTxt}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.register}> Register</Text>
          </TouchableOpacity>
        </View>

        {/* WHITE ALERT POPUP (FIXED COLOR) */}
        <Modal visible={showAlert} transparent animationType="fade">
          <View style={styles.alertOverlay}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>Login Failed</Text>
              <Text style={styles.alertMsg}>{alertMsg}</Text>

              <TouchableOpacity
                style={styles.alertBtn}
                onPress={() => setShowAlert(false)}
              >
                <Text style={styles.alertBtnTxt}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* SUCCESS MODAL */}
        <Modal visible={successModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.whiteCard}>
              <View style={styles.tickCircle}>
                <Ionicons name="checkmark" size={46} color="#056FD2" />
              </View>

              <Text style={styles.successTitle}>Yeay! Welcome Back</Text>
              <Text style={styles.successMsg}>
                You logged in successfully 😊
              </Text>

              <TouchableOpacity
                style={styles.successBtn}
                onPress={() => setSuccessModal(false)}
              >
                <Text style={styles.successBtnTxt}>Go to home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 70 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFF",
    alignSelf: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
  },

  forgot: {
    color: "#056FD2",
    fontSize: 13,
    marginBottom: 20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  footerTxt: { fontSize: 14, color: "#777" },

  register: {
    fontSize: 14,
    fontWeight: "600",
    color: "#056FD2",
  },

 

  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: 350,
    height: 200,
    backgroundColor: "#FFF",  
    borderRadius: 4,
    paddingVertical: 22,
    paddingHorizontal: 20,
  },

  alertTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#000",             
    marginBottom: 15,
  },

  alertMsg: {
    fontSize: 18,
    color: "#000",           
    marginBottom: 17,
  },

  alertBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 18,
    paddingVertical: 40,
  },

  alertBtnTxt: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0EA5E9",          // teal OK color like screenshot
  },

  /* SUCCESS MODAL (unchanged) */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
    alignItems: "center",
  },

  whiteCard: {
    width: 300,
    backgroundColor: "#FFF",
    borderRadius: 24,
    paddingVertical: 32,
    alignItems: "center",
  },

  tickCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  successTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  successMsg: {
    textAlign: "center",
    fontSize: 14,
    color: "#7D8A99",
    marginBottom: 28,
  },

  successBtn: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#056FD2",
    justifyContent: "center",
    alignItems: "center",
  },

  successBtnTxt: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
