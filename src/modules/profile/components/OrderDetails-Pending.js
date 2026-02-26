import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";
import { useNavigation } from "@react-navigation/native";

const PendingOrder = ({ order }) => {
  const navigation = useNavigation();
  const total = order.items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <ScrollView style={styles.container}>
      
      {/* ===== Order Info ===== */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.orderId}>
              Order ID: #{order.orderId}
            </Text>
            <Text style={styles.date}>
              Purchased Date: {order.orderedDate}
            </Text>
          </View>

          <View style={styles.pendingBadge}>
            <Text style={styles.badgeText}>Pending</Text>
          </View>
        </View>
      </View>

      {/* ===== Items Ordered ===== */}
      <Text style={styles.sectionTitle}>Items Ordered</Text>
      <Text style={styles.subText}>
        {order.items.length} items included in this
      </Text>

      <View style={styles.imageRow}>
        {order.items.map((item) => (
          <Image
            key={item.id}
            source={item.image}
            style={styles.medicineImage}
          />
        ))}
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeadText}>Item Name</Text>
        <Text style={styles.tableHeadText}>Quantity</Text>
        <Text style={styles.tableHeadText}>Price</Text>
      </View>

      {/* Table Rows */}
      {order.items.map((item) => (
     <View key={item.id} style={styles.tableRow}>
       
       <Text style={[styles.tableText, { flex: 2 }]}>
         {item.name}
       </Text>
   
       <Text style={[styles.tableText, { flex: 1, textAlign: "center" }]}>
         {item.quantity}
       </Text>
   
       <Text style={[styles.tableText, { flex: 1, textAlign: "right" }]}>
         ₹{item.price}/-
       </Text>
   
     </View>
   ))}

      {/* ===== Payment Details ===== */}
      <Text style={styles.sectionTitle}>Payment Details</Text>

      <View style={styles.paymentCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.tableText}>Total Price</Text>
          <Text style={styles.tableText}>₹{total}/-</Text>
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.tableText}>Amount Paid</Text>
          <Text style={styles.tableText}>₹{total}/-</Text>
        </View>
      </View>

      {/* ===== Rate Experience ===== */}
      <TouchableOpacity style={styles.rateBtn} onPress={() => navigation.navigate("MedicinesFeedbackScreen")}>
        <View style={styles.rowBetween}>
          <Text style={styles.rateText}>Rate Experience</Text>
          <Text style={{ fontSize: scale(16) }}>›</Text>
        </View>
      </TouchableOpacity>

      {/* ===== Bottom Buttons ===== */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackBtn}onPress={() =>
        navigation.navigate("OrderTracking", {
        order: order, 
        })
        }>
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default PendingOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: scale(15),
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  card: {
    backgroundColor: COLORS.white,
    padding: scale(15),
    borderRadius: scale(12),
    marginBottom: verticalScale(15),
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

  pendingBadge: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
  },

  badgeText: {
    fontSize: scale(11),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },

  sectionTitle: {
    fontSize: scale(14),
    fontFamily: FONT.semiBold,
    marginTop: verticalScale(10),
  },

  subText: {
    fontSize: scale(12),
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginBottom: verticalScale(10),
  },

  imageRow: {
    flexDirection: "row",
    marginBottom: verticalScale(10),
  },

  medicineImage: {
    width: scale(45),
    height: scale(45),
    marginRight: scale(10),
    resizeMode: "contain",
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E8F1FB",
    padding: scale(10),
    borderRadius: scale(8),
  },

  tableHeadText: {
    fontSize: scale(12),
    fontFamily: FONT.semiBold,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },

  tableText: {
    fontSize: scale(12),
    fontFamily: FONT.regular,
  },
  tableHeader: {
  flexDirection: "row",
  backgroundColor: "#E8F1FB",
  padding: scale(10),
  borderRadius: scale(8),
},

tableRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: verticalScale(8),
  borderBottomWidth: 0.5,
  borderBottomColor: COLORS.border,
},

tableText: {
  fontSize: scale(12),
  fontFamily: FONT.regular,
},

tableHeadText: {
  fontSize: scale(12),
  fontFamily: FONT.semiBold,
},

  paymentCard: {
    backgroundColor: COLORS.white,
    padding: scale(15),
    borderRadius: scale(12),
    marginVertical: verticalScale(10),
  },

  rateBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: scale(14),
    borderRadius: scale(10),
    marginBottom: verticalScale(15),
  },

  rateText: {
    fontSize: scale(13),
    fontFamily: FONT.medium,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.red,
    padding: scale(14),
    borderRadius: scale(10),
    alignItems: "center",
    marginRight: scale(10),
  },

  cancelText: {
    color: COLORS.red,
    fontFamily: FONT.semiBold,
    fontSize: scale(13),
  },

  trackBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: scale(14),
    borderRadius: scale(10),
    alignItems: "center",
  },

  trackText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    fontSize: scale(13),
  },
});
