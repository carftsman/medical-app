import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../../../api/client";

const ReviewPrescriptionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { files = [], lab } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const locationText =
    lab?.address ||
    lab?.location ||
    (lab?.city ? `${lab?.name}, ${lab?.city}` : "Location not available");

  /* Upload */

  const uploadPrescription = async () => {
    if (!files.length) {
      Alert.alert("Error", "No files selected");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file, index) => {
        if (!file?.uri) return;

        let mimeType = file.type;

        if (!mimeType) {
          const name = file.name?.toLowerCase() || "";

          if (name.endsWith(".pdf")) {
            mimeType = "application/pdf";
          } else if (name.endsWith(".png")) {
            mimeType = "image/png";
          } else if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
            mimeType = "image/jpeg";
          } else {
            mimeType = "application/octet-stream";
          }
        }

        formData.append("files", {
          uri:
            Platform.OS === "ios"
              ? file.uri.replace("file://", "")
              : file.uri,
          name:
            file.name ||
            `prescription_${Date.now()}_${index}.jpg`,
          type: mimeType,
        });
      });

      console.log("Sending FormData...");

      const response = await api.post(
        "/lab-prescriptions/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPLOAD SUCCESS:", response.data);

      const uploadId = response?.data?.data?.groupId;

      if (!uploadId) {
        throw new Error("Upload ID not returned from server");
      }

      navigation.replace("PrescriptionSuccess", {
        uploadId,
        fileCount: files.length,
        labName: lab?.name,
      });

    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      console.log("UPLOAD ERROR RESPONSE:", error?.response?.data);

      Alert.alert(
        "Upload Failed",
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review & Confirm</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* FILE PREVIEW */}
        {files.map((file, index) => {
          const isPDF =
            file?.type?.includes("pdf") ||
            file?.name?.toLowerCase()?.endsWith(".pdf");

          return (
            <View key={`${file?.uri}-${index}`} style={styles.fileWrapper}>
              {isPDF ? (
                <View style={styles.pdfCard}>
                  <Ionicons name="document-text" size={40} color="#056FD2" />
                  <Text style={styles.pdfName} numberOfLines={1}>
                    {file.name}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setPreviewImage(file.uri)}
                >
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.tapOverlay}>
                    <Ionicons name="search" size={14} color="#056FD2" />
                    <Text style={styles.tapText}>Tap to enlarge</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {/* LAB INFO */}
        {lab && (
          <View style={styles.labCard}>
            <View style={styles.labIcon}>
              <Ionicons name="flask-outline" size={24} color="#056FD2" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.labName}>{lab?.name}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="gray" />
                <Text style={styles.labAddress}>{locationText}</Text>
              </View>
            </View>
          </View>
        )}

        {/* SECURITY INFO */}
        <View style={styles.securityCard}>
          <Ionicons name="shield-checkmark-outline" size={18} color="#056FD2" />
          <Text style={styles.securityText}>
            Your prescription will be shared{" "}
            <Text style={styles.secureBold}>securely</Text> with the lab.
          </Text>
        </View>

      </ScrollView>

      {/* BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={uploadPrescription}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryText}>
              Confirm & Send to Lab
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changeBtn}
          onPress={() =>
            navigation.navigate("LabsScreen", { files })
          }
        >
          <Text style={styles.changeText}>Change Lab</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE MODAL */}
      <Modal visible={!!previewImage} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setPreviewImage(null)}
        >
          <Image
            source={{ uri: previewImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewPrescriptionScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  fileWrapper: {
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },
  tapOverlay: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
  },
  tapText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#056FD2",
  },
  pdfCard: {
    height: 160,
    borderRadius: 20,
    backgroundColor: "#F2F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  labCard: {
    flexDirection: "row",
    marginTop: 25,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    alignItems: "center",
    elevation: 2,
  },
  labIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  labName: {
    fontSize: 16,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  labAddress: {
    marginLeft: 6,
    color: "gray",
    fontSize: 13,
    flex: 1,
  },
  securityCard: {
    flexDirection: "row",
    backgroundColor: "#E8F2FF",
    padding: 15,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
  },
  securityText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 13,
    color: "#333",
  },
  secureBold: {
    color: "#056FD2",
    fontWeight: "600",
  },
  bottom: {
    padding: 20,
    backgroundColor: "#fff",
  },
  primaryBtn: {
    backgroundColor: "#056FD2",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  changeBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  changeText: {
    color: "gray",
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "95%",
    height: "80%",
  },
});