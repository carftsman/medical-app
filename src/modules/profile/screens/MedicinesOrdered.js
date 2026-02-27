import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";
import BackButton from "../../../components/BackButton";
import DeliveredOrderCard from "../components/MedicinesOrdered-DeliveredCard";
import PendingOrderCard from "../components/MedicinesOrdered-PendingCard";
import CancelledOrderCard from "../components/MedicinesOrdered-CanceledCard";

const medicine1 = require("../../../../assets/Medicines/medicen1.jpg");
const medicine2 = require("../../../../assets/Medicines/medicen2.jpg");
const medicine3 = require("../../../../assets/Medicines/medicen3.jpg");
const medicine4 = require("../../../../assets/Medicines/medicen4.jpg");

const ORDERS_DATA = [
  // ================= EXISTING =================
  {
    id: "1",
    orderId: "1234576336",
    orderedDate: "20-01-2026",
    status: "Delivered",
    status: "PICKED", // MEDICINE_ORDERED | PICKED | ARRIVED | DELIVERED
    items: [
      { id: "m1", name: "Nocold Tab 10s", quantity: 2, price: 10, image: medicine1 },
      { id: "m2", name: "Paracetamol", quantity: 1, price: 10, image: medicine2 },
    ],
  },
  {
    id: "2",
    orderId: "1234576337",
    orderedDate: "18-01-2026",
    status: "Delivered",
    items: [
      { id: "m3", name: "Vitamin C", quantity: 1, price: 20, image: medicine3 },
      { id: "m4", name: "Cough Syrup", quantity: 1, price: 50, image: medicine4 },
    ],
  },

  // ================= 5 DELIVERED =================
  {
    id: "3",
    orderId: "1234576338",
    orderedDate: "15-01-2026",
    status: "Delivered",
    items: [
      { id: "m5", name: "Zinc Tablets", quantity: 1, price: 30, image: medicine1 },
      { id: "m6", name: "Pain Relief Spray", quantity: 1, price: 80, image: medicine2 },
    ],
  },
  {
    id: "4",
    orderId: "1234576339",
    orderedDate: "14-01-2026",
    status: "Delivered",
    items: [
      { id: "m7", name: "Antibiotic 250mg", quantity: 2, price: 60, image: medicine3 },
    ],
  },
  {
    id: "5",
    orderId: "1234576340",
    orderedDate: "12-01-2026",
    status: "Delivered",
    items: [
      { id: "m8", name: "Calcium Tablets", quantity: 1, price: 45, image: medicine4 },
    ],
  },
  {
    id: "6",
    orderId: "1234576341",
    orderedDate: "10-01-2026",
    status: "Delivered",
    items: [
      { id: "m9", name: "ORS Sachets", quantity: 3, price: 15, image: medicine1 },
    ],
  },
  {
    id: "7",
    orderId: "1234576342",
    orderedDate: "08-01-2026",
    status: "Delivered",
    items: [
      { id: "m10", name: "Allergy Tablets", quantity: 1, price: 25, image: medicine2 },
    ],
  },

  // ================= 5 PENDING =================
  {
    id: "8",
    orderId: "1234576343",
    orderedDate: "19-02-2026",
    status: "Pending",
    items: [
      { id: "m11", name: "Iron Tablets", quantity: 1, price: 35, image: medicine3 },
    ],
  },
  {
    id: "9",
    orderId: "1234576344",
    orderedDate: "18-02-2026",
    status: "Pending",
    items: [
      { id: "m12", name: "BP Monitor Kit", quantity: 1, price: 1200, image: medicine4 },
    ],
  },
  {
    id: "10",
    orderId: "1234576345",
    orderedDate: "17-02-2026",
    status: "Pending",
    items: [
      { id: "m13", name: "Thermometer", quantity: 1, price: 150, image: medicine1 },
    ],
  },
  {
    id: "11",
    orderId: "1234576346",
    orderedDate: "16-02-2026",
    status: "Pending",
    items: [
      { id: "m14", name: "Hand Sanitizer", quantity: 2, price: 60, image: medicine2 },
    ],
  },
  {
    id: "12",
    orderId: "1234576347",
    orderedDate: "15-02-2026",
    status: "Pending",
    items: [
      { id: "m15", name: "Face Masks (Pack)", quantity: 1, price: 100, image: medicine3 },
    ],
  },

  // ================= 5 CANCELLED =================
  {
    id: "13",
    orderId: "1234576348",
    orderedDate: "14-02-2026",
    status: "Cancelled",
    items: [
      { id: "m16", name: "Protein Powder", quantity: 1, price: 1500, image: medicine4 },
    ],
  },
  {
    id: "14",
    orderId: "1234576349",
    orderedDate: "13-02-2026",
    status: "Cancelled",
    items: [
      { id: "m17", name: "Glucose Powder", quantity: 1, price: 200, image: medicine1 },
    ],
  },
  {
    id: "15",
    orderId: "1234576350",
    orderedDate: "12-02-2026",
    status: "Cancelled",
    items: [
      { id: "m18", name: "Digestive Syrup", quantity: 1, price: 90, image: medicine2 },
    ],
  },
  {
    id: "16",
    orderId: "1234576351",
    orderedDate: "11-02-2026",
    status: "Cancelled",
    items: [
      { id: "m19", name: "Eye Drops", quantity: 2, price: 70, image: medicine3 },
    ],
  },
  {
    id: "17",
    orderId: "1234576352",
    orderedDate: "10-02-2026",
    status: "Cancelled",
    items: [
      { id: "m20", name: "Cold Relief Syrup", quantity: 1, price: 110, image: medicine4 },
    ],
  },
];

const MedicinesOrdered = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("Delivered");
  const [searchText, setSearchText] = useState("");

  const filteredOrders = ORDERS_DATA.filter(
    (order) =>
      order.status === selectedTab &&
      order.orderId.includes(searchText)
  );

  const renderItem = ({ item }) => {
    if (item.status === "Delivered") {
      return <DeliveredOrderCard item={item} navigation={navigation} />;
    }
    if (item.status === "Pending") {
      return <PendingOrderCard item={item} navigation={navigation} />;
    }
    if (item.status === "Cancelled") {
      return <CancelledOrderCard item={item} navigation={navigation} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
       {/* Header */}
    <View style={styles.header}>
      <BackButton onPress={() => navigation.goBack()} />

      <Text style={styles.headerTitle}>
        Medicines Ordered
      </Text>

      <View style={styles.rightSpace} />
    </View>
      <TextInput
        placeholder="Search by order ID"
        placeholderTextColor={COLORS.gray}
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Delivered", "Pending", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders */}
      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(30) }}
      />
      
    </View>
  );
};

export default MedicinesOrdered;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(10),
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: verticalScale(15),

  marginHorizontal: scale(-15),   
  paddingHorizontal: scale(1),   
},

headerTitle: {
  flex: 1,
  textAlign: "center",
  fontSize: scale(16),
  fontFamily: FONT.bold,
  color: COLORS.black,
  marginBottom:scale(-10),
},

rightSpace: {
  width: scale(32), // same width as back button
},
  

  searchInput: {
    backgroundColor: COLORS.white,
    padding: scale(12),
    borderRadius: scale(10),
    marginBottom: verticalScale(15),
    fontSize: scale(14),
    fontFamily: FONT.medium,
  },

  tabContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(15),
  },

  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },

  activeTab: {
    borderBottomWidth: scale(2),
    borderBottomColor: COLORS.primary,
  },

  tabText: {
    fontSize: scale(14),
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },

  activeTabText: {
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
});