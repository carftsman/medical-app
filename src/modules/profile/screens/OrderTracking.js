import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const STEPS = [
  { key: "MEDICINE_ORDERED", label: "Medicine Ordered", desc: "Your order has been placed successfully." },
  { key: "PICKED", label: "Picked the Order", desc: "Your order has been picked by delivery partner and will reach you soon." },
  { key: "ARRIVED", label: "Arrived", desc: "Your order has arrived to your location." },
  { key: "DELIVERED", label: "Delivered", desc: "Your order has delivered successfully." },
];

const OrderTrackingScreen = ({ route, navigation }) => {
  const { order } = route.params;

  const currentStepIndex = useMemo(() => {
    return STEPS.findIndex(step => step.key === order.status);
  }, [order.status]);

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Status</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isLast = index === STEPS.length - 1;

            return (
              <View key={step.key} style={styles.stepRow}>
                
                {/* Indicator */}
                <View style={styles.indicatorContainer}>
                  <View
                    style={[
                      styles.circle,
                      { backgroundColor: isActive ? "#2563EB" : "#D1D5DB" },
                    ]}
                  />
                  {!isLast && (
                    <View
                      style={[
                        styles.verticalLine,
                        { backgroundColor: isActive ? "#2563EB" : "#E5E7EB" },
                      ]}
                    />
                  )}
                </View>

                {/* Text */}
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.label}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Order Info */}
        <View style={styles.orderBox}>
          <Text style={styles.orderText}>Order ID: #{order.orderId}</Text>
          <Text style={styles.orderText}>Purchase Date: {order.purchaseDate}</Text>

          <Text style={styles.itemsTitle}>{order.items.length} Item(s)</Text>

          <FlatList
            data={order.items}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.itemImage} />
            )}
          />
        </View>

        {/* Payment Details */}
        <Text style={styles.paymentTitle}>Payment Details</Text>
        <View style={styles.paymentBox}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Total Price</Text>
            <Text style={styles.paymentValue}>₹{order.totalPrice}/-</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Amount Paid</Text>
            <Text style={styles.paymentValue}>₹{order.amountPaid}/-</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default OrderTrackingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  timelineContainer: {
    marginBottom: 25,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  indicatorContainer: {
    width: 30,
    alignItems: "center",
  },

  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  verticalLine: {
    width: 2,
    flex: 1,
    marginTop: 2,
  },

  stepContent: {
    flex: 1,
    paddingBottom: 25,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  stepDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  orderBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  orderText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },

  itemsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },

  itemImage: {
    width: 45,
    height: 45,
    marginRight: 10,
    resizeMode: "contain",
  },

  paymentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  paymentBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  paymentLabel: {
    fontSize: 14,
    color: "#374151",
  },

  paymentValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});