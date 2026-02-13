import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "../../../utils/styling";
import api from "../../../api/client";

const CategoriesScreen = () => {
  const navigation = useNavigation();

  const [sections, setSections] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const toTitleCase = (text = "") => {
    return text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/labs/categories/all", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const apiData = response?.data?.sections || [];

      // 🔥 Force re-render even if backend sends same reference
      setSections([]);
      setAllSections([]);
      setTimeout(() => {
        setSections(apiData);
        setAllSections(apiData);
      }, 50);

    } catch (error) {
      console.log("Category API Error:", error?.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true); // ✅ Show skeleton on refresh
    fetchCategories();
  };

  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      setSections(allSections);
      return;
    }

    const filtered = allSections
      .map((section) => {
        const filteredCategories = section.categories.filter((cat) =>
          cat.name.toLowerCase().includes(text.toLowerCase())
        );

        return { ...section, categories: filteredCategories };
      })
      .filter((section) => section.categories.length > 0);

    setSections(filtered);
  };

  const handleCategoryPress = (item) => {
    navigation.navigate("LabsListScreen", {
      categoryId: item.id,
      categoryName: item.name,
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image
          key={item.imageUrl}   // ✅ Ensures image updates when backend changes
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.categoryText} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <ActivityIndicator size="large" color="#056FD2" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Categories</Text>

        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Icon name="cart-outline" size={scale(22)} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={scale(18)} color="#7f8c8d" />
        <TextInput
          placeholder="Search by Category"
          value={search}
          onChangeText={handleSearch}
          style={styles.searchInput}
          placeholderTextColor="#7f8c8d"
        />
        <Icon name="mic-outline" size={scale(18)} color="#7f8c8d" />
      </View>

      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={sections}
          extraData={sections}   // ✅ Forces UI update when backend changes
          keyExtractor={(item) =>
            item.id?.toString() || item.sectionTitle?.toString()
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#056FD2"]}
            />
          }
          renderItem={({ item }) => {
            const isBloodAnalysis =
              toTitleCase(item.sectionTitle) === "Blood Analysis";

            return (
              <View
                style={[
                  styles.sectionContainer,
                  isBloodAnalysis && { marginBottom: verticalScale(18) },
                ]}
              >
                <Text style={styles.sectionTitle}>
                  {toTitleCase(item.sectionTitle)}
                </Text>

                <FlatList
                  data={item.categories}
                  extraData={item.categories}   // ✅ Refresh inner list properly
                  keyExtractor={(cat) => cat.id.toString()}
                  renderItem={renderCategory}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(6),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(6),
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#000",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(44),
    marginBottom: verticalScale(10),
  },

  searchInput: {
    flex: 1,
    marginHorizontal: scale(8),
    fontSize: scale(13),
    color: "#000",
  },

  sectionContainer: {
    marginBottom: verticalScale(14),
  },

  sectionTitle: {
    fontSize: scale(15),
    fontWeight: "600",
    marginBottom: verticalScale(6),
    color: "#000",
  },

  categoryItem: {
    alignItems: "center",
    marginRight: scale(14),
  },

  imageWrapper: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(34),
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  categoryText: {
    fontSize: scale(12),
    marginTop: verticalScale(4),
    textAlign: "center",
    width: scale(75),
    color: "#555",
  },

  skeletonContainer: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },
});

export default CategoriesScreen;
