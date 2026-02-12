import React, { useState, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { COLORS } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

import { api } from "../../../api/client";
import { labApi } from "../services/labApi";
import CartHeader from "../components/CartHeader";
import CartPatientCard from "../components/CartPatientCard";
import CartCouponBanner from "../components/CartCouponBanner";
import CartFooter from "../components/CartFooter";
import AddPatientModal from "../components/AddPatientModal";

const USER_ID = 21; // 🔥 Replace later with dynamic user

const LabsCartScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const discountAmount = 60;

  const [showAddPatient, setShowAddPatient] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [billSummary, setBillSummary] = useState(null);

  const USER_ID = 21;

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await labApi.getLabCart(USER_ID);

      setCartItems(response.data.items || []);
      setTotalAmount(response.data.billSummary?.totalAmount || 0);
      setUser(response.data.user);
      setBillSummary(response.data.billSummary);
    } catch (error) {
      console.log(
        "Cart error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };


  const handleRemove = async (cartItemId) => {
    try {
      console.log("Deleting item:", cartItemId);

      await labApi.deleteCartItem(cartItemId);

      fetchCart();

    } catch (error) {
      console.log(
        "Delete error:",
        error.response?.data || error.message
      );
    }
  };


  const handlePatientSubmit = (patient) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.labTestId === selectedTestId
          ? { ...item, patient }
          : item
      )
    );
  };

  const handleApplyCoupon = () => {
    setCouponApplied(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  if (!cartItems.length) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ marginHorizontal: scale(15), flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(120) }}
            ListHeaderComponent={<CartHeader />}
            renderItem={({ item }) => (
              <CartPatientCard
                patientName={item.patient?.fullName || user?.fullName || "Not Selected"}
                age={item.patient?.age || user?.age || ""}
                gender={item.patient?.gender || user?.gender || ""}
                testName={item.test?.name}
                price={`₹${item.test?.price * item.quantity}`}
                onDeletePress={() => handleRemove(item.id)}
                onAddPatient={() => {
                  setSelectedTestId(item.labTestId);
                  setShowAddPatient(true);
                }}
              />
            )}
            ListFooterComponent={
              <CartCouponBanner
                discountAmount={discountAmount}
                isApplied={couponApplied}
                onApply={handleApplyCoupon}
              />
            }
          />
        </View>

        <CartFooter
          totalAmount={totalAmount}
          billSummary={billSummary}
          // discount={couponApplied ? discountAmount : 0}
          onSelectSlots={() =>
            navigation.navigate("SelectSlot", {
              labId: 1,
            })
          }
        />
      </SafeAreaView>

      <AddPatientModal
        visible={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onSubmit={handlePatientSubmit}
      />
    </>
  );
};

export default LabsCartScreen;
