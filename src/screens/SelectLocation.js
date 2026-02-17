import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Geolocation from "react-native-geolocation-service";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/slices/locationSlice";
import { scale, verticalScale } from "../utils/styling"; 

const SelectLocation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState(null);
  const [searched, setSearched] = useState(false);

  const safeFetchJson = async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "hospital-app/1.0",
          Accept: "application/json",
        },
      });
      const text = await res.text();
      if (!text.startsWith("{") && !text.startsWith("[")) return null;
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const requestPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "We need access to your location",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};


  const useCurrentLocation = async () => {
  try {
    const ok = await requestPermission();
    if (!ok) {
      alert("Location permission denied");
      return;
    }

    Geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const data = await safeFetchJson(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          if (!data) {
            alert("Unable to fetch address. Try again.");
            return;
          }

          dispatch(
            setLocation({
              address: data.display_name,
              latitude,
              longitude,
            })
          );

          navigation.goBack();
        } catch (err) {
          alert("Something went wrong while fetching address");
        }
      },
      (error) => {
        console.log("Location error:", error);
        alert("Unable to fetch location. Please enable GPS.");
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      }
    );
  } catch (err) {
    alert("Something went wrong");
  }
};

  const searchLocation = (text) => {
    if (timer) clearTimeout(timer);
    setSearched(text.length > 0);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      const data = await safeFetchJson(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text
        )}&format=json&countrycodes=in&addressdetails=1&namedetails=1&extratags=1&accept-language=en&limit=10`
      );

      setResults(Array.isArray(data) ? data : []);
    }, 400);

    setTimer(t);
  };

  const handleSelect = (item) => {
    dispatch(
      setLocation({
        address: item.display_name,
        latitude: item.lat,
        longitude: item.lon,
      })
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
       
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back"
            size={scale(22)}
            color="#111"
          />
        </TouchableOpacity>

        <Text style={styles.title}>Select Location</Text>
      </View>


        <SearchBar
          placeholder="Search for location"
          onChangeText={searchLocation}
        />

        <TouchableOpacity
          style={styles.currentLocationBtn}
          onPress={useCurrentLocation}
        >
          <Ionicons
            name="locate-outline"
            size={scale(18)}
            color="#2563EB"
          />
          <Text style={styles.currentLocationText}>
            Use my current location
          </Text>
        </TouchableOpacity>

        {searched && results.length === 0 ? (
          <View style={styles.noResultWrap}>
            <Text style={styles.noResultText}>No results found</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleSelect(item)}
              >
                <Ionicons
                  name="location-outline"
                  size={scale(18)}
                  color="#111"
                />
                <View style={styles.resultTextWrap}>
                  <Text style={styles.resultTitle}>
                    {item.display_name.split(",")[0]}
                  </Text>
                  <Text style={styles.resultSub} numberOfLines={2}>
                    {item.display_name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    padding: scale(16),
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: verticalScale(14),
},
backBtn: {
  marginRight: scale(6),
  padding: scale(4),
},
title: {
  fontSize: scale(18),
  fontWeight: "700",
},

  currentLocationBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    justifyContent: "center",
    marginBottom: verticalScale(8),
  },
  currentLocationText: {
    marginLeft: scale(8),
    fontSize: scale(14),
    fontWeight: "600",
    color: "#2563EB",
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  resultTextWrap: {
    marginLeft: scale(10),
    flex: 1,
  },
  resultTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#111",
  },
  resultSub: {
    fontSize: scale(12),
    color: "#6B7280",
    marginTop: verticalScale(2),
  },

  noResultWrap: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },
  noResultText: {
    fontSize: scale(14),
    color: "#6B7280",
    fontWeight: "600",
  },
});
