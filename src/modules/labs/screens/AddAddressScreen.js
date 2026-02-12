import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";
import AddAddressModal from "../components/AddAddressModal";

const ADDRESSES = [
  {
    id: "1",
    name: "Vicky",
    address:
      "Madhapur Metro Station, Road Number 23, Aditya Enclave, Madhapur, Hyderabad, Telangana, India",
    phone: "+91 83839 38338",
  },
  {
    id: "2",
    name: "Vignesh",
    address:
      "Madhapur (near PNB), NH 215 By Pass, Keonjhar, Odisha, India",
    phone: "+91 83839 38338",
  },
  {
    id: "3",
    name: "Laddu",
    address:
      "Madhapur Metro Station, CBI Colony, Jubilee Hills, Hyderabad, Telangana, India",
    phone: "+91 83839 38338",
  },
];

const AddAddressScreen = ({ navigation, route }) => {
  const [selectedAddressId, setSelectedAddressId] = useState("1");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([])


  const handleAddAddress = (newAddress) => {
  setAddresses(prev => [
    {
      id: Date.now().toString(),
      ...newAddress,
    },
    ...prev,
  ]);
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Addresses</Text>

        <TouchableOpacity onPress={() => setShowAddAddress(true)} >
          <Text style={styles.addText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ADDRESSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedAddressId;

          return (
            <TouchableOpacity
              style={[
                styles.card,
                isSelected && styles.cardActive,
              ]}
              onPress={() => setSelectedAddressId(item.id)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Feather
                  name="edit-2"
                  size={16}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm Address</Text>
      </TouchableOpacity>

      <AddAddressModal
        visible={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        onSubmit={(address) => {
          console.log("New address:", address);
        }}
      />

      <AddAddressModal
        visible={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        onSubmit={handleAddAddress}
      />


    </SafeAreaView>
  );
};

export default AddAddressScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: scale(16),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },

  headerTitle: {
    fontSize: scale(16),
    fontWeight: "600",
  },

  addText: {
    color: COLORS.blue,
    fontSize: scale(14),
    fontWeight: "600",
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: verticalScale(12),
  },

  cardActive: {
    borderColor: COLORS.blue,
    backgroundColor: "#F0F7FF",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(6),
  },

  name: {
    fontSize: scale(14),
    fontWeight: "600",
  },

  address: {
    fontSize: scale(12),
    color: COLORS.gray,
    marginBottom: verticalScale(4),
  },

  phone: {
    fontSize: scale(12),
    color: COLORS.gray,
  },

  confirmButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(14),
    borderRadius: scale(10),
    alignItems: "center",
    marginTop: "auto",
  },

  confirmText: {
    color: COLORS.white,
    fontSize: scale(14),
    fontWeight: "600",
  },

  addressCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: verticalScale(12),
    backgroundColor: COLORS.white,
  },

  name: {
    fontSize: scale(14),
    fontWeight: "600",
    marginBottom: verticalScale(4),
  },

  addressText: {
    fontSize: scale(12),
    color: COLORS.gray,
  },

  mobile: {
    fontSize: scale(12),
    marginTop: verticalScale(4),
  },

});
