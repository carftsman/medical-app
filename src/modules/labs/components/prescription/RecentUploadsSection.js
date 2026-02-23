import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUserPrescriptions } from "../services/prescriptionApi";

const RecentUploadsSection = () => {
  const navigation = useNavigation();

  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const response = await getUserPrescriptions();
      let data = response?.data?.data;

      let formatted = [];

      if (Array.isArray(data)) {
        formatted = data;
      } else if (data?.groupId) {
        formatted = [data];
      }

      const sorted = formatted.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );

      setUploads(sorted.slice(0, 5)); // show latest 5 only
    } catch (error) {
      console.log("Home Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUploads();
    }, [])
  );

  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color="#056FD2"
        style={{ marginVertical: 20 }}
      />
    );
  }

  if (!uploads.length) return null;

  const renderItem = ({ item }) => {
    const firstFile = item.files?.[0];
    const isPDF = firstFile?.fileType?.includes("pdf");

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("PrescriptionTracking", {
            groupId: item.groupId,
          })
        }
      >
        <View style={styles.iconBox}>
          {isPDF ? (
            <Ionicons
              name="document-text"
              size={28}
              color="#056FD2"
            />
          ) : (
            <Ionicons
              name="document-outline"
              size={28}
              color="#056FD2"
            />
          )}
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.idText}>
            #{item.groupId?.slice(0, 6)}
          </Text>

          <Text style={styles.statusText}>
            Prescription Sent
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          Recent Appointments
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PrescriptionList")
          }
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal List */}
      <FlatList
        data={uploads}
        keyExtractor={(item) => item.groupId}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default RecentUploadsSection;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  viewAll: {
    fontSize: 13,
    color: "#056FD2",
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 18,
    marginRight: 12,
    width: 200,
    elevation: 2,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    marginLeft: 12,
  },

  idText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#222",
  },

  statusText: {
    fontSize: 13,
    color: "#056FD2",
    marginTop: 4,
    fontWeight: "600",
  },
});