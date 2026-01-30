import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, SIZES } from "../../../config/constants";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ title, data, onViewAll, showViewAll = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <CategoryCard
            title={item.name}
            imageUrl={{ uri: item.imageUrl }}
          />

        )}

        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "600",
    color: COLORS.black,
  },
  viewAll: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    color: COLORS.blue,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },
});
