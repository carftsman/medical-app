import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";


const CancelledOrder = ({ order }) => {
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

          <View style={styles.cancelledBadge}>
            <Text style={styles.badgeText}>Cancelled</Text>
          </View>
         
        </View>
      </View>

      {/* ===== Items Ordered ===== */}
      <Text style={styles.sectionTitle}>Items Ordered</Text>
      <Text style={styles.subText}>
        {order.items.length} items included in this
      </Text>

      {/* Images Row */}
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
      <View style={styles.tableContainer}>
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
      </View>
       <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.orderBtn}
              onPress={() => console.log("Reorder")}
            >
              <Text style={styles.orderText}>Order Again</Text>
            </TouchableOpacity>
          </View>

    </ScrollView>
  );
};

export default CancelledOrder;
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

  cancelledBadge: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
  },

  badgeText: {
    fontSize: scale(11),
    fontFamily: FONT.medium,
    color: COLORS.red,
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

  tableContainer: {
    borderWidth: 1,
    borderColor: "#8BB9F3",
    borderRadius: scale(10),
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D9EAFD",
    padding: scale(10),
  },

  tableHeadText: {
    fontSize: scale(12),
    fontFamily: FONT.semiBold,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scale(10),
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
  },

  tableText: {
    fontSize: scale(12),
    fontFamily: FONT.regular,
  },
  
  buttonRow: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.border,
    paddingTop: verticalScale(30),

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
});
