import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale,} from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";

import DeliveredOrder from "../components/OrderDetails-Delivered";
import PendingOrder from "../components/OrderDetails-Pending";
import CancelledOrder from "../components/OrderDetails-Cancelled";

const OrderDetailsScreen = ({ route }) => {
  const { order } = route.params || {};

  if (!order || !order.items) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No Order Data</Text>
      </View>
    );
  }

  switch (order.status) {
    case "Delivered":
      return <DeliveredOrder order={order} />;

    case "Pending":
      return <PendingOrder order={order} />;

    case "Cancelled":
      return <CancelledOrder order={order} />;

    default:
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Invalid Status</Text>
        </View>
      );
  }
};


export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  errorText: {
    fontSize: scale(14),
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
});
