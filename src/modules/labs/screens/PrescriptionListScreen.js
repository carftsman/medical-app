import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute, useNavigation } from "@react-navigation/native";

const PrescriptionListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [uploads, setUploads] = useState(
    route?.params?.uploads || []
  );

  const [previewImage, setPreviewImage] = useState(null);

  /* ================= DELETE FULL UPLOAD ================= */

  const deleteUpload = (index) => {
    Alert.alert(
      "Delete Prescription",
      "Are you sure you want to delete this upload?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updated = [...uploads];
            updated.splice(index, 1);
            setUploads(updated);
          },
        },
      ]
    );
  };

  /* ================= DELETE SINGLE FILE ================= */

  const deleteFile = (uploadIndex, fileIndex) => {
    const updated = [...uploads];
    updated[uploadIndex].files.splice(fileIndex, 1);
    setUploads(updated);
  };

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " • " +
      d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  };

  /* ================= RENDER EACH UPLOAD ================= */

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>

      {/* LAB NAME + DELETE */}
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.labName}>{item.labName}</Text>

          <View style={styles.locationRow}>
            <MaterialIcons
              name="map-marker-outline"
              size={18}
              color="#056FD2"
            />
            <Text style={styles.locationText}>
              {item.location || "Location not available"}
            </Text>
          </View>

          <Text style={styles.dateText}>
            {item.uploadedAt
              ? formatDate(item.uploadedAt)
              : ""}
          </Text>
        </View>

        <TouchableOpacity onPress={() => deleteUpload(index)}>
          <MaterialIcons
            name="delete-outline"
            size={22}
            color="red"
          />
        </TouchableOpacity>
      </View>

      {/* STATUS */}
      <Text style={styles.status}>
        {item.files?.length || 0} file(s) •{" "}
        {item.status || "Prescription Sent"}
      </Text>

      {/* FILES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.files?.map((file, fileIndex) => {
          const isPDF =
            file?.type?.includes("pdf") ||
            file?.name?.toLowerCase()?.endsWith(".pdf");

          return (
            <View key={fileIndex} style={styles.fileWrapper}>
              {isPDF ? (
                <View style={styles.pdfBox}>
                  <MaterialIcons
                    name="file-pdf-box"
                    size={40}
                    color="#E53935"
                  />
                  <Text
                    numberOfLines={1}
                    style={styles.pdfName}
                  >
                    {file.name}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setPreviewImage(file.uri)
                  }
                >
                  <Image
                    source={{ uri: file.uri }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              )}

              {/* DELETE SINGLE FILE */}
              <TouchableOpacity
                style={styles.removeFile}
                onPress={() =>
                  deleteFile(index, fileIndex)
                }
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color="red"
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Prescription History
        </Text>

        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={uploads}
        keyExtractor={(item, index) =>
          index.toString()
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="file-document-outline"
              size={60}
              color="#ccc"
            />
            <Text style={styles.emptyText}>
              No prescriptions uploaded yet
            </Text>
          </View>
        }
      />

      {/* IMAGE PREVIEW MODAL */}
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

export default PrescriptionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  labName: {
    fontSize: 16,
    fontWeight: "700",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  locationText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#666",
  },

  dateText: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },

  status: {
    marginVertical: 8,
    color: "#0E9F6E",
    fontWeight: "600",
  },

  fileWrapper: {
    marginRight: 12,
    position: "relative",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },

  pdfBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#FDECEA",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },

  pdfName: {
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },

  removeFile: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#999",
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
