import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import api from "../../../api/client";

const LAB_IMAGES = {
  1: require("../../../../assets/ApolloLab.jpg"),
  2: require("../../../../assets/thyrocare.jpg"),
  3: require("../../../../assets/Dr Lal.png"),
  4: require("../../../../assets/metropolis.jpg"),
  5: require("../../../../assets/SRL.jpg"),
  6: require("../../../../assets/vijaya.jpg"),
  7: require("../../../../assets/Medplus.jpg"),
  8: require("../../../../assets/Healthians.jpg"),
  9: require("../../../../assets/orangeHealth.jpg"),
  10: require("../../../../assets/Redcliffe.jpg"),
};

const SKELETON_COUNT = 4;

const RecentlyViewedTests = () => {
  const [recentTests, setRecentTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTests();
  }, []);

  const fetchRecentTests = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/labs/tests/recent?userId=21&limit=5"
      );

      const tests = response?.data?.tests || [];

      const formattedData = tests.map((item) => ({
        id: item.testId.toString(),
        name: item.testName,
        type: item.labName,
        price: `₹${item.price}`,
        icon:
          LAB_IMAGES[item.labId] ||
          require("../../../../assets/blood.jpg"),
      }));

      setRecentTests(formattedData);
    } catch (error) {
      console.log("Recent Tests API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recently Booking Tests</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <View style={[styles.card, styles.skeletonCard]} key={index}>
                <View style={styles.skeletonIcon} />
                <View style={styles.skeletonTextContainer}>
                  <View style={styles.skeletonLineShort} />
                  <View style={styles.skeletonLineLong} />
                </View>
                <View style={styles.skeletonPrice} />
              </View>
            ))
          : recentTests.map((item) => (
              <View style={styles.card} key={item.id}>
                <View style={styles.iconBox}>
                  <Image source={item.icon} style={styles.icon} />
                </View>

                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.type}>{item.type}</Text>
                </View>

                <Text style={styles.price}>{item.price}</Text>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

export default RecentlyViewedTests;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
    paddingBottom: verticalScale(6),
  },

  heading: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#222",
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(16),
    textAlign: "left",
  },

  listContent: {
    paddingLeft: scale(6),   
    paddingRight: scale(16),
    paddingBottom: verticalScale(6),
  },

card: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderRadius: scale(18),          
  paddingVertical: scale(14),       
  paddingHorizontal: scale(16),    
  marginRight: scale(16),           
  marginBottom: verticalScale(8),
  elevation: 3,                     
  minWidth: scale(110),             
},


  iconBox: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(8),
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(10),
    overflow: "hidden",
  },

  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#222",
  },

  type: {
    fontSize: scale(10),
    color: "#777",
    marginTop: verticalScale(2),
  },

  price: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#056FD2",
  },

  /* Skeleton styles */

  skeletonCard: {
    backgroundColor: "#F2F4F7",
  },

  skeletonIcon: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(8),
    backgroundColor: "#E0E0E0",
    marginRight: scale(10),
  },

  skeletonTextContainer: {
    flex: 1,
  },

  skeletonLineShort: {
    width: scale(80),
    height: scale(10),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(4),
    marginBottom: verticalScale(6),
  },

  skeletonLineLong: {
    width: scale(110),
    height: scale(8),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(4),
  },

  skeletonPrice: {
    width: scale(40),
    height: scale(12),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(4),
  },
});
