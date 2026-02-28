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

const CategorySection = ({ title, data, onViewAll, showViewAll = true, loading = false, onCategoryPress, }) => {
  const handleCategoryPress = (item) => {
    onCategoryPress?.(item);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showViewAll && !loading && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View>
          {[1, 2].map((row) => (
            <View key={row} style={styles.skeletonRow}>
              {[1, 2, 3].map((item) => (
                <View key={item} style={styles.skeletonItem}>
                  <View style={styles.skeletonCircle} />
                  <View style={styles.skeletonText} />
                </View>
              ))}
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
              <CategoryCard
                title={item.name}
                imageUrl={{ uri: item.imageUrl }}
              />
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

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
  skeletonItem: {
    alignItems: "center",
    width: scale(90),
  },
  skeletonCircle: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(100),
    backgroundColor: COLORS.lightgray || "#E5E7EB",
    marginBottom: verticalScale(8),
  },
  skeletonText: {
    width: scale(50),
    height: verticalScale(10),
    borderRadius: scale(4),
    backgroundColor: COLORS.lightgray || "#E5E7EB",
  },
  skeletonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(16),
  },


});
