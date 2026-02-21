import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale } from "../../../../utils/styling";

const UploadOptionsModal = ({
  visible,
  onClose,
  onCamera,
  onGallery,
  onPDF,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Upload Prescription from</Text>

          <View style={styles.row}>
            <Option icon="camera-outline" label="Camera" onPress={onCamera} />
            <Option icon="image-outline" label="Gallery" onPress={onGallery} />
            <Option icon="document-outline" label="PDF" onPress={onPDF} />
          </View>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Option = ({ icon, label, onPress }) => (
  <TouchableOpacity style={{ alignItems: "center" }} onPress={onPress}>
    <Ionicons name={icon} size={32} color="#056FD2" />
    <Text style={{ marginTop: 6 }}>{label}</Text>
  </TouchableOpacity>
);

export default UploadOptionsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: scale(24),
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  close: {
    marginTop: 24,
    textAlign: "center",
    color: "#056FD2",
    fontWeight: "600",
  },
});
