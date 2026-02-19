import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PrescriptionTimeline from "../components/prescription/PrescriptionTimeline";

const PrescriptionTrackingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const uploadId = route?.params?.uploadId;
  const fileCount = route?.params?.fileCount;
  const labName = route?.params?.labName || "Selected Lab";
  const files = route?.params?.files || [];

  const [previewImage, setPreviewImage] = useState(null);

  const uploadData = {
    id: uploadId,
    labName,
    files,
    fileCount,
    status: "Prescription Sent",
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TIMELINE */}
        <PrescriptionTimeline />

        {/* DETAILS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Uploaded Prescription</Text>

          <View style={styles.row}>
            <Ionicons name="business-outline" size={16} color="#056FD2" />
            <Text style={styles.rowText}>{labName}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="document-text-outline" size={16} color="#056FD2" />
            <Text style={styles.rowText}>
              {fileCount} file(s) uploaded
            </Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="information-circle-outline" size={16} color="#056FD2" />
            <Text style={styles.rowText}>
              Status: Prescription Sent
            </Text>
          </View>

          {/* VIEW ALL BUTTON */}
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() =>
              navigation.navigate("PrescriptionList", {
                uploads: [uploadData],
              })
            }
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* FILE PREVIEW */}
        {files.length > 0 && (
          <View style={styles.previewSection}>
            <Text style={styles.previewTitle}>Uploaded Files</Text>

            {files.map((file, index) => {
              const isPDF =
                file?.type?.includes("pdf") ||
                file?.name?.toLowerCase()?.endsWith(".pdf");

              return (
                <View key={index} style={styles.fileCard}>
                  {isPDF ? (
                    <View style={styles.pdfBox}>
                      <Ionicons
                        name="document-text"
                        size={40}
                        color="#056FD2"
                      />
                      <Text style={styles.pdfName}>
                        {file.name}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setPreviewImage(file.uri)}
                    >
                      <Image
                        source={{ uri: file.uri }}
                        style={styles.image}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        )}

      </ScrollView>

      {/* BACK TO HOME */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("LabTabNavigation", {
            screen: "LabsHomeScreen",
            params: {
              newUpload: uploadData,
            },
          })
        }
      >
        <Text style={styles.btnText}>Back to Home</Text>
      </TouchableOpacity>

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
    </View>
  );
};

export default PrescriptionTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  rowText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },

  viewAllBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },

  viewAllText: {
    color: "#056FD2",
    fontWeight: "600",
  },

  previewSection: {
    marginTop: 25,
  },

  previewTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  fileCard: {
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
  },

  pdfBox: {
    height: 150,
    borderRadius: 16,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  pdfName: {
    marginTop: 10,
    fontWeight: "600",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#056FD2",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
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
