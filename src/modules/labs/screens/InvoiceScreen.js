import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Share
} from "react-native";
import { labApi } from "../services/labApi";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const InvoiceScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const bookingIds = route?.params?.bookingIds ?? 21;

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const res = await labApi.getLabInvoice(bookingIds);
      setInvoice(res.data.invoice);
    } catch (error) {
      console.log(
        "Invoice Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      if (!invoice) return;

      const message = `
      Invoice ID: ${invoice.invoiceId}
      Lab: ${invoice.lab?.name}
      Date: ${invoice.slot?.date}
      Time: ${invoice.slot?.time}
      Amount Paid: ₹${invoice.payment?.total}

      ${invoice.pdfUrl ? `Download Invoice: ${invoice.pdfUrl}` : ""}
      `;

      await Share.share({ message });
    } catch (error) {
      console.log("Share Error:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDownload = async () => {
    try {
      if (!invoice?.pdfUrl) {
        Alert.alert("Error", "Invoice PDF not available");
        return;
      }
      await Linking.openURL(invoice.pdfUrl);
    } catch (error) {
      Alert.alert("Error", "Unable to open invoice");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (!invoice) {
    return (
      <View style={styles.loader}>
        <Text>No Invoice Found</Text>
      </View>
    );
  }

  const { lab, patient, test, slot, payment } = invoice;

  return (


    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>

      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Invoice Details</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Status */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Icon name="checkmark" size={18} color="#fff" />
          </View>
          <View>
            <Text style={styles.successText}>
              {payment.paid ? "Payment Successful" : "Payment Pending"}
            </Text>
            <Text style={styles.invoiceId}>
              ID: {invoice.invoiceId}
            </Text>
          </View>
        </View>

        {/* Lab Card */}
        <View style={styles.card}>
          <View style={styles.labHeaderRow}>
            <View style={styles.labLeft}>
              <View style={styles.iconCircle}>
                <Icon name="flask-outline" size={20} color="#1976D2" />
              </View>

              <View style={{ marginLeft: 14 }}>
                <Text style={styles.labName}>{lab.name}</Text>
                <Text style={styles.labSub}>
                  {lab.address}
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.orderLabel}>ORDER DATE</Text>
              <Text style={styles.orderDate}>
                {formatDate(invoice.generatedAt)}
              </Text>
            </View>
          </View>

          <View style={styles.scheduleBox}>
            <View style={styles.scheduleLeft}>
              <View style={styles.scheduleIconWrapper}>
                <Icon
                  name="calendar-outline"
                  size={20}
                  color="#1E88E5"
                />
              </View>

              <View style={styles.scheduleTextWrapper}>
                <Text style={styles.scheduleLabel}>
                  SCHEDULED{"\n"}APPOINTMENT
                </Text>
                <Text style={styles.scheduleDate}>
                  {slot.date}
                </Text>
              </View>
            </View>

            <View style={styles.scheduleRight}>
              <Text style={styles.scheduleLabel}>
                TIME {"\n"}SLOT
              </Text>
              <Text style={styles.scheduleTime}>
                {slot.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Test Details */}
        <View style={styles.card}>
          <View style={styles.testsHeader}>
            <Text style={styles.sectionTitle}>
              TESTS BOOKED (1 TEST)
            </Text>

            <View style={styles.homeVisitBadge}>
              <Icon name="home-outline" size={14} color="black" />
              <Text style={styles.homeVisitText}>Home Visit</Text>
            </View>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.testName}>
              {test.packageName}
            </Text>
            <Text style={styles.price}>
              ₹{test.price}
            </Text>
          </View>

          <Text style={styles.bookedFor}>
            Booked for: {patient.name}
          </Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>₹{payment.subtotal}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={{ color: "green" }}>Discount</Text>
            <Text style={{ color: "green" }}>
              - ₹{payment.discount}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.totalText}>
              Total Amount Paid
            </Text>
            <Text style={styles.totalAmount}>
              ₹{payment.total}
            </Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Icon
            name="information-circle-outline"
            size={18}
            color="#1976D2"
          />
          <Text style={styles.infoText}>
            Samples will be collected from your address on the scheduled date.
            Digital reports will be available within 24 hours of collection.
          </Text>
        </View>

        {/* Download Button */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={handleDownload}
        >
          <Icon name="download-outline" size={18} color="#fff" />
          <Text style={styles.downloadText}>
            Download Invoice PDF
          </Text>
        </TouchableOpacity>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
          >
            <Icon name="share-social-outline" size={18} color="#1976D2" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="headset-outline" size={18} color="#1976D2" />
            <Text style={styles.actionText}>Need Help</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
  },

  backButton: {
    position: "absolute",
    left: 16,
    height: 60,
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },

  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4EA",
    padding: 18,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10
  },

  successIcon: {
    backgroundColor: "#4CAF50",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  successText: {
    fontWeight: "600",
    color: "#2E7D32",
    fontSize: 16,
  },

  invoiceId: {
    fontSize: 12,
    color: "#555",
  },
  testsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  homeVisitBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },

  homeVisitText: {
    fontSize: 11,
    marginLeft: 4,
    color: "Black",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    elevation: 2,
  },

  labHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  labLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DCEBFA",
    justifyContent: "center",
    alignItems: "center",
  },

  labName: {
    fontSize: 16,
    fontWeight: "600",
  },

  labSub: {
    fontSize: 12,
    color: "#777",
  },

  orderLabel: {
    fontSize: 10,
    color: "#999",
    textAlign: "right",
    marginTop: 10
  },

  orderDate: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },

  scheduleBox: {
    marginTop: 12,
    backgroundColor: "#EAF2FB",
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  scheduleLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },

  scheduleRight: {
    alignItems: "flex-end",

  },

  scheduleIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D6E8FA",
    justifyContent: "center",
    alignItems: "center",
  },

  scheduleTextWrapper: {
    marginLeft: 14,
  },

  scheduleLabel: {
    fontSize: 11,
    color: "#8A8A8A",
    lineHeight: 15,
  },

  scheduleDate: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },

  scheduleTime: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E88E5",
    marginTop: 10,
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  testName: {
    fontSize: 14,
  },

  price: {
    fontWeight: "600",
  },

  bookedFor: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },

  totalText: {
    fontWeight: "700",
  },

  totalAmount: {
    fontWeight: "700",
    fontSize: 17,
    color: "#1E88E5",
  },

  downloadBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1669C1",
    paddingVertical: 18,
    borderRadius: 20,
    marginBottom: 10,
  },

  downloadText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 15,
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a9c9f6",
    paddingVertical: 14,
    flex: 0.48,
    borderRadius: 18,
  },

  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#090a0a",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EAF2FB",
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 5
  },

  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#4A5568",
    lineHeight: 18,
  },
});