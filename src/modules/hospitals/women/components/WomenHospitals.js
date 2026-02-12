import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT, SIZES } from "../../../../config/constants";
import { scale, verticalScale } from "../../../../utils/styling";
import Ionicons from "react-native-vector-icons/Ionicons";

const WomenHospitals = ({ data = [], loading = false }) => {
  const navigation = useNavigation();

  const onViewAll = () => {
    navigation.navigate("WomenHospitalsScreen");
  };

  const onHospitalPress = (item) => {
    navigation.navigate("WomenHospitalDetails", {
      hospitalId: item.id,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onHospitalPress(item)}
    >
      {/* IMAGE */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />

      {/* Rating Badge */}
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#FFC107" />
        <Text style={styles.ratingText}>4.5</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        {/* Distance + Location */}
        <Text style={styles.location}>
           {item.distance?.toFixed(1)} kms | {item.place}
        </Text>

        <Text style={styles.speciality} numberOfLines={2}>
          {item.speciality}
        </Text>

        {/* Open Badge */}
        {item.isOpen && (
          <View style={styles.openBadge}>
            <Text style={styles.openText}>Opens 24 hours</Text>
          </View>
        )}

        {/* View Details */}
        <View style={styles.bottomRow}>
  <TouchableOpacity
    style={styles.button}
    onPress={() => onHospitalPress(item)}
  >
    <Text style={styles.buttonText}>View Details</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.heartBtn}
    onPress={() => console.log("Like pressed", item.id)}
    activeOpacity={0.7}
  >
    <Ionicons
      name="heart-outline"
      size={22}
      color={COLORS.pink}
    />
  </TouchableOpacity>
</View>

      </View>
    </TouchableOpacity>
  );

  const renderSkeleton = () => (
    <View style={[styles.card, { backgroundColor: COLORS.lightGray }]} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Near by Hospitals</Text>

        {!loading && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAll}>View All ›</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={loading ? Array.from({ length: 2 }) : data}
        keyExtractor={(item, index) =>
          item?.id?.toString() || index.toString()
        }
        renderItem={loading ? renderSkeleton : renderItem}
      />
    </View>
  );
};

export default WomenHospitals;
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
    paddingLeft: scale(16),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: scale(16),
    marginBottom: verticalScale(14),
  },

  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  viewAll: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.pink,
  },

  card: {
    width: scale(200),
    backgroundColor: COLORS.white,
    borderRadius: scale(18),
    marginRight: scale(16),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  image: {
    width: scale(200),
    height: verticalScale(100),
  },

  ratingBadge: {
    position: "absolute",
    top: scale(10),
    left: scale(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(20),
  },

  ratingText: {
    marginLeft: scale(4),
    fontSize: scale(12),
    fontFamily: FONT.bold,
  },

  content: {
    padding: scale(3),
  },

  name: {
    fontSize: scale(15),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  location: {
    marginTop: verticalScale(6),
    fontSize: SIZES.small,
    color: COLORS.pink,
  },

  speciality: {
    marginTop: verticalScale(6),
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  openBadge: {
    marginTop: verticalScale(8),
    backgroundColor: "#E8F8EF",
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    alignSelf: "flex-start",
  },

  openText: {
    fontSize: scale(12),
    color: "#2E7D32",
    fontFamily: FONT.medium,
  },

  button: {
    marginTop: verticalScale(4),
    backgroundColor: COLORS.pink,
    paddingVertical: verticalScale(10),
    paddingHorizontal:scale(25),
    borderRadius: scale(25),
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
  },
  bottomRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

heartBtn: {
  marginLeft: scale(12),
  width: scale(42),
  height: scale(42),
  justifyContent: "center",
  alignItems: "center",
},
});
