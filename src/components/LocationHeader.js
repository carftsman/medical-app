import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationHeader() {
  const [address, setAddress] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(true);

  const requestPermissionAndStart = async () => {
    setShowPermissionModal(false);

    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    Geolocation.getCurrentPosition(
      async pos => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setAddress(data.address || null);
        } catch (e) {
          console.log(e);
        }
      },
      err => console.log(err),
      { enableHighAccuracy: true }
    );
  };

  const headerTitle = () => {
    if (!address) return "Select location";

    const parts = [];
    if (address.road) parts.push(address.road);
    if (address.suburb) parts.push(address.suburb);
    if (address.city) parts.push(address.city);
    

    return parts.join(", ");
  };

  return (
    <>
      {/* LOCATION*/}
      <TouchableOpacity>
      <View style={styles.container}>
        <Ionicons name="location-sharp" size={26} color="#FF3B30" />

        <View style={styles.textWrap}>
          <Text style={styles.deliver}>Deliver to</Text>
          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.location}>
              {headerTitle()}
            </Text>
             <Ionicons name="chevron-down" size={14} color="#fff" />
          </View>
        </View>
      </View>
      </TouchableOpacity>
      {/* LOCATION PERMISSION MODAL */}
      <Modal visible={showPermissionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="location-outline" size={36} color="#2563EB" />

            <Text style={styles.modalTitle}>
              Allow Location Access
            </Text>

            <Text style={styles.modalSub}>
              We need your location to show nearby hospitals, labs and delivery services.
            </Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.denyBtn}
                onPress={() => setShowPermissionModal(false)}
              >
                <Text style={styles.denyText}>Not Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.allowBtn}
                onPress={requestPermissionAndStart}
              >
                <Text style={styles.allowText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWrap: {
    marginLeft: 6,
  },
  deliver: {
    fontSize: 12,
    color: "#E0F7F4",
  },
  location: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    maxWidth: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  modalSub: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginVertical: 10,
  },
  modalRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  denyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  denyText: {
    color: "#6B7280",
    fontWeight: "600",
  },
  allowBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  allowText: {
    color: "#fff",
    fontWeight: "700",
  },
});
