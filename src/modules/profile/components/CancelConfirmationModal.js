import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";

const CancelConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Are you sure, you want to cancel your order?
          </Text>

          <View style={styles.buttonRow}>
            {/* No Button */}
            <TouchableOpacity
              style={styles.noBtn}
              onPress={onCancel}
            >
              <Text style={styles.noText}>
                No, I don’t
              </Text>
            </TouchableOpacity>

            {/* Yes Button */}
            <TouchableOpacity
              style={styles.yesBtn}
              onPress={onConfirm}
            >
              <Text style={styles.yesText}>
                Yes, Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: COLORS.white,
    borderRadius: scale(15),
    padding: scale(20),
  },

  title: {
    fontSize: scale(15),
    fontFamily: FONT.medium,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: verticalScale(20),
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  noBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(12),
    borderRadius: scale(25),
    alignItems: "center",
    marginRight: scale(10),
  },

  noText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    fontSize: scale(13),
  },

  yesBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: verticalScale(12),
    borderRadius: scale(25),
    alignItems: "center",
  },

  yesText: {
    color: "red",
    fontFamily: FONT.semiBold,
    fontSize: scale(13),
  },
});