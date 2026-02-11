import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../../api/client";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS, SIZES } from "../../../config/constants";

// ✅ Static Images Mapping
const categoryImages = {
  "Full Body Checkup": require("../../../../assets/fullbody.png"),
  "Vitamin Tests": require("../../../../assets/vitamins.png"),
  "Hormone Tests": require("../../../../assets/hormone.png"),
  "Fertility Tests": require("../../../../assets/fertility.png"),
  "Immunity": require("../../../../assets/immunity.png"),
  "Women Health": require("../../../../assets/women.png"),
  "Pregnancy Tests": require("../../../../assets/pregnancy.png"),
  "Kidney Function": require("../../../../assets/kidney.png"),
  "Blood Tests": require("../../../../assets/Bloodtest.png"),
  "CT Scan": require("../../../../assets/"),
  "MRI": require("../../../../assets/"),
  "Diabetes": require("../../../../assets/"),
  "Heart Profile": require("../../../../assets/"),
  "Liver Function": require("../../../../assets/"),
  "X-Ray": require("../../../../assets/")
  
};

const LabCategories = ({ labId = 1, navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/labs/categories/all");
      setCategories(res?.data?.data || []);
    } catch (error) {
      console.log("Categories API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchText(text);

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await api.get(`/api/labs/${labId}/categories`);
      const apiData = res?.data?.data || [];

      const matchedIds = apiData
        .filter((item) =>
          item.name.toLowerCase().includes(text.toLowerCase())
        )
        .map((item) => item.id);

      const filteredFullData = categories.filter((cat) =>
        matchedIds.includes(cat.id)
      );

      setSearchResults(filteredFullData);
    } catch (error) {
      console.log("Search API error:", error);
    }
  };

  const displayData = searchText.trim() ? searchResults : categories;

  const generalHealthCategories = useMemo(() => {
    return displayData.filter(
      (item) => item.group === "GENERAL_HEALTH"
    );
  }, [displayData]);

  const illnessCategories = useMemo(() => {
    return displayData.filter(
      (item) => item.group === "ILLNESS"
    );
  }, [displayData]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.7}
      onPress={() =>
        navigation?.navigate("CategoryDetails", { category: item })
      }
    >
      <View style={styles.circle}>
        <Image
          source={categoryImages[item.name]}
          style={styles.image}
        />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSection = (title, data) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.cartWrapper}>
          <Icon name="cart-outline" size={scale(24)} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={18} color={COLORS.gray} />
          <TextInput
            placeholder="Search categories"
            placeholderTextColor={COLORS.gray}
            value={searchText}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
          <Icon name="mic-outline" size={18} color={COLORS.gray} />
        </View>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          {renderSection("General Health", generalHealthCategories)}
          {renderSection("Illness Health", illnessCategories)}
        </>
      )}
    </ScrollView>
  );
};

export default LabCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: verticalScale(15),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(16),
    marginTop: verticalScale(10),
  },

  cartWrapper: {
    marginTop: verticalScale(4),
  },

  headerTitle: {
    fontSize: scale(SIZES.large),
    fontWeight: "700",
    color: COLORS.black,
  },

  searchWrapper: {
    paddingHorizontal: scale(16),
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(20),
    height: verticalScale(40),
  },

  searchInput: {
    flex: 1,
    marginHorizontal: scale(8),
    fontSize: scale(SIZES.small),
    color: COLORS.black,
  },

  section: {
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(16),
  },

  sectionTitle: {
    fontSize: scale(SIZES.medium),
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: verticalScale(16),
  },

  loadingText: {
    fontSize: scale(SIZES.small),
    color: COLORS.gray,
    paddingHorizontal: scale(16),
  },

  itemContainer: {
    width: "33%",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },

  circle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: COLORS.Iceblue,
    marginBottom: verticalScale(8),
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
  },

  categoryText: {
    fontSize: scale(SIZES.small),
    fontWeight: "600",
    color: COLORS.darkgray,
    textAlign: "center",
  },
});
