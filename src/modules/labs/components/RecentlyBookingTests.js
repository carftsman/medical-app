import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import api from "../../../api/client";
import { scale, verticalScale } from "../../../utils/styling";

const SKELETON_COUNT = 4;
const CARD_WIDTH = scale(260);

const RecentlyBookingTests = () => {

  const userId = useSelector(state => state.auth?.user?.id);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPastBookings = async () => {

    try {

      setLoading(true);

      const response = await api.get("/labs/bookings/past", {
        params: { userId },
      });

      const bookingsData = response?.data?.bookings || [];

      setBookings(bookingsData);

    } catch (error) {

      console.log(
        "Past Booking Error:",
        error?.response?.data || error.message
      );

      setBookings([]);

    } finally {

      setLoading(false);

    }

  };

  useFocusEffect(
    useCallback(() => {

      if (userId) {
        fetchPastBookings();
      }

    }, [userId])
  );

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Recently Booking Tests
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >

        {loading ? (

          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <View
              key={index}
              style={[styles.card, styles.skeletonCard]}
            >
              <View style={styles.skeletonIcon} />

              <View style={styles.skeletonTextContainer}>
                <View style={styles.skeletonLineShort} />
                <View style={styles.skeletonLineLong} />
              </View>
            </View>
          ))

        ) : bookings.length === 0 ? (

          <Text style={styles.noDataText}>
            No past bookings found
          </Text>

        ) : (

          bookings.map(item => (

            <TouchableOpacity
              key={item.bookingId}
              style={styles.card}
              activeOpacity={0.85}
            >

              <View style={styles.iconBox} />

              <View style={styles.info}>

                <Text style={styles.labName}>
                  {item.labName}
                </Text>

                <Text style={styles.tests} numberOfLines={2}>
                  {item.tests.join(", ")}
                </Text>

                <Text style={styles.date}>
                  {item.date}
                </Text>

              </View>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>

    </View>
  );
};

export default RecentlyBookingTests;

const styles = StyleSheet.create({

  container: {
    marginTop: verticalScale(22),
    paddingBottom: verticalScale(10), 
  },

  heading: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: verticalScale(14),
    paddingHorizontal: scale(16),
  },

  listContent: {
    paddingLeft: scale(16),
    paddingRight: scale(24),
    paddingBottom: verticalScale(6), 
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(16),
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginRight: scale(14),
    marginBottom: verticalScale(4), 
    width: CARD_WIDTH,
    elevation: 3,
  },

  iconBox: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(12),
    backgroundColor: "#EEF4FF",
    marginRight: scale(12),
  },

  info: {
    flex: 1,
  },

  labName: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#222",
  },

  tests: {
    fontSize: scale(11),
    color: "#777",
    marginTop: verticalScale(4),
    lineHeight: 16,
  },

  date: {
    fontSize: scale(11),
    color: "#056FD2",
    marginTop: verticalScale(4),
    fontWeight: "600",
  },

  noDataText: {
    fontSize: scale(13),
    color: "#8E8E8E",
    paddingHorizontal: scale(16),
  },

  skeletonCard: {
    backgroundColor: "#F4F6F8",
    width: CARD_WIDTH,
  },

  skeletonIcon: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(12),
    backgroundColor: "#E5E7EB",
    marginRight: scale(12),
  },

  skeletonTextContainer: {
    flex: 1,
  },

  skeletonLineShort: {
    width: scale(100),
    height: scale(12),
    backgroundColor: "#E5E7EB",
    borderRadius: scale(6),
    marginBottom: verticalScale(8),
  },

  skeletonLineLong: {
    width: scale(150),
    height: scale(10),
    backgroundColor: "#E5E7EB",
    borderRadius: scale(6),
  },

});

