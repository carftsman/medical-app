import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { pick } from "@react-native-documents/picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const MAX_FILES = 5;

const UploadPrescriptionScreen = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  /*PERMISSION */

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  /* ADD FILE */

  const addFile = (file) => {
    if (files.length >= MAX_FILES) {
      Alert.alert("Maximum 5 files allowed");
      return;
    }
    setFiles((prev) => [...prev, file]);
  };

  /* CAMERA */

  const openCamera = async () => {
    setModalVisible(false);
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: "photo",
      quality: 0.8,
    });

    if (result.assets?.length > 0) addFile(result.assets[0]);
  };

  /* GALLERY  */

  const openGallery = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary({
      mediaType: "photo",
    });

    if (result.assets?.length > 0) addFile(result.assets[0]);
  };

  /* PDF  */

  const openPDF = async () => {
    setModalVisible(false);
    try {
      const results = await pick({ type: ["application/pdf"] });
      const file = results[0];
      addFile({
        uri: file.uri,
        name: file.name,
        type: file.type || "application/pdf",
      });
    } catch {}
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const clearAll = () => setFiles([]);

  const uploadFiles = () => {
    if (files.length === 0) {
      Alert.alert("Please upload at least one file");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setUploadSuccess(true);
      setFiles([]);
    }, 1500);
  };

  /* SKELETON  */

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.skeletonBox} />
        <View style={styles.skeletonLine} />
        <View style={styles.skeletonLineSmall} />
        <Text style={styles.loadingText}>Uploading...</Text>
      </View>
    );
  }

  /* SUCCESS */

  if (uploadSuccess) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={110} color="#056FD2" />
        <Text style={styles.successTitle}>Uploaded Successfully</Text>
        <Text style={styles.successSub}>
          Our team will contact you once the process is completed.
        </Text>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => navigation.navigate("LabTabNavigation")}
        >
          <Text style={styles.uploadBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LabTabNavigation")}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Prescription</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {files.length === 0 ? (
          <>
            <TouchableOpacity
              style={styles.uploadBoxHighlight}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="cloud-upload-outline" size={50} color="#056FD2" />
              <Text style={styles.uploadTitle}>Upload Prescription</Text>
              <Text style={styles.uploadSub}>
                Click here to upload your prescription
              </Text>
            </TouchableOpacity>

            <View style={styles.guidelinesCard}>
              <Text style={styles.guidelineTitle}>Guidelines to follow</Text>
              {[
                "Ensure image is clear and readable",
                "Upload full prescription in one frame",
                "Doctor name & tests must be visible",
                "Supported formats: JPG, PNG, PDF",
                "Maximum 5 files allowed",
              ].map((item, index) => (
                <View key={index} style={styles.guidelineRow}>
                  <Ionicons name="checkmark-circle" size={16} color="#056FD2" />
                  <Text style={styles.guidelineText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            {files.map((file, index) => (
              <View key={index} style={styles.previewContainer}>
                {file.type?.includes("pdf") ? (
                  <View style={styles.pdfCard}>
                    <Ionicons
                      name="document-text-outline"
                      size={50}
                      color="#056FD2"
                    />
                    <Text>{file.name}</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.imagePreview}
                  />
                )}

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFile(index)}
                >
                  <Ionicons name="close-circle" size={28} color="red" />
                </TouchableOpacity>
              </View>
            ))}

            {files.length < MAX_FILES && (
              <TouchableOpacity
                style={styles.addMoreBtn}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="add-circle" size={24} color="#056FD2" />
                <Text style={{ color: "#056FD2", marginLeft: 6 }}>
                  Add More
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.uploadBtn} onPress={uploadFiles}>
                <Text style={styles.uploadBtnText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Upload Prescription from
            </Text>

            <View style={styles.modalRowCenter}>
              <TouchableOpacity onPress={openCamera}>
                <Ionicons name="camera-outline" size={35} />
                <Text style={styles.modalText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openGallery}>
                <Ionicons name="image-outline" size={35} />
                <Text style={styles.modalText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openPDF}>
                <Ionicons name="document-outline" size={35} />
                <Text style={styles.modalText}>PDF</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadPrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#ffffff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120, 
  },

  uploadBoxHighlight: {
    borderWidth: 2,
    borderColor: "#056FD2",
    borderStyle: "dashed",
    paddingVertical: 70,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#F2F8FF",
  },

  uploadTitle: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },

  uploadSub: {
    color: "gray",
    fontSize: 13,
    marginTop: 6,
  },
  previewContainer: {
    marginBottom: 30,
  },

  imagePreview: {
    width: "100%",
    height: 420,
    borderRadius: 26,
  },

  pdfCard: {
    height: 320,
    borderRadius: 26,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  removeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
  },

addMoreBtn: {
  borderWidth: 2,
  borderColor: "#056FD2",
  borderStyle: "dashed",
  paddingVertical: 45,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 35,
  backgroundColor: "#F2F8FF",
},

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },

  clearBtn: {
    width: "40%",
    paddingVertical: 18,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "red",
    alignItems: "center",
  },

  clearText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },

  uploadBtn: {
    width: "55%",
    backgroundColor: "#056FD2",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  uploadBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  guidelinesCard: {
    backgroundColor: "#F2F8FF",
    padding: 24,
    borderRadius: 24,
    marginTop: 15,
  },

  guidelineTitle: {
    fontWeight: "bold",
    marginBottom: 18,
    fontSize: 15,
    color: "#000",
  },

  guidelineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  guidelineText: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: "#333",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 40,
  },

  skeletonBox: {
    width: "92%",
    height: 250,
    backgroundColor: "#E6ECF2",
    borderRadius: 30,
    marginBottom: 30,
  },

  skeletonLine: {
    width: "70%",
    height: 24,
    backgroundColor: "#E6ECF2",
    borderRadius: 16,
    marginBottom: 16,
  },

  skeletonLineSmall: {
    width: "50%",
    height: 20,
    backgroundColor: "#E6ECF2",
    borderRadius: 16,
  },

  loadingText: {
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 16,
    color: "#056FD2",
  },

  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#ffffff",
  },

  successTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000",
  },

  successSub: {
    textAlign: "center",
    marginVertical: 15,
    color: "gray",
    fontSize: 15,
  },

  /*  MODAL  */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "88%",
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 28,
  },

  modalTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 17,
  },

  modalRowCenter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  modalText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
  },

  closeBtn: {
    alignItems: "center",
    marginTop: 30,
  },

  closeText: {
    color: "#3d7ff0",
    fontWeight: "bold",
  },
});
