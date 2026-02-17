import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Modal,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  Button
} from "react-native";

import LocationHeader from "../components/LocationHeader";
import NotificationHeader from "../components/NotificationHeader";
import SearchBar from "../components/SearchBar";
import ServiceBlock from "../components/ServiceBlock";
import LinearGradient from "react-native-linear-gradient";
import { scale, verticalScale } from "../utils/styling";
import useAuth from "../hooks/useAuth";
import Clipboard from "@react-native-clipboard/clipboard";
import SOSButton from "../components/SosButton";
import Geolocation from "react-native-geolocation-service";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../redux/slices/locationSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {

  const { handleLogout } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { address } = useSelector(state => state.location);

  const [showLocationModal, setShowLocationModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!address) {
        setShowLocationModal(true);
      }
    }, [address])
  );

  const askLocationPermission = async () => {
    setShowLocationModal(false);

    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          navigation.navigate("SelectLocation");
          return;
        }
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  "User-Agent": "hospital-app/1.0",
                },
              }
            );

            const data = await response.json();

            dispatch(
              setLocation({
                address: data?.display_name || "Current Location",
                latitude,
                longitude,
              })
            );
          } catch (err) {
            console.log("Reverse geocode error", err);
          }
        },
        (error) => {
          navigation.navigate("SelectLocation");
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
        }
      );
    } catch (err) {
      navigation.navigate("SelectLocation");
    }
  };



  const copyCode = (text) => {
    const code = text.replace("CODE:", "").trim();
    Clipboard.setString(code);

    if (Platform.OS === "android") {
      ToastAndroid.show("Coupon code copied", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

     
     <LinearGradient
        colors={[ "#155DFC","#00BBA7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.topHeaderWrapper}
      >
        <View style={styles.headerRow}>
          <View style={styles.leftWrap}>
            <LocationHeader />
          </View>
          <View style={styles.rightWrap}>
            <NotificationHeader />
          </View>
        </View>

        <SearchBar placeholder="Search medicines, healthcare…" />
      </LinearGradient>

      {/* <Button title="logout" onPress={handleLogout}/> */}

      
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SERVICES */}
        <ServiceBlock />

        {/* FIND YOUR BEST DOCTOR */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Find your Best Doctor</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { img: require("../../assets/doctorin30.png"), text: "Doctor in mins" },
              { img: require("../../assets/Calltobook.png"), text: "Call to book" },
              { img: require("../../assets/WomanHealth.png"), text: "Woman Health" },
              { img: require("../../assets/Dochome.png"), text: "Find best Doctor" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.doctorCard}>
                <View style={styles.doctorImgWrap}>
                  <Image source={item.img} style={styles.doctorImg} />
                </View>
                <View style={styles.doctorTextWrap}>
                  <Text style={styles.doctorText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* BEST DEALS */}
        <View style={styles.dealsContainer}>
          <Image
            source={require("../../assets/tag.png")} 
            style={styles.dealIcon}
          />
          <View>
            <Text style={styles.dealTitle}>Best deals on medicines</Text>
            <Text style={styles.dealSub}>Lowest Prices Guaranteed</Text>
          </View>
        </View>

        {/* LAB TESTS BY CONCERNS */}
        <View style={styles.labHeader}>
          <Text style={styles.labTitle}>Lab Tests by Concerns</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.labGrid}
        >
          {[
            { id: 1, name: "Diabetes", img: require("../../assets/diabetes.png") },
            { id: 2, name: "Thyroid", img: require("../../assets/thyroid.png") },
            { id: 3, name: "Women Care", img: require("../../assets/women.png") },
            { id: 4, name: "Blood Test", img: require("../../assets/blood.png") },
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.labCard, { marginRight: 12 }]}
            >
              <View style={styles.labImgWrap}>
                <Image source={item.img} style={styles.labImage} />
              </View>
              <View style={styles.labTextWrap}>
                <Text style={styles.labText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.shopSection}>
          <Text style={styles.shopTitle}>Shop Smarter Save Better</Text>

          <View style={styles.shopRow}>
            <LinearGradient
              colors={["#AD46FF", "#F6339A"]}
              style={styles.shopCard}
            >
              <Text style={styles.shopOffer}>FLAT 25% OFF</Text>
              <Text style={styles.shopSub}>On First Order</Text>
              <TouchableOpacity
                style={styles.shopCodnveBox}
                onPress={() => copyCode("CODE: NEW25")}
              >
                <Text style={styles.shopCodeBox}>CODE: NEW25</Text>
              </TouchableOpacity>


            </LinearGradient>

            <LinearGradient
              colors={["#FF6900", "#FB2C36"]}
              style={styles.shopCard}
            >
              <Text style={styles.shopOffer}>Free Delivery</Text>
              <Text style={styles.shopSub}>On Orders ₹499+</Text>
              <View style={styles.shopCodeBoxMuted}>
                <Text style={styles.shopCode}>NO CODE</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* SHOP BY CATEGORY */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Shop by Category</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {[
            { img: require("../../assets/PainRelief.png"), text: "Pain Relief" },
            { img: require("../../assets/Babycare.png"), text: "Baby Care" },
            { img: require("../../assets/womankit.png"), text: "Woman Kit" },
            { img: require("../../assets/Ayurvedic.png"), text: "Ayurveda" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={[styles.categoryCard, { marginRight: 14 }]}>
              <View style={styles.categoryImgWrap}>
                <Image source={item.img} style={styles.categoryImg} />
              </View>
              <Text style={styles.categoryText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      
        <LinearGradient
      colors={["#FF9A00", "#FF6A00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.left}>
        <Text style={styles.title}>Health Plus Membership</Text>
        <Text style={styles.sub}>
          Unlimited consultations &{"\n"}free tests
        </Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Join Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.diamondIcon}>💎</Text>

    </LinearGradient>
  

      
        <View style={styles.sosWrapper}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTextLine1}>
              Make it up
            </Text>
            <Text style={styles.sosTextLine2}>
              with <Text style={{ fontWeight: '800' }}>TRUST</Text>
            </Text>
            <Text style={styles.sosTextLine3}>
              Love India ❤️
            </Text>
          </View>
        </View>
      </ScrollView>
      
          <SOSButton/>
      
      <Modal visible={showLocationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>📍 Enable Location</Text>
            <Text style={styles.modalText}>
              Allow location access to show nearby labs and faster service.
            </Text>

            <TouchableOpacity
              style={styles.allowBtn}
              onPress={askLocationPermission}
            >
              <Text style={styles.allowText}>Allow Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.manualBtn}
              onPress={() => {
                setShowLocationModal(false);
                navigation.navigate("SelectLocation");
              }}
            >
              <Text style={styles.manualText}>Enter Manually</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeaderWrapper: {
    backgroundColor: "#E9F5FF",
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(16),
    height: verticalScale(170),
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(50),
    marginBottom: verticalScale(15),
  },

  leftWrap: { flex: 1 },
  rightWrap: {},

  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: verticalScale(120) },

  sectionWrapper: { marginTop: verticalScale(20) },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    marginLeft: scale(16),
    marginBottom: verticalScale(18),
  },

  doctorCard: {
    // width: scale(95),
    backgroundColor: "#FFF",
    borderRadius: scale(12),
    marginHorizontal: scale(8),
  },

  doctorImgWrap: {
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    paddingVertical: verticalScale(8),
  },

  doctorImg: {
    width: scale(90),
    height: scale(90),
    resizeMode: "cover",
  },

  doctorTextWrap: {
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },

  doctorText: {
    fontSize: scale(14),
    textAlign: "center",
    fontWeight: "600",
    color: "#333",
    marginBottom: verticalScale(10),
  },

  dealsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14c279ff",
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    padding: scale(14),
    marginTop: verticalScale(16),
  },

  dealIcon: {
    width: scale(50),
    height: scale(50),
    marginRight: scale(12),
  },

  dealTitle: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "600",
  },

  dealSub: {
    color: "#fff",
    fontSize: scale(18),
    marginTop: verticalScale(2),
  },

  labHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(16),
    marginTop: verticalScale(25),
  },

  labTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#111",
    marginTop: verticalScale(10),
  },

  labCard: {
    // width: scale(100),
    backgroundColor: "#FFF",
    borderRadius: scale(12),
    marginHorizontal: scale(8),
  },

  labGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(6),
    marginTop: verticalScale(14),
  },

  labItem: {
    width: "22%",
  },

  labImage: {
    width: scale(100),
    height: scale(90),
    resizeMode: "cover",
    borderRadius: scale(50),
  },

  labImgWrap: {
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    width: scale(100),
    height: scale(90),
    borderRadius: scale(50),
  },

  labTextWrap: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(4),
    alignItems: "center",
  },

  labText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  shopSection: {
    marginTop: verticalScale(20),
    marginHorizontal: scale(16),
  },

  shopTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    marginBottom: verticalScale(17),
  },

  shopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  shopCard: {
    width: "48%",
    borderRadius: scale(16),
    padding: scale(16),
  },

  shopOffer: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "800",
  },

  shopSub: {
    color: "#FFF",
    fontSize: scale(13),
    marginTop: verticalScale(4),
  },

  shopCodeBox: {
    marginTop: verticalScale(12),
    backgroundColor: "#FFF",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(14),
    alignSelf: "flex-start",
  },

  shopCodeBoxMuted: {
    marginTop: verticalScale(12),
    backgroundColor: "#FFF",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(13),
    alignSelf: "flex-start",
  },

  shopCode: {
    color: "#9810FA",
    fontSize: scale(12),
    fontWeight: "700",
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(16),
    marginTop: verticalScale(24),
  },

  categoryTitle: {
    fontSize: scale(20),
    fontWeight: "700",
  },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(16),
    marginTop: verticalScale(14),
  },

  categoryCard: {
    alignItems: "center",
    
  },

  categoryImgWrap: {
    width: scale(105),
    height: scale(100),
    borderRadius: scale(12),
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryImg: {
    width: scale(100),
    height: scale(100),
    resizeMode: "cover",
  },

  categoryText: {
    marginTop: verticalScale(6),
    fontSize: scale(14),
    textAlign: "center",
  },

  membershipCard: {
    flexDirection: "row",
    backgroundColor: "#FF8C00",
    marginHorizontal: scale(16),
    marginTop: verticalScale(24),
    borderRadius: scale(16),
    padding: scale(16),
    alignItems: "center",
  },

  membershipTitle: {
    color: "#FFF",
    fontSize: scale(16),
    fontWeight: "800",
  },

  membershipSub: {
    color: "#FFF",
    fontSize: scale(12),
    marginTop: verticalScale(4),
  },

  joinBtn: {
    backgroundColor: "#FFF",
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(12),
    marginTop: verticalScale(10),
    alignSelf: "flex-start",
  },

  joinText: {
    color: "#FF8C00",
    fontWeight: "700",
    fontSize: scale(12),
  },

  membershipImg: {
    width: scale(60),
    height: scale(60),
    resizeMode: "contain",
  },

  card: {
    marginHorizontal: scale(10),
    marginTop: verticalScale(24),
    borderRadius: scale(18),
    padding: scale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },

  left: {
    paddingRight: scale(10),
  },

  title: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#FFF",
    marginBottom: verticalScale(6),
  },

  sub: {
    fontSize: scale(15),
    color: "#FFF",
    lineHeight: scale(18),
    marginBottom: verticalScale(12),
  },

  btn: {
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(8),
    borderRadius: scale(14),
  },

  btnText: {
    color: "#FF6A00",
    fontWeight: "700",
    fontSize: scale(13),
  },

  diamondIcon: {
    paddingRight: scale(10),
    fontSize: scale(70),
  },

  sosTextLine1: {
    fontSize: scale(40),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(1),
    marginTop: verticalScale(-4),
    paddingLeft: scale(15),
  },

  sosTextLine2: {
    fontSize: scale(40),
    paddingLeft: scale(15),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(0.5),
    marginTop: verticalScale(2),
  },

  sosTextLine3: {
    fontSize: scale(27),
    paddingLeft: scale(15),
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: scale(0.5),
    marginTop: verticalScale(2),
  },
  sosOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "transparent",
  zIndex: 1,
},


  

  sosMainBtn: { 
    width: 64,
    height: 64, 
    borderRadius: 32, 
    backgroundColor: "#FF0000", 
    alignItems: "center", 
    justifyContent: "center", 
    elevation: 8, 
  },
  sosText: {
    color: "#fff",
    fontWeight: "800", 
    fontSize: 16,
   },

  floatingSos: {
    position: "absolute",
    bottom: verticalScale(110),
    right: scale(20),
    zIndex: 999,
    elevation: 10,
  },

  sosContainer: {
    position: "absolute",
    bottom: verticalScale(130),
    right: scale(20),
    alignItems: "center",
    justifyContent: "center",
    zIndex:2
    
  },
  sosMiniBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: "#FF0000", 
    alignItems: "center", 
    justifyContent: "center", 
    position: "absolute", 
    elevation: 6, 
  }, 
  /* positions */ 
  sosTop: { bottom: 75, right: 50 }, 
  sosLeft: { right: 78, }, 
  sosBottom: { top: 75, right:50 },

    modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: scale(20),
    fontWeight: "700",
    marginBottom: 10,
  },

  modalText: {
    fontSize: scale(14),
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },

  allowBtn: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  allowText: {
    color: "#FFF",
    fontWeight: "700",
  },

  manualBtn: {
    paddingVertical: 8,
  },

  manualText: {
    color: "#2563EB",
    fontWeight: "600",
  },
})

