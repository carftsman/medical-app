import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PrescriptionSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const uploadId = route?.params?.uploadId ?? "#1234";
  const fileCount = route?.params?.fileCount ?? 1;
  const labName = route?.params?.labName ?? "Selected Lab";

  return (
    <SafeAreaView style={styles.container}>

      {/* TOP BLUE SECTION */}
      <View style={styles.blueSection}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={42} color="#056FD2" />
        </View>

        <Text style={styles.title}>
          Uploaded Successfully
        </Text>

        <Text style={styles.subtitle}>
          Your prescription was sent securely to{" "}
          <Text style={styles.boldText}>{labName}</Text>.
          {"\n"}
          Lab will contact you shortly.
        </Text>
      </View>

      {/* BOTTOM WHITE CARD */}
      <View style={styles.bottomCard}>

        <View style={styles.uploadBox}>
          <Text style={styles.uploadLabel}>Tracking ID</Text>
          <Text style={styles.uploadId}>
            {uploadId}
          </Text>
          <Text style={styles.docText}>
            {fileCount} Document{fileCount > 1 ? "s" : ""} uploaded
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            navigation.replace("PrescriptionTracking", {
              uploadId,
            })
          }
        >
          <Text style={styles.primaryText}>
            View Prescription Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() =>
            navigation.replace("LabTabNavigation")
          }
        >
          <Text style={styles.secondaryText}>
            Back to Home
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default PrescriptionSuccessScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#056FD2",
  },

  blueSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 20,
  },

  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    opacity: 0.95,
    lineHeight: 20,
  },

  boldText: {
    fontWeight: "600",
  },

  bottomCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },

  uploadBox: {
    backgroundColor: "#F2F8FF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
  },

  uploadLabel: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },

  uploadId: {
    fontSize: 18,
    fontWeight: "600",
    color: "#056FD2",
  },

  docText: {
    marginTop: 6,
    color: "#056FD2",
    fontSize: 13,
  },

  primaryBtn: {
    backgroundColor: "#056FD2",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  secondaryBtn: {
    alignItems: "center",
  },

  secondaryText: {
    color: "gray",
    fontSize: 15,
  },
});