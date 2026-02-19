import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { pick } from "@react-native-documents/picker";

import UploadBox from "../components/prescription/UploadBox";
import UploadOptionsModal from "../components/prescription/UploadOptionsModal";
import GuidelinesCard from "../components/prescription/GuidelinesCard";
import PreviewFileList from "../components/prescription/PreviewFileList";

const MAX_FILES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;

const UploadPrescriptionScreen = () => {
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const addFile = (file) => {
    if (files.length >= MAX_FILES) {
      Alert.alert("Maximum 5 files allowed");
      return;
    }

    const isPDF =
      file.type?.includes("pdf") ||
      file.name?.toLowerCase().endsWith(".pdf");

    if (!isPDF && file.fileSize > MAX_IMAGE_SIZE) {
      Alert.alert("Image must be below 5MB");
      return;
    }

    if (isPDF && file.fileSize > MAX_PDF_SIZE) {
      Alert.alert("PDF must be below 10MB");
      return;
    }

    const formatted = {
      uri: file.uri,
      name: file.fileName || file.name || `file_${Date.now()}`,
      type: file.type || "image/jpeg",
      fileSize: file.fileSize,
    };

    setFiles((prev) => [...prev, formatted]);
  };

  const openCamera = async () => {
    setModalVisible(false);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert("Camera permission denied");
      return;
    }

    const result = await launchCamera({ mediaType: "photo" });
    if (result?.assets?.length) {
      addFile(result.assets[0]);
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary({ mediaType: "photo" });
    if (result?.assets?.length) {
      addFile(result.assets[0]);
    }
  };

  const openPDF = async () => {
    setModalVisible(false);
    try {
      const result = await pick({ type: ["application/pdf"] });
      const file = result[0];

      addFile({
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
        fileSize: file.size,
      });
    } catch (err) {
      if (!err?.message?.includes("cancel")) {
        Alert.alert("PDF selection failed");
      }
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const goToPreview = () => {
    if (files.length === 0) {
      Alert.alert("Please upload at least one file");
      return;
    }

    navigation.navigate("PrescriptionPreview", { files });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* ✅ ONLY THIS LINE CHANGED */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LabTabNavigation")
          }
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Upload Prescription</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {files.length === 0 ? (
          <>
            <UploadBox onPress={() => setModalVisible(true)} />
            <GuidelinesCard />
          </>
        ) : (
          <>
            <PreviewFileList
              files={files}
              onRemove={removeFile}
              onUploadMore={() => setModalVisible(true)}
              showUploadMore={true}
            />

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={goToPreview}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <UploadOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCamera={openCamera}
        onGallery={openGallery}
        onPDF={openPDF}
      />
    </View>
  );
};

export default UploadPrescriptionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },

  continueBtn: {
    marginTop: 30,
    backgroundColor: "#056FD2",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
