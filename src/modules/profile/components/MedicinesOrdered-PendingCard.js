import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";

const PendingOrderCard = ({ item, navigation }) => {
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
          style={styles.rateBtn}
          onPress={() =>
            navigation.navigate("OrderTracking", { order: item })
          }
        >
          <Text style={styles.rateText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.orderBtn}
          onPress={() => console.log("Cancel Order")}
        >
          <Text style={styles.orderText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PendingOrderCard;
const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    marginBottom: verticalScale(12), // spacing between cards
    elevation: 3,
  },

  cardContent: {
    padding: scale(15),
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

  pending: {
    backgroundColor: "#FFF3CD", // yellow
  },

  statusText: {
    fontSize: scale(11),
    fontFamily: FONT.semiBold,
    color: "#8A6D3B",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scale(12),
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },

  rateBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    alignItems: "center",
    marginRight: scale(8),
  },

  rateText: {
    fontSize: scale(12),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },

  orderBtn: {
    flex: 1,
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