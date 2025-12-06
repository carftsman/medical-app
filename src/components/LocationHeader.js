import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { Linking } from "react-native";


export default function App() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        requestPermissionAndStart();
    }, []);

    const requestPermissionAndStart = async () => {
        if (Platform.OS === "android") {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                return;
            }
        }

        startLiveTracking();
    };

    const startLiveTracking = () => {
        Geolocation.watchPosition(
            async (pos) => {
                const coords = pos.coords;
                setLocation(coords);

                // Reverse geocode using Nominatim API 
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
                    );
                    const data = await res.json();
                    setAddress(data.address || null);
                } catch (err) {
                    console.log("Reverse geocode error:", err);
                }
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                interval: 2000,
                fastestInterval: 1000,
                distanceFilter: 1,
            }
        );
    };

    const openInGoogleMaps = () => {
        if (!location) return;

        const url = `https://www.google.com/maps/?q=${location.latitude},${location.longitude}`;

        Linking.openURL(url);
    };


    // Build a single line address for header (similar to your image)
    const headerTitle = () => {
        if (!address) return "Fetching location...";

        // prefer nicer readable items
        const parts = [];
        // e.g. road/building/house name
        if (address.house_number && address.road) parts.push(`${address.house_number} ${address.road}`);
        else if (address.road) parts.push(address.road);
        else if (address.pedestrian) parts.push(address.pedestrian);
        else if (address.neighbourhood) parts.push(address.neighbourhood);

        // area/suburb/village
        if (address.suburb) parts.push(address.suburb);
        else if (address.village) parts.push(address.village);
        else if (address.town) parts.push(address.town);

        // city / county fallback
        if (address.city) parts.push(address.city);
        else if (address.county) parts.push(address.county);

        // state
        if (address.state) parts.push(address.state);

        // join and limit length to avoid overflow
        const left = parts.join(", ");

        // postcode
        const postcode = address.postcode ? address.postcode : "";

        // If left is empty, fallback to display village/town/state/postcode
        const fallback = [address.village || address.town || address.city || address.state, postcode]
            .filter(Boolean)
            .join(", ");

        return left || fallback || "Unknown location";
    };

    const headerSubtitle = () => {
        if (!address) return "";
        // Try to show a shorter second line if road + area shown above
        // We'll show something like "PB House, pathriganagar, dhatvi bs" if available
        const subParts = [];
        if (address.road) subParts.push(address.road);
        if (address.suburb) subParts.push(address.suburb);
        if (address.village) subParts.push(address.village);
        return subParts.join(", ");
    };

    return (
        <View style={styles.container}>
            {/* Top header: logo/icon + address */}
            <View style={styles.topHeader}>
                {/* Logo/Image on left */}
                <TouchableOpacity onPress={openInGoogleMaps}>
                    <Image
                        source={require("../../assets/location.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>


                {/* Address block */}
                <View style={styles.addressBlock}>
                    <Text style={styles.locationName}>{address?.city || address?.village || "Location"}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationDetail}>
                        {headerTitle()}
                        {address?.postcode ? ` • ${address.postcode}` : ""}
                    </Text>
                    {/* optional second line (smaller)
                    {headerSubtitle() ? (
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.locationSmall}>
                            {headerSubtitle()}
                        </Text>
                    ) : null} */}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 0,
        paddingLeft: 2,
        paddingRight: 16,
        paddingVertical: 8,
        backgroundColor:"#E9F5FF",
        height: 50,
    },
    logo: {
        width: 20,
        height: 20,
        borderRadius: 8,
        marginRight: 4,
        backgroundColor:"#E9F5FF",
    },
    addressBlock: {
        flex: 1,
        justifyContent: "center",
        transform: [{ translateY: 2 }],
    },
    locationName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },
    locationDetail: {
        fontSize: 11,
        color: "#333",
        marginTop: 2,
    },
    locationSmall: {
        fontSize: 10,
        color: "#666",
        marginTop: 2,
    },


});  