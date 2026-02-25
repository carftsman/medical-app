import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from "../../../api/client";
import { scale, verticalScale } from "../../../utils/styling";

const NearbyLabs = () => {
  const navigation = useNavigation();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNearbyLabs();
  }, []);

  const fetchNearbyLabs = async () => {
    try {
      const res = await api.get("/labs/nearby", {
        params: {
          latitude: 17.4401,
          longitude: 78.3489,
          radius: 8,
          sortBy: "distance",
          minRating: 3,
          maxRating: 5,
          page: 1,
          limit: 10,
        },
      });
      setLabs(res?.data?.labs || []);
    } catch (e) {
      console.log("Nearby labs API error:", e);
    } finally {
      setLoading(false);
    }
  };

  /* LAB DETAILS */
  const goToLabDetails = (lab) => {
    navigation.navigate("LabDetails", {
      labId: lab.id,
    });
  };

  /* VIEW ALL */
  const goToLabsScreen = () => {
    navigation.navigate("LabsScreen");
  };

  const LabCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => goToLabDetails(item)}
      >
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.meta}>
            <Ionicons name="location-outline" size={12} />{" "}
            {item.distance} kms · {item.city}
          </Text>

          <View style={styles.bottomRow}>
            <Text
              style={[
                styles.status,
                { color: item.isOpen ? "#2ecc71" : "#e74c3c" },
              ]}
            >
              {item.isOpen ? "Open" : "Closed"}
            </Text>

            <View style={styles.iconBtn}>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#056FD2"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Labs</Text>
        <TouchableOpacity onPress={goToLabsScreen}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {loading
          ? [1, 2].map((i) => (
              <View key={i} style={styles.skeleton} />
            ))
          : labs.map((item) => (
              <LabCard key={item.id} item={item} />
            ))}
      </ScrollView>
    </View>
  );
};

export default NearbyLabs;

/* STYLES */
const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(22),
    paddingBottom: verticalScale(8),
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(16),
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

  scrollContainer: {
    paddingLeft: scale(8),
    paddingRight: scale(28),
  },

  card: {
    width: scale(240),
    backgroundColor: "#fff",
    borderRadius: scale(12),
    marginRight: scale(14),
    marginBottom: verticalScale(6),
    elevation: 3,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: verticalScale(120),
    resizeMode: "cover",
  },

  ratingBadge: {
    position: "absolute",
    top: scale(8),
    right: scale(8),
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(12),
    alignItems: "center",
  },

  ratingBadgeText: {
    fontSize: scale(11),
    fontWeight: "700",
    marginLeft: 2,
  },

  cardBody: {
    padding: scale(10),
  },

  name: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#222",
  },

  meta: {
    fontSize: scale(12),
    color: "#666",
    marginTop: verticalScale(4),
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(8),
  },

  status: {
    fontSize: scale(12),
    fontWeight: "600",
  },

  iconBtn: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  skeleton: {
    width: scale(240),
    height: verticalScale(200),
    backgroundColor: "#E6ECF2",
    borderRadius: scale(12),
    marginRight: scale(14),
  },
});
