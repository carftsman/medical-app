import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";

/* STATIC DATA */
const RECENT_TESTS = [
  {
    id: "1",
    name: "Thyroid Test",
    type: "Home collection",
    price: "₹400",
    icon: require("../../../../assets/thyroid.jpg"),
  },
  {
    id: "2",
    name: "Blood Test",
    type: "Home collection",
    price: "₹350",
    icon: require("../../../../assets/blood.jpg"),
  },
];

/* COMPONENT */
const RecentlyViewedTests = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
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
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recently Booking Tests</Text>

      <FlatList
        data={RECENT_TESTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
    paddingRight: scale(26),
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    padding: scale(12),
    marginRight: scale(14),
    marginBottom: verticalScale(4),
    elevation: 2,
    minWidth: scale(220),
  },

  iconBox: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(10),
  },

  icon: {
    width: scale(22),
    height: scale(22),
    resizeMode: "contain",
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
    marginTop: verticalScale(2),
  },

  price: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#056FD2",
  },
});
