import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../api/client";
import LabFiltersModal from "../components/LabFiltersModal";

const LabsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = route?.params?.categoryId;

  // ✅ RECEIVE UPLOAD FLOW PARAMS
  const isUploadFlow = route?.params?.isUploadFlow ?? false;
  const uploadedFiles = route?.params?.files ?? null;

  const flatListRef = useRef(null);

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("distance");
  const [radius, setRadius] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [minFee, setMinFee] = useState(null);
  const [maxFee, setMaxFee] = useState(null);

  const [showFilter, setShowFilter] = useState(false);

  const fetchLabs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/labs/nearby", {
        params: {
          latitude: 17.4401,
          longitude: 78.3489,
          search: search || undefined,
          sortBy,
          radius: radius ?? undefined,
          minRating: minRating ?? undefined,
          minFee: minFee ?? undefined,
          maxFee: maxFee ?? undefined,
          page: 1,
          limit: 10,
          categoryId,
        },
      });

      setLabs(response?.data?.labs || []);
    } catch (error) {
      console.log("ERROR:", error?.response?.data || error.message);
      setLabs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLabs();
    }, 400);

    return () => clearTimeout(delay);
  }, [categoryId, search, sortBy, radius, minRating, minFee, maxFee]);

  const renderStars = (rating = 0) => {
    const numericRating = Number(rating) || 0;

    return (
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name={i <= Math.floor(numericRating) ? "star" : "star-outline"}
            size={14}
            color="#FFA500"
          />
        ))}
        <Text style={styles.reviewText}>
          {" "}
          ({numericRating.toFixed(1)})
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Image
          source={{
            uri: item.imageUrl || "https://via.placeholder.com/100",
          }}
          style={styles.labImage}
        />

        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          {renderStars(item.rating)}

          <View style={styles.locationRow}>
            <Icon name="location-outline" size={13} color="#777" />
            <Text style={styles.city}> {item.city}</Text>
            <Text
              style={[
                styles.open,
                { color: item.isOpen ? "#1BB55C" : "#E53935" },
              ]}
            >
              {" "}• {item.isOpen ? "Open Now" : "Closed"}
            </Text>
          </View>

          <Text style={styles.distance}>
            {Number(item.distance)?.toFixed(2)} km away
          </Text>

          <Text style={styles.fee}>
            Starting from ₹{item?.startingFee ?? 0}
          </Text>
        </View>
      </View>

      {/* FORWARD UPLOAD FLOW TO LAB DETAILS */}
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() =>
          navigation.navigate("LabDetails", {
            labId: item.id,
            categoryId,
            isUploadFlow: isUploadFlow,
            files: uploadedFiles,
          })
        }
      >
        <Text style={styles.viewText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laboratory</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Icon name="cart-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search for labs or city"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Icon name="options-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1E88E5" />
      ) : labs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Labs Found</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={labs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}

      <LabFiltersModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(filters) => {
          if (filters.sortBy !== undefined) setSortBy(filters.sortBy);
          if (filters.radius !== undefined) setRadius(filters.radius);
          if (filters.minRating !== undefined) setMinRating(filters.minRating);
          if (filters.minFee !== undefined) setMinFee(filters.minFee);
          if (filters.maxFee !== undefined) setMaxFee(filters.maxFee);

          flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          setShowFilter(false);
        }}
      />
    </View>
  );
};

export default LabsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 16,
    flex: 1,
    color: "#222",
  },

  /* ================= SEARCH ================= */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#222",
  },

  filterBtn: {
    marginLeft: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  /*  CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    elevation: 4,
  },

  cardRow: {
    flexDirection: "row",
  },

  labImage: {
    width: 85,
    height: 110,
    borderRadius: 16,
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  /* RATING  */
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  reviewText: {
    fontSize: 12,
    color: "#777",
  },

  /* ================= LOCATION ================= */
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  city: {
    fontSize: 12,
    color: "#777",
  },

  open: {
    fontSize: 12,
  },

  distance: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  fee: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
    color: "#1E88E5",
  },

  /* ================= BUTTON ================= */
  viewBtn: {
    backgroundColor: "#1E88E5",
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  viewText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  /* ================= EMPTY ================= */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
  },
});