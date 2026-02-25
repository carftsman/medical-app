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

const RecentlyViewedPackages = () => {
  const userId = useSelector(state => state.auth?.user?.id);

  const [recentPackages, setRecentPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  /*GET RECENT */

  const fetchRecentPackages = async () => {
    try {
      setLoading(true);

      const response = await api.get("/labs/recent-view", {
        params: { userId },
      });

      const packages = response?.data?.recent || [];

      const formatted = packages.map(item => ({
        id: item.packageId?.toString(),
        packageId: item.packageId,
        labId: item.labId,
        name: item.packageName,
        labName: item.labName,
        price: `₹${item.price}`,
      }));

      setRecentPackages(formatted);
    } catch (error) {
      console.log(
        "GET Recent Error:",
        error?.response?.data || error.message
      );
      setRecentPackages([]);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchRecentPackages();
      }
    }, [userId])
  );

  /* POST SAVE */

  const saveRecentView = async (packageId, labId) => {
    try {
      await api.post("/labs/recent-view", {
        userId,
        labId,
        packageId,
      });

      console.log("Saved recent view");
    } catch (error) {
      console.log(
        "POST Recent Error:",
        error?.response?.data || error.message
      );
    }
  };

  /*UI */

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Recently Viewed Packages
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <View style={[styles.card, styles.skeletonCard]} key={index}>
              <View style={styles.skeletonIcon} />
              <View style={styles.skeletonTextContainer}>
                <View style={styles.skeletonLineShort} />
                <View style={styles.skeletonLineLong} />
              </View>
              <View style={styles.skeletonPrice} />
            </View>
          ))
        ) : recentPackages.length === 0 ? (
          <Text style={styles.noDataText}>
            No recent packages found
          </Text>
        ) : (
          recentPackages.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                saveRecentView(item.packageId, item.labId)
              }
            >
              <View style={styles.iconBox} />

              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.type}>
                  {item.labName}
                </Text>
              </View>

              <Text style={styles.price}>
                {item.price}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewedPackages;

/*  STYLES */

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
    paddingBottom: verticalScale(6),
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
    paddingRight: scale(8),
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(18),
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    marginRight: scale(14),
    minWidth: scale(240),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
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

  name: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#222",
  },

  type: {
    fontSize: scale(11),
    color: "#777",
    marginTop: verticalScale(4),
  },

  price: {
    fontSize: scale(14),
    fontWeight: "800",
    color: "#056FD2",
  },

  noDataText: {
    fontSize: scale(13),
    color: "#8E8E8E",
    paddingHorizontal: scale(16),
  },

  /* Skeleton */

  skeletonCard: {
    backgroundColor: "#F4F6F8",
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
    width: scale(140),
    height: scale(10),
    backgroundColor: "#E5E7EB",
    borderRadius: scale(6),
  },

  skeletonPrice: {
    width: scale(50),
    height: scale(14),
    backgroundColor: "#E5E7EB",
    borderRadius: scale(6),
  },
});