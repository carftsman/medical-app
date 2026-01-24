import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../../api/client";

export default function FindDoctorsScreen() {
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      fetchSymptoms(searchText);
    } else {
      setSymptoms([]);
    }
  }, [searchText]);

  // 🔹 Categories API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/hospital/user/categories?mode=BOTH");
      setCategories(res.data.data || []);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Symptoms API (SEARCH)
  const fetchSymptoms = async (query) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(
        `/hospital/user/symptoms?search=${query}&page=1&limit=20`
      );
      setSymptoms(res.data.symptoms || []);
    } catch (err) {
      setError("Failed to load symptoms");
    } finally {
      setLoading(false);
    }
  };

  // Decide what list to show
  const listData = useMemo(() => { 
    return searchText.trim().length > 0 ? symptoms : categories;
  }, [searchText, symptoms, categories]);

  // Render Item (Category + Disease/Symptom)
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <Image
        source={{ 
          uri: item.imageUrl
            ? item.imageUrl
            : "https://via.placeholder.com/80",
        }}
        style={styles.image}
      />

      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {searchText.trim().length > 0
            ? item.category?.name
            : item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* STATIC HEADER */}
        <Text style={styles.header}>Find Doctors</Text>

        {/* STATIC SEARCH BAR */}
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search Disease or Symptoms"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* SCROLLABLE LIST */}
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={listData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
              ) : (
                <Text style={styles.empty}>
                  {searchText ? "No disease found" : "No categories found"}
                </Text>
              )
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 12,
    color: "#111827",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginBottom: 17,

    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },

  cardContent: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6B7280",
  },
});
