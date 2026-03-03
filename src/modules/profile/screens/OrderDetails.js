import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, FONT } from "../../../config/constants";
import BackButton from "../../../components/BackButton";

import DeliveredOrder from "../components/OrderDetails-Delivered";
import PendingOrder from "../components/OrderDetails-Pending";
import CancelledOrder from "../components/OrderDetails-Cancelled";

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params || {};

  let Content = null;

  if (!order || !order.items) {
    Content = (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No Order Data</Text>
      </View>
    );
  } else {
    switch (order.status) {
      case "Delivered":
        Content = <DeliveredOrder order={order} />;
        break;

      case "Pending":
        Content = <PendingOrder order={order} />;
        break;

      case "Cancelled":
        Content = <CancelledOrder order={order} />;
        break;

      default:
        Content = (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Invalid Status</Text>
          </View>
        );
    }
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.headerTitle}>
          Order Details
        </Text>

        <View style={styles.rightSpace} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {Content}
      </View>

    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: COLORS.background,
},

header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: scale(10),
  paddingTop: verticalScale(10),
  paddingBottom: verticalScale(10),
  paddingLeft:scale(-10),
},

headerTitle: {
  flex: 1,
  textAlign: "center",
  fontSize: scale(16),
  fontFamily: FONT.bold,
  color: COLORS.black,
  marginTop:scale(10),
},

rightSpace: {
  width: scale(32),
},

content: {
  flex: 1,
  paddingHorizontal: scale(15),
},

centerContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},

errorText: {
  fontSize: scale(14),
  fontFamily: FONT.medium,
  color: COLORS.gray,
},
})