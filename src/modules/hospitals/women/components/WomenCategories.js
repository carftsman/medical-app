import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT, SIZES } from "../../../../config/constants";
import { scale, verticalScale } from "../../../../utils/styling";

const WomenCategories = ({ data = [], loading = false }) => {
  const navigation = useNavigation();

  const onViewAllPress = () => {
    navigation.navigate("WomenDepartmentsScreen");
  };

  const onCategoryPress = (item) => {
    navigation.navigate("WomenHospitalsScreen", {
      categoryId: item.id,
      categoryName: item.name,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onCategoryPress(item)}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <Text style={styles.label} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSkeleton = () => (
    <View style={styles.card}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonText} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Health Categories</Text>

        {!loading && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>View All ›</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={loading ? Array.from({ length: 6 }) : data}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={loading ? renderSkeleton : renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default WomenCategories;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(16),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },

  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  viewAll: {
    fontSize: SIZES.small,
    color: COLORS.pink,
    fontFamily: FONT.bold,
  },

  image: {
    width: scale(100),
    height: scale(80),
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(16),
    margin: scale(9),
    padding: scale(7),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },

  label: {
    marginTop: verticalScale(6),
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.black,
    textAlign: "center",
  },

  skeletonImage: {
    width: scale(100),
    height: scale(80),
    margin: scale(9),
    borderRadius: scale(16),
    backgroundColor: COLORS.lightGray,
  },

  skeletonText: {
    marginTop: verticalScale(6),
    marginLeft: scale(24),
    width: scale(65),
    height: verticalScale(10),
    borderRadius: scale(6),
    backgroundColor: COLORS.lightGray,
  },
});
