import { React, useState} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";
import CancelConfirmationModal from "./CancelConfirmationModal";

const PendingOrderCard = ({ item, navigation }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("OrderDetails", { order: item })
        }
        style={styles.cardContent}
      >
        <View style={styles.rowBetween}>
          <Text style={styles.orderId}>Order ID: #{item.orderId}</Text>
          <View style={[styles.statusBadge, styles.pending]}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </View>

        <Text style={styles.date}>
          Purchased Date: {item.orderedDate}
        </Text>
      </TouchableOpacity>
<TouchableOpacity style={styles.imageRow} onPress={() =>
          navigation.navigate("OrderDetails", { order: item })
        }>
  {item.items?.map((medicine) => (
    <Image
      key={medicine.id}
      source={medicine.image}
      style={styles.medicineImage}
    />
  ))}
</TouchableOpacity>

<Text style={styles.itemCount}>
  {item.items.length} Item(s)
</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.rateBtn}
          onPress={() =>
            navigation.navigate("OrderTracking", { order: item })
          }
        >
          <Text style={styles.rateText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.cancelBtn}
  onPress={() => setShowCancelModal(true)}
>
  <Text style={styles.cancelText}>Cancel Order</Text>
</TouchableOpacity>
<CancelConfirmationModal
  visible={showCancelModal}
  onCancel={() => setShowCancelModal(false)}
  onConfirm={() => {
    setShowCancelModal(false);
    navigation.navigate("MedicinesCancelledSuccessScreen");
  }}
/>
      </View>
    </View>
  );
};
export default PendingOrderCard;
const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    marginBottom: verticalScale(14),
    elevation: 3,
    overflow: "hidden",
  },

  cardContent: {
    padding: scale(13),
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: {
    fontSize: scale(13),
    fontFamily: FONT.semiBold,
    color: COLORS.black,
  },

  date: {
    fontSize: scale(12),
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: verticalScale(6),
  },

  /* ---------- STATUS BADGE ---------- */
  statusBadge: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
    backgroundColor:COLORS.yellow,  },

  statusText: {
    fontSize: scale(11),
    fontFamily: FONT.semiBold,
    color: "#8A6D3B", // darker yellow text
  },

  /* ---------- IMAGES ---------- */
  imageRow: {
    flexDirection: "row",
    marginTop: verticalScale(-10),
    paddingHorizontal: scale(18),
  },

  medicineImage: {
    width: scale(55),
    height: scale(55),
    marginRight: scale(10),
    resizeMode: "contain",
  },

  itemCount: {
    fontSize: scale(12),
    fontFamily: FONT.medium,
    marginTop: verticalScale(8),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(10),
    color: COLORS.black,
  },

  /* ---------- BUTTON ROW ---------- */
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },

  /* Track Button */
  rateBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor:COLORS.primary,
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    alignItems: "center",
    marginRight: scale(10),
  },

  rateText: {
    fontSize: scale(12),
    fontFamily: FONT.medium,
    color: COLORS.white,
  },

  /* Cancel Button */
  cancelBtn: {
    flex: 1,
    borderWidth:1,
    borderBlockColor: COLORS.danger,
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    alignItems: "center",
  },

  cancelText: {
    fontSize: scale(12),
    fontFamily: FONT.semiBold,
    color: COLORS.danger,
  },
});