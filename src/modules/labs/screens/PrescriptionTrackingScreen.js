import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Pdf from "react-native-pdf";
import PrescriptionTimeline from "../components/prescription/PrescriptionTimeline";
import { getUserPrescriptions } from "../services/prescriptionApi";

const PrescriptionTrackingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation(); 

  const groupId = route?.params?.groupId;
  const selectedLab = route?.params?.selectedLab;

  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewPDF, setPreviewPDF] = useState(null);

  /* FETCH  */
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getUserPrescriptions();
      let data = response?.data?.data || [];

      if (!Array.isArray(data)) data = [data];

      const filtered = groupId
        ? data.filter((item) => item.groupId === groupId)
        : data;

      setUploads(filtered);
    } catch (error) {
      console.log("Tracking Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  /*  OPEN FILE  */
  const openFile = (file) => {
    const url = file?.fileUrl;
    if (!url) return;

    const type = file?.fileType || "";

    if (type.includes("image")) {
      setPreviewImage(url);
      return;
    }

    if (type.includes("pdf")) {
      setPreviewPDF(url);
      return;
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#056FD2" />
      </View>
    );
  }

  if (!uploads.length) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No Prescription Found</Text>
      </View>
    );
  }

  const labName =
    uploads[0]?.lab?.name ||
    selectedLab?.name ||
    "Selected Lab";

  const labLocation =
    uploads[0]?.lab?.city ||
    selectedLab?.city ||
    "Location not available";

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.labName}>{labName}</Text>
        <Text style={styles.labLocation}>{labLocation}</Text>

        <PrescriptionTimeline files={uploads[0].files} />

        <Text style={styles.sectionTitle}>Uploaded Files</Text>

        {uploads.map((upload, index) =>
          upload.files?.map((file, i) => (
            <View key={`${index}-${i}`} style={styles.fileCard}>

              <TouchableOpacity onPress={() => openFile(file)}>
                {file.fileType?.includes("image") ? (
                  <Image
                    source={{ uri: file.fileUrl }}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.pdfBox}>
                    <Ionicons
                      name="document-text"
                      size={40}
                      color="#056FD2"
                    />
                  </View>
                )}
              </TouchableOpacity>

              <Text style={styles.fileName}>
                {file.fileUrl.split("/").pop()}
              </Text>

            </View>
          ))
        )}

      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("LabTabNavigation")}
        >
          <Ionicons name="home-outline" size={20} color="#FFFFFF" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
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

      {/* PDF MODAL */}
      <Modal visible={!!previewPDF} animationType="slide">
        <View style={styles.pdfModalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setPreviewPDF(null)}
          >
            <Ionicons name="close" size={26} color="#111827" />
          </TouchableOpacity>

          <Pdf
            source={{ uri: previewPDF }}
            style={styles.pdf}
            trustAllCerts={false}
          />
        </View>
      </Modal>

    </View>
  );
};

export default PrescriptionTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
  },

  labName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  labLocation: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginVertical: 15,
  },

  fileCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },

  pdfBox: {
    height: 170,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  fileName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },

  /* ✅ ADDED BUTTON STYLES */
  bottomContainer: {
    padding: 20,
    backgroundColor: "#F7F9FC",
  },

  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#056FD2",
    paddingVertical: 14,
    borderRadius: 14,
  },

  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },

  fullImage: {
    width: "95%",
    height: "80%",
    borderRadius: 14,
  },

  pdfModalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  pdf: {
    flex: 1,
    width: "100%",
  },

  closeBtn: {
    padding: 16,
    alignSelf: "flex-end",
  },
});