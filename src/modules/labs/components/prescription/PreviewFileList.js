import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../../utils/styling";

const MAX_FILES = 5;

const formatFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024)
    return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const PreviewFileList = ({
  files = [],
  onRemove,
  onUploadMore,
  showUploadMore = true,
}) => {
  return (
    <View>
      {files?.map((file, index) => {
        const isPDF =
          file?.type?.includes("pdf") ||
          file?.name?.toLowerCase()?.endsWith(".pdf");

        return (
          <View key={`${file?.uri}-${index}`} style={styles.container}>
            {isPDF ? (
              <View style={styles.pdfCard}>
                <Ionicons
                  name="document-text"
                  size={scale(50)}
                  color="#056FD2"
                />
                <Text style={styles.fileName} numberOfLines={1}>
                  {file?.name}
                </Text>
                <Text style={styles.fileSize}>
                  {formatFileSize(file?.fileSize)}
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: file?.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => onRemove && onRemove(index)}
            >
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      })}

      {showUploadMore && files.length < MAX_FILES && (
        <TouchableOpacity
          style={styles.uploadBox}
          activeOpacity={0.8}
          onPress={onUploadMore}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={scale(40)}
            color="#056FD2"
          />
          <Text style={styles.uploadTitle}>
            Upload More Prescription
          </Text>
          <Text style={styles.uploadSubtitle}>
            JPG, PNG, PDF • Max {MAX_FILES} files
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PreviewFileList;

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(28),
  },

  image: {
    width: "100%",
    height: verticalScale(420),
    borderRadius: scale(26),
  },

  pdfCard: {
    height: verticalScale(300),
    borderRadius: scale(26),
    backgroundColor: "#F2F8FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },

  fileName: {
    marginTop: verticalScale(12),
    fontSize: scale(14),
    fontWeight: "600",
  },

  fileSize: {
    marginTop: verticalScale(6),
    fontSize: scale(12),
    color: "gray",
  },

  removeBtn: {
    position: "absolute",
    top: scale(16),
    right: scale(16),
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#056FD2",
    borderRadius: scale(24),
    paddingVertical: verticalScale(30),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    backgroundColor: "#F9FBFF",
  },

  uploadTitle: {
    marginTop: verticalScale(14),
    fontSize: scale(15),
    fontWeight: "600",
    color: "#056FD2",
  },

  uploadSubtitle: {
    marginTop: verticalScale(6),
    fontSize: scale(12),
    color: "gray",
  },
});
