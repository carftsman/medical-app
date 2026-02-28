import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import cartBannerImg from '../../../../assets/cartBannerImg.png';
import cartBannerBg from '../../../../assets/cartBannerBg.png';

import { COLORS, SIZES, FONT } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import { labApi } from '../services/labApi';
import useAuth from '../../../hooks/useAuth';

const ReviewCart = ({ navigation }) => {
  const { user } = useAuth();

  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    fetchCart();
  }, [user?.id]);

  const fetchCart = async () => {
    try {
      const res = await labApi.getLabCartSummary(user?.id);
      setCartData(res.data);
    } catch (error) {
      console.log('Cart fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!cartData) {
    return (
      <View style={styles.loader}>
        <Text>No cart data found</Text>
      </View>
    );
  }

  const { address, billSummary } = cartData;

  const Row = ({ label, value, bold }) => (
    <View style={styles.row}>
      <Text style={[bold && styles.bold]}>{label}</Text>
      <Text style={[bold && styles.bold]}>₹{value}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={22} color={COLORS.black} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* PATIENT CARDS */}
        {cartData.packages.map(item => {
          const patient = item.patient;

          return (
            <View key={item.cartId} style={styles.patientCard}>
              {/* Patient Info */}
              <View style={styles.patientInfoRow}>
                <View style={styles.profileCircle}>
                  <AntDesign name="user" size={18} color={COLORS.white} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.patientName}>{patient?.fullName}</Text>

                  {patient?.gender && patient?.age && (
                    <Text style={styles.subText}>
                      {patient.gender}, {patient.age}
                    </Text>
                  )}

                  <Text style={styles.phoneText}>+91 {patient?.phone}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Package Row */}
              <View style={styles.testRow}>
                <View style={styles.testLeft}>
                  <Text style={styles.packageName}>{item.name}</Text>
                </View>

                <Text style={styles.price}>₹{item.price}/-</Text>
              </View>
            </View>
          );
        })}

        {/* ADDRESS */}
        {address && (
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{address.fullName}</Text>

            <Text style={styles.addressText}>
              {address.house}, {address.street},{'\n'}
              {address.landmark && `${address.landmark}, `}
              {address.city}, {address.state}, {address.pinCode}
            </Text>

            <Text style={styles.addressPhone}>+91 {address.mobile}</Text>
          </View>
        )}

        {/* BANNER */}
        <ImageBackground
          source={cartBannerBg}
          style={styles.savingsBanner}
          imageStyle={{ borderRadius: scale(14) }}
        >
          <Image source={cartBannerImg} style={styles.bannerIcon} />
        </ImageBackground>

        {/* BILL SUMMARY */}
        <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Bill Summary</Text>

          <Row label="Total MRP" value={billSummary.totalMRP} />

          <View style={styles.row}>
            <Text style={{ color: COLORS.green }}>Discount</Text>
            <Text style={{ color: COLORS.green }}>
              ₹{billSummary.totalMRP - billSummary.totalAmount}
            </Text>
          </View>

          <Row
            label="Home Collection Charges"
            value={billSummary.homeCollection}
          />
          <Row label="Booking Fees" value={billSummary.bookingFee} />
          <Row label="Platform Fees" value={billSummary.platformFee} />

          <View style={styles.divider} />

          <Row label="Total Amount" value={billSummary.totalAmount} bold />
        </View>
      </ScrollView>

      {/* PAY BUTTON */}
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() =>
          navigation.navigate('SelectSlot', {
            cartData,
            labId: cartData.lab.id,
            totalFee: billSummary.totalAmount,
          })
        }
      >
        <Text style={styles.payText}>Select Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewCart;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },

  /* ---------- HEADER ---------- */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.white,
  },

  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  /* ---------- SCROLL ---------- */

  scroll: {
    padding: scale(16),
    paddingBottom: verticalScale(120),
  },

  /* ---------- PATIENT CARD ---------- */

  patientCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: COLORS.blue,
  },

  patientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileCircle: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  patientName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  subText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: verticalScale(2),
  },

  phoneText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: verticalScale(2),
  },

  divider: {
    height: scale(2),
    backgroundColor: COLORS.lightGray,
    marginVertical: verticalScale(10),
  },

  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(6),
  },

  testLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  testIconBox: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(8),
    backgroundColor: COLORS.Iceblue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },

  packageName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.black,
    flex: 1,
  },

  price: {
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
    color: COLORS.green,
  },

  /* ---------- ADDRESS CARD ---------- */

  addressCard: {
    backgroundColor: COLORS.white,
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: COLORS.blue,
  },

  addressName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginBottom: verticalScale(6),
  },

  addressText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  addressPhone: {
    marginTop: verticalScale(6),
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: COLORS.black,
  },

  /* ---------- BANNER ---------- */

  savingsBanner: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: scale(14),
    overflow: 'hidden',
    marginBottom: verticalScale(20),
  },

  bannerIcon: {
    position: 'absolute',
    right: 0,
    width: '60%',
    height: '100%',
    resizeMode: 'contain',
  },

  /* ---------- BILL SUMMARY ---------- */

  billContainer: {
    backgroundColor: COLORS.white,
    padding: scale(14),
    borderRadius: scale(12),
  },

  billTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: verticalScale(10),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },

  bold: {
    fontFamily: FONT.bold,
  },

  /* ---------- PAY BUTTON ---------- */

  payBtn: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(16),
    right: scale(16),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: scale(30),
    alignItems: 'center',

    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  payText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
