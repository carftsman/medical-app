import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PrescriptionSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const uploadId = route?.params?.uploadId;
  const fileCount = route?.params?.fileCount;

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <View style={styles.iconWrapper}>
          <Ionicons
            name="checkmark-circle"
            size={90}
            color="#056FD2"
          />
        </View>

        <Text style={styles.title}>
          Uploaded Successfully 
        </Text>

        <Text style={styles.subText}>
          Your prescription has been securely sent to the lab.
        </Text>

        {uploadId && (
          <View style={styles.referenceBox}>
            <Text style={styles.referenceLabel}>
              Reference ID
            </Text>
            <Text style={styles.referenceValue}>
              {uploadId}
            </Text>
          </View>
        )}

        {fileCount && (
          <Text style={styles.fileCount}>
            {fileCount} file(s) uploaded
          </Text>
        )}

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            navigation.replace("PrescriptionTracking", {
              uploadId,
            })
          }
        >
          <Text style={styles.primaryText}>
            Track Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() =>
            navigation.replace("LabTabNavigation")
          }
        >
          <Text style={styles.secondaryText}>
            Back To Labs
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default PrescriptionSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    elevation: 4,
  },

  iconWrapper: {
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  subText: {
    marginTop: 8,
    color: "gray",
    textAlign: "center",
    fontSize: 14,
  },

  referenceBox: {
    marginTop: 20,
    backgroundColor: "#EAF4FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  referenceLabel: {
    fontSize: 12,
    color: "gray",
  },

  referenceValue: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    color: "#056FD2",
  },

  fileCount: {
    marginTop: 12,
    fontSize: 14,
    color: "#333",
  },

  primaryBtn: {
    backgroundColor: "#056FD2",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  secondaryBtn: {
    marginTop: 18,
  },

  secondaryText: {
    color: "#056FD2",
    fontWeight: "600",
    fontSize: 15,
  },
});
