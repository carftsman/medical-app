import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";
import Ionicons from "react-native-vector-icons/Ionicons";

const CartFooter = ({
  totalAmount = 0,
  billSummary,
  onSelectSlots,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Bill Summary</Text>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Total MRP</Text>
              <Text style={styles.billValue}>₹{billSummary?.totalMRP || 0}/-</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={[styles.billLabel, styles.green]}>
                Discount
              </Text>
              <Text style={[styles.billValue, styles.green]}>
                -₹{billSummary?.discount || 0}/-
              </Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>
                Home Collection Charges
              </Text>
              <Text style={styles.billValue}>₹{billSummary?.homeCollection || 0}/-</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Booking Fees</Text>
              <Text style={styles.billValue}>₹{billSummary?.bookingFee || 0}/-</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Fees</Text>
              <Text style={styles.billValue}>₹{billSummary?.platformFee || 0}/-</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>
                Additional Charges
              </Text>
              <Text style={styles.billValue}>₹{billSummary?.additionalCharges || 0}/-</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.billRow}>
              <Text style={styles.totalText}>Total Amount</Text>
              <Text style={styles.totalText}>₹{billSummary?.totalAmount || 0}/-</Text>
            </View>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.wrapper}>
        <View>
          <Text style={styles.amount}>₹{Number(totalAmount || 0).toFixed(2)}</Text>

          <TouchableOpacity
            style={styles.viewDetails}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.viewText}>View details</Text>
            <Ionicons
              name="chevron-up"
              size={16}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.slotButton}
          onPress={onSelectSlots}
        >
          <Text style={styles.slotText}>Select Slots</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CartFooter;


const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    padding: scale(14),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    fontSize: scale(18),
    fontWeight: "700",
    color: COLORS.blue,
  },

  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },

  viewText: {
    fontSize: scale(12),
    color: COLORS.gray,
    marginRight: scale(4),
  },

  slotButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(18),
    borderRadius: scale(10),
  },

  slotText: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: "600",
  },


  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: scale(20),
  },

  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    padding: scale(16),
  },

  modalTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    marginBottom: verticalScale(12),
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: verticalScale(6),
  },

  billLabel: {
    fontSize: scale(13),
    color: COLORS.gray,
  },

  billValue: {
    fontSize: scale(13),
    fontWeight: "500",
  },

  green: {
    color: COLORS.green,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: verticalScale(12),
  },

  totalText: {
    fontSize: scale(14),
    fontWeight: "700",
  },
});
