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

const WomenDoctors = ({ data = [], loading = false }) => {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation.navigate("WomenDoctorDetails", {
          doctorId: item.id,
        })
      }
    >
      <View>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.expBadge}>
            <Text style={styles.expText}>
              {item.experience}+Yrs Exp
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.specialization} numberOfLines={1}>
          {item.specialization}
        </Text>

        <Text style={styles.location} numberOfLines={1}>
          {item.hospital?.place}, {item.hospital?.location}
        </Text>

        <View style={styles.ratingBadge}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Available Doctors</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("WomenDoctorsScreen")}
        >
          <Text style={styles.viewAll}>View All ›</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: scale(16) }}
      />
    </View>
  );
};

export default WomenDoctors;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(15),
  },

  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginBottom: verticalScale(15),
  },
headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: scale(15),
  marginBottom: verticalScale(10),
},

viewAll: {
  fontSize: SIZES.small,
  fontFamily: FONT.bold,
  color: COLORS.pink,
},

  card: {
    width: scale(150),
    marginRight: scale(16),
    borderRadius: scale(13),
    borderColor:COLORS.pink,
    borderWidth:2,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  imageWrapper: {
    height: verticalScale(149),
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: scale(150),
    height: scale(150),
  },

  expBadge: {
    position: "absolute",
    top: verticalScale(3),
    right: scale(3),
    backgroundColor: COLORS.pink,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(20),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  expText: {
    fontSize: scale(10),
    color: COLORS.white,
    fontFamily: FONT.bold,
  },

  bottomSection: {
    backgroundColor: COLORS.pink,
    padding: scale(7),

  },

  name: {
    fontSize: scale(15),
    fontFamily: FONT.bold,
    color: COLORS.white,
  },

  specialization: {
    marginTop: verticalScale(4),
    fontSize: scale(13),
    color: COLORS.white,
  },

  location: {
    marginTop: verticalScale(2),
    fontSize: scale(10),
    color: COLORS.white,
  },

  ratingBadge: {
    position: "absolute",
    right: scale(10),
    bottom: verticalScale(25.5),
    flexDirection: "row",
    alignItems: "center",
    color:COLORS.pink,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(2),
    borderRadius: scale(12),
  },

  star: {
    color: COLORS.pink,
    marginRight: scale(4),
    fontSize: scale(12),
  },

  rating: {
    color: COLORS.pink,
    fontFamily: FONT.bold,
    fontSize: scale(12),
  },
});
