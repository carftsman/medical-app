import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { scale, verticalScale } from "../../../utils/styling";
import api from "../../../api/client";
 
const CategoriesScreen = () => {
  const navigation = useNavigation();
 
  const [sections, setSections] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
 
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
        headers: { "Cache-Control": "no-cache" },
      });
 
      const apiData = response?.data?.sections || [];
 
      setSections(apiData);
      setAllSections(apiData);
      setRefreshKey(prev => prev + 1);
 
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
    useCallback(() => {
      fetchCategories();
    }, [])
  );
 
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
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
    navigation.navigate("LabsScreen", {
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
          key={item.imageUrl + refreshKey}
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
    <View style={{ marginTop: verticalScale(10) }}>
      {[1, 2, 3].map((section) => (
        <View key={section} style={{ marginBottom: verticalScale(20) }}>
          <View
            style={{
              width: scale(120),
              height: verticalScale(16),
              backgroundColor: "#E5E7EB",
              borderRadius: 8,
              marginBottom: verticalScale(12),
            }}
          />
          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={() => (
              <View style={{ alignItems: "center", marginRight: scale(16) }}>
                <View
                  style={{
                    width: scale(68),
                    height: scale(68),
                    borderRadius: scale(34),
                    backgroundColor: "#E5E7EB",
                  }}
                />
                <View
                  style={{
                    width: scale(60),
                    height: verticalScale(10),
                    backgroundColor: "#E5E7EB",
                    borderRadius: 6,
                    marginTop: verticalScale(8),
                  }}
                />
              </View>
            )}
          />
        </View>
      ))}
    </View>
  );
 
  return (
    <View style={styles.container}>
 
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: verticalScale(20),
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#056FD2"]}
            />
          }
        >
          {sections.map((item) => {
            const isBloodAnalysis =
              toTitleCase(item.sectionTitle) === "Blood Analysis";
 
            return (
              <View
                key={item.id?.toString() || item.sectionTitle}
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
                  extraData={refreshKey}
                  keyExtractor={(cat) => cat.id.toString()}
                  renderItem={renderCategory}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
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
    alignItems: "center",
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(18),
  },
 
  headerTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    marginLeft: scale(13),
    flex: 1,
    color: "#000",
  },
 
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(45),
    marginBottom: verticalScale(11),
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
    marginBottom: verticalScale(7),
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
});
 
export default CategoriesScreen;