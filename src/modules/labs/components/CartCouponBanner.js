import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS } from "../../../config/constants";

const CartCouponBanner = ({
  discountAmount,
  isApplied,
  onApply,
  onViewCoupons,
}) => {
  return (
    <View style={styles.wrapper}>
      
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../../../assets/LabsCartBanner.png")}
          style={styles.bannerImage}
        />
      </View>

      <View style={{ height: verticalScale(12) }} />

      <View style={styles.couponContainer}>
        <View style={styles.couponTopRow}>
          <Text style={styles.discountText}>
            {isApplied
              ? `₹${discountAmount} coupon applied`
              : `Save ₹${discountAmount} on this order`}
          </Text>

          {!isApplied && (
            <TouchableOpacity onPress={onApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.divider} />

        <TouchableOpacity onPress={onViewCoupons}>
          <Text style={styles.viewAll}>View all coupons</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default CartCouponBanner;


const styles = StyleSheet.create({
  wrapper: {
    marginVertical: verticalScale(16),
  },

  bannerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: scale(18),
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: verticalScale(120),
    resizeMode: "cover",
  },

  couponContainer: {
    backgroundColor: "#D1FFD6",
    borderRadius: scale(16),
    paddingVertical: verticalScale(10),
  },

  couponTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(14),
  },

  discountText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#0F5132",
  },

  applyText: {
    fontSize: scale(14),
    fontWeight: "700",
    color: COLORS.primary,
  },

  divider: {
    height: 0.5,
    backgroundColor: COLORS.black,
    marginVertical: verticalScale(8),
    marginHorizontal: scale(10),
  },

  viewAll: {
    textAlign: "center",
    paddingVertical: verticalScale(8),
    color: COLORS.primary,
    fontWeight: "600",
  },
});
