import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import api from '../../../api/client';
import { COLORS, FONT, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const ReviewCart = ({ navigation, route }) => {
  const bookingIds = route.params?.bookingIds;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (bookingIds && bookingIds.length > 0) {
      fetchSummary();
    } else {
      console.log("No bookingIds received");
      setLoading(false);
    }
  }, []);

  const fetchSummary = async () => {
  try {
    console.log("Sending bookingIds:", bookingIds);

    const res = await api.get('/labs/cart/summary', {
      params: {
        bookingIds: bookingIds.join(','), // fully dynamic
      },
    });

    console.log("Response:", res.data);

    setSummary(res.data);
  } catch (error) {
    console.log(
      "Cart fetch error:",
      error.response?.data || error.message
    );
  } finally {
    setLoading(false);
  }
};

  if (!summary) {
    return (
      <View style={styles.loader}>
        <Text>No cart data available</Text>
      </View>
    );
  }

  const { lab, tests, address, billSummary } = summary;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Lab Info */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: lab.imageUrl }} style={styles.labImage} />
            <View style={{ flex: 1, marginLeft: scale(10) }}>
              <Text style={styles.labName}>{lab.name}</Text>
              <Text style={styles.labAddress}>
                {lab.address}, {lab.city}
              </Text>
              <Text style={styles.labPhone}>{lab.phone}</Text>
            </View>
          </View>

          {/* Tests */}
          {tests.map(test => (
            <View key={test.id} style={styles.testRow}>
              <View>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.reportTime}>
                  Report in {test.reportTime}
                </Text>
              </View>
              <Text style={styles.testPrice}>
                ₹{test.price}/-
              </Text>
            </View>
          ))}
        </View>

        {/* Address */}
        <View style={styles.card}>
          <Text style={styles.addressName}>
            {address.fullName}
          </Text>
          <Text style={styles.addressText}>
            {address.house}, {address.street}
          </Text>
          <Text style={styles.addressText}>
            {address.city}, {address.state} - {address.pinCode}
          </Text>
          <Text style={styles.addressPhone}>
            {address.mobile}
          </Text>
        </View>

        {/* Bill Summary */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Bill Summary</Text>

          <View style={styles.billRow}>
            <Text>Total MRP</Text>
            <Text>₹{billSummary.totalMRP}/-</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={{ color: 'green' }}>Discount</Text>
            <Text style={{ color: 'green' }}>
              -₹{billSummary.discount}/-
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text>Home Collection Charges</Text>
            <Text>₹{billSummary.homeCollection}/-</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Booking Fees</Text>
            <Text>₹{billSummary.bookingFee}/-</Text>
          </View>

          <View style={styles.billRow}>
            <Text>Platform Fees</Text>
            <Text>₹{billSummary.platformFee}/-</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>
              ₹{billSummary.totalAmount}/-
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReviewCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: scale(16),
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: scale(14),
    borderRadius: scale(14),
    marginBottom: verticalScale(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(10),
  },
  labName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  labAddress: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  labPhone: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
  },
  testName: {
    fontSize: SIZES.medium,
  },
  reportTime: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  testPrice: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  addressName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  addressText: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: verticalScale(4),
  },
  addressPhone: {
    fontSize: SIZES.small,
    marginTop: verticalScale(4),
  },
  billCard: {
    backgroundColor: COLORS.white,
    padding: scale(14),
    borderRadius: scale(14),
    marginBottom: verticalScale(90),
  },
  billTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginBottom: verticalScale(10),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(4),
  },
  discountText: {
    color: 'green',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: verticalScale(8),
  },
  totalText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  payBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: scale(30),
    alignItems: 'center',
  },
  payText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
});
