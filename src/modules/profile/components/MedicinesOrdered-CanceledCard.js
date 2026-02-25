import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";

const CancelledOrderCard = ({ item, navigation }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContent}>
        <View style={styles.rowBetween}>

          <Text style={styles.orderId}>Order ID: #{item.orderId}</Text>
          <View style={[styles.statusBadge, styles.cancelled]}>
            <Text style={styles.statusText}>Cancelled</Text>
          </View>
        </View>

        <Text style={styles.date}>
          Purchased Date: {item.orderedDate}
        </Text>
      </View>
        
<View style={styles.imageRow}>
  {item.items?.map((medicine) => (
    <Image
      key={medicine.id}
      source={medicine.image}
      style={styles.medicineImage}
    />
  ))}
</View>

<Text style={styles.itemCount}>
  {item.items.length} Item(s)
</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => console.log("Reorder")}
        >
          <Text style={styles.orderText}>Order Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CancelledOrderCard;
const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    marginBottom: verticalScale(12),   // 👈 spacing between cards
    elevation: 3,
    padding: scale(15),
  },

  cardContent: {
    marginBottom: verticalScale(10),
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
    marginTop: verticalScale(4),
  },

  statusBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
  },

  cancelled: {
    backgroundColor: "#F8D7DA", // light red
  },

  statusText: {
    fontSize: scale(11),
    fontFamily: FONT.semiBold,
    color: COLORS.black,
  },

  buttonRow: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: verticalScale(10),
  },

  orderBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    alignItems: "center",
  },

  orderText: {
    fontSize: scale(12),
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
  imageRow: {
  flexDirection: "row",
  marginTop: verticalScale(10),
},

medicineImage: {
  width: scale(50),
  height: scale(50),
  marginRight: scale(10),
  resizeMode: "contain",
},

itemCount: {
  fontSize: scale(12),
  fontFamily: FONT.medium,
  marginTop: verticalScale(6),
  color: COLORS.black,
},
});