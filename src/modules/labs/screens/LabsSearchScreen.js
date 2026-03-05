import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import api from "../../../api/client";
import { scale, verticalScale } from "../../../utils/styling";
 
import LabTestByAge from "../components/LabTestByAge";
import RecentlyBookingTests from "../components/RecentlyBookingTests";
 
const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { searchText } = route.params || {};
 
  const [labs, setLabs] = useState([]);
  const [tests, setTests] = useState([]);
  const [searchValue, setSearchValue] = useState(searchText || "");
  const [categoriesSections, setCategoriesSections] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
 
  useEffect(() => {
    fetchCategories();
  }, []);
 
 
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchValue.trim().length > 0) {
        fetchGlobalSearch(searchValue);
      } else {
        setLabs([]);
        setTests([]);
      }
    }, 400);
 
    return () => clearTimeout(delayDebounce);
  }, [searchValue]);
 
  const fetchCategories = async () => {
    try {
      const res = await api.get("/labs/categories/all", {
        params: { q: "" },
      });
 
      setCategoriesSections(
        res?.data?.sections ||
          res?.data?.data?.sections ||
          []
      );
    } catch (error) {
      console.log("Categories API Error:", error);
    }
  };
 
  const fetchGlobalSearch = async (text) => {
    try {
      const res = await api.get("/labs/global-search", {
        params: { search: text },
      });
 
      const filteredLabs = (res?.data?.labs || []).filter((item) =>
        item.name?.toLowerCase().includes(text.toLowerCase())
      );
 
      const filteredTests = (res?.data?.tests || []).filter((item) =>
        item.name?.toLowerCase().includes(text.toLowerCase())
      );
 
      setLabs(filteredLabs);
      setTests(filteredTests);
    } catch (e) {
      console.log("Global Search API Error:", e);
    }
  };
 
  const handleSaveRecent = (text) => {
    if (!text || text.trim() === "") return;
 
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== text.toLowerCase()
      );
      return [text, ...filtered];
    });
  };
 
  const filteredSections = categoriesSections
    .map((section) => {
      const filteredItems = section.categories.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(searchValue.toLowerCase())
      );
 
      if (filteredItems.length > 0) {
        return {
          sectionTitle: section.sectionTitle,
          categories: filteredItems,
        };
      }
 
      return null;
    })
    .filter(Boolean);
 
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
     
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
 
      {/* SEARCH BAR */}
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={18} color="#999" />
 
        <TextInput
          placeholder="Search for Labs"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchValue}
          onChangeText={setSearchValue}
          onSubmitEditing={() =>
            handleSaveRecent(searchValue)
          }
          returnKeyType="search"
        />
 
        <TouchableOpacity
          onPress={() =>
            handleSaveRecent(searchValue)
          }
        >
          <Icon name="mic-outline" size={18} color="#999" />
        </TouchableOpacity>
      </View>
 
     
      {searchValue !== "" &&
        recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Recent Searches
            </Text>
 
            {recentSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchCard}
                onPress={() =>
                  setSearchValue(item)
                }
              >
                <Icon
                  name="time-outline"
                  size={18}
                  color="#666"
                />
                <Text
                  style={[
                    styles.searchText,
                    { marginLeft: 10 },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
 
      {/* DEFAULT VIEW */}
      {searchValue === "" && (
        <>
          <View style={{ marginLeft: scale(10) }}>
            <LabTestByAge />
          </View>
 
          {categoriesSections.map(
            (section, index) => (
              <View
                key={index}
                style={styles.section}
              >
                <Text
                  style={styles.sectionTitle}
                >
                  {section.sectionTitle}
                </Text>
 
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={
                    false
                  }
                >
                  {section.categories.map(
                    (item) => (
                      <TouchableOpacity
                        key={
                          item.id || item._id
                        }
                        style={
                          styles.categoryCard
                        }
                        onPress={() =>
                          navigation.navigate(
                            "LabsScreen",
                            {
                              categoryId:
                                item.id ||
                                item._id,
                              categoryName:
                                item.name,
                            }
                          )
                        }
                      >
                        <Image
                          source={{
                            uri:
                              item.imageUrl ||
                              item.image,
                          }}
                          style={
                            styles.categoryImage
                          }
                        />
                        <Text
                          style={
                            styles.categoryText
                          }
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </ScrollView>
              </View>
            )
          )}
 
          <RecentlyBookingTests />
        </>
      )}
 
      {/* SEARCH RESULTS */}
      {searchValue !== "" && (
        <>
          {labs.length > 0 && (
            <View style={styles.section}>
              <Text
                style={styles.sectionTitle}
              >
                Packages
              </Text>
 
              {labs.map((item) => (
                <TouchableOpacity
                  key={item.id || item._id}
                  style={styles.searchCard}
                >
                  <Image
                    source={{
                      uri:
                        item.imageUrl ||
                        item.image,
                    }}
                    style={
                      styles.searchImage
                    }
                  />
                  <Text
                    style={styles.searchText}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
 
          {tests.length > 0 && (
            <View style={styles.section}>
              <Text
                style={styles.sectionTitle}
              >
                Labs
              </Text>
 
              {tests.map((item) => (
                <TouchableOpacity
                  key={item.id || item._id}
                  style={styles.searchCard}
                >
                  <Image
                    source={{
                      uri:
                        item.imageUrl ||
                        item.image,
                    }}
                    style={
                      styles.searchImage
                    }
                  />
                  <Text
                    style={styles.searchText}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
 
          {filteredSections.map(
            (section, index) => (
              <View
                key={index}
                style={styles.section}
              >
                <Text
                  style={styles.sectionTitle}
                >
                  {section.sectionTitle}
                </Text>
 
                {section.categories.map(
                  (item) => (
                    <TouchableOpacity
                      key={
                        item.id || item._id
                      }
                      style={
                        styles.searchCard
                      }
                      onPress={() =>
                        navigation.navigate(
                          "LabsScreen",
                          {
                            categoryId:
                              item.id ||
                              item._id,
                            categoryName:
                              item.name,
                          }
                        )
                      }
                    >
                      <Image
                        source={{
                          uri:
                            item.imageUrl ||
                            item.image,
                        }}
                        style={
                          styles.searchImage
                        }
                      />
                      <Text
                        style={
                          styles.searchText
                        }
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )
          )}
        </>
      )}
    </ScrollView>
  );
};
 
export default SearchScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  topBar: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(16),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(12),
    marginHorizontal: scale(16),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(44),
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(8),
    fontSize: scale(14),
    color: "#000",
  },
  section: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(16),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    marginBottom: verticalScale(12),
  },
  searchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: scale(12),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
  },
  searchImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    marginRight: scale(12),
  },
  searchText: {
    fontSize: scale(14),
    flex: 1,
    color: "#000",
    fontWeight: "500",
  },
  categoryCard: {
    marginRight: scale(12),
    alignItems: "center",
    width: scale(110),
  },
  categoryImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
  },
  categoryText: {
    marginTop: verticalScale(6),
    fontSize: scale(13),
    textAlign: "center",
  },
});