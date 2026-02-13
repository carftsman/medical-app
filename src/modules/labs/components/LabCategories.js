import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/client";
import { scale, verticalScale } from "../../../utils/styling";

/* COMPONENT */
const LabCategories = ({ labId }) => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get("/labs/categories/all");
      const sections = res?.data?.sections || [];
      const allCategories = sections.flatMap(section => section.categories || []);

      setCategories(allCategories);

    } catch (e) {
      console.log("Categories API error:", e);
    } finally {
      setLoading(false);
    }
  };

  const SkeletonCard = () => (
    <View style={styles.card}>
      <View style={styles.skeletonCircle} />
      <View style={styles.skeletonText} />
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate("LabsScreen", {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      >
        <View style={styles.imageWrapper}>
          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
            />
          )}
        </View>

        <Text style={styles.label} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Categories</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("LabsScreen")}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(i) => String(i)}
          renderItem={() => <SkeletonCard />}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LabCategories;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  heading: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#222",
  },
  viewAll: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#056FD2",
  },
  card: {
    width: scale(80),
    alignItems: "center",
    marginRight: scale(14),
  },
  imageWrapper: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    overflow: "hidden",
    marginBottom: verticalScale(6),
  },
  image: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    resizeMode: "cover",
  },
  label: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#444",
    textAlign: "center",
  },
  skeletonCircle: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: "#E6ECF2",
    marginBottom: verticalScale(6),
  },
  skeletonText: {
    width: scale(44),
    height: verticalScale(10),
    borderRadius: scale(6),
    backgroundColor: "#E6ECF2",
  },
});
