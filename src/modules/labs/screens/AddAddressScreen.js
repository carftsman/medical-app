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

import { useFocusEffect } from "@react-navigation/native";
import { labApi } from "../services/labApi";

const AddAddressScreen = ({ navigation, route }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await labApi.getAddresses(USER_ID);

      console.log("ADDRESS RESPONSE", JSON.stringify(res.data, null, 2));

      const apiData = res.data || {};

      // combine default + saved into single array
      const list = [
        ...(apiData.defaultAddress ? [apiData.defaultAddress] : []),
        ...(apiData.savedAddresses || []),
      ];

      setAddresses(list);

      if (list.length > 0) {
        setSelectedAddressId(list[0].id);
      }

    } catch (e) {
      console.log("Address fetch error", e?.response?.data || e);
    } finally {
      setLoading(false);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const USER_ID = 4; // later take from redux/auth

  const handleAddAddress = async (newAddress) => {
    try {
      const res = await labApi.createAddress({
        userId: USER_ID,
        fullName: newAddress.name,
        mobile: newAddress.mobile,
        house: newAddress.house,
        street: newAddress.street,
        landmark: newAddress.landmark,
        city: newAddress.city,
        state: newAddress.state,
        pinCode: newAddress.pincode,
      });

      await fetchAddresses();

      // select last inserted (usually newest)
      if (res?.data?.data?.id) {
        setSelectedAddressId(res.data.data.id);
      }

      return true;
    } catch (e) {
      console.log("Add address error", e?.response?.data || e);
      return false;
    }
  };




  const handleDelete = async (id) => {
    try {
      await labApi.deleteAddress(id);
      fetchAddresses(); // refresh
    } catch (e) {
      console.log("Delete failed", e);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading addresses...</Text>
      </View>
    );
  }

  const selectedAddress = addresses.find?.(a => a.id === selectedAddressId);


  return (
    <View style={styles.container}>
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
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = Number(item.id) === Number(selectedAddressId);

          return (
            <TouchableOpacity
              style={[
                styles.card,
                isSelected && styles.cardActive,
              ]}
              onPress={() => setSelectedAddressId(Number(item.id))}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.fullName}</Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                >
                  <Feather name="trash-2" size={18} color="red" />
                </TouchableOpacity>

              </View>

              <Text style={styles.address}>
                {item.house}, {item.street}, {item.landmark ? item.landmark + ", " : ""}
                {item.city}, {item.state} - {item.pinCode}
              </Text>
              <Text style={styles.phone}>{item.mobile}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity style={styles.confirmButton}
        onPress={() => {
          if (!selectedAddress) return;
          navigation.navigate("LabCheckout", { address: selectedAddress });
        }}
      >
        <Text style={styles.confirmText}>Confirm Address</Text>
      </TouchableOpacity>

      <AddAddressModal
        visible={showAddAddress}
        onClose={() => setShowAddAddress(false)}
        onSubmit={handleAddAddress}
      />
    </View>
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
