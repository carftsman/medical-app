import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Text
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "react-native";
import api from "../../../api/client";

import LocationHeader from "../../../components/LocationHeader";
import WomenWeCare from "../../../../assets/WomenWeCare.png";

import WomenCategories from "../women/components/WomenCategories";
import WomenSymptoms from "../women/components/WomenSymptoms";
import WomenHospitals from "../women/components/WomenHospitals";
import WomenDoctors from "../women/components/WomenDoctors";
import AddReminderModal from "../women/components/AddReminderModal";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

import { COLORS, FONT, SIZES } from "../../../config/constants";
import { scale, verticalScale } from "../../../utils/styling";

const WomenScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [symptoms, setSymptoms] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  const [showReminderModal, setShowReminderModal] = useState(false);

  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
  fetchWomenCategories();
  fetchWomenSymptoms();
  fetchWomenDoctors();
  fetchWomenHospitals();
}, []);



const onRefresh = async () => {
  try {
    setRefreshing(true);

    await Promise.all([
  fetchWomenCategories(),
  fetchWomenSymptoms(),
  fetchWomenDoctors(),
  fetchWomenHospitals(),
]);


  } catch (err) {
    console.log("Refresh error", err);
  } finally {
    setRefreshing(false);
  }
};

  const fetchWomenCategories = async () => {
    try {
      setLoadingCategories(true);

      const res = await api.get("/hospital/user/categories", {
        params: {
          women: true,
          page: 1,
        },
      });

      setCategories(res.data?.data || []);
    } catch (err) {
      console.log("Women categories error", err);
    } finally {
      setLoadingCategories(false);
    }
  };
  
  const fetchWomenSymptoms = async () => {
  try {
    setLoadingSymptoms(true);

    const res = await api.get("/hospital/user/symptoms", {
      params: {
        women: true,
        page: 1,
      },
    });

    setSymptoms(res.data?.symptoms || []);
  } catch (err) {
    console.log("Women symptoms error", err);
  } finally {
    setLoadingSymptoms(false);
  }
};

const fetchWomenHospitals = async () => {
  try {
    setLoadingHospitals(true);

    const res = await api.get(
      "/hospital/user/hospitals/nearby",
      {
        params: {
          latitude: 17.385,
          longitude: 78.4867,
          radius: 10,
          women: true,
          page: 1,
        },
      }
    );

    setHospitals(res.data?.data || []);
  } catch (err) {
    console.log("Women hospitals error", err);
  } finally {
    setLoadingHospitals(false);
  }
};

const fetchWomenDoctors = async () => {
  try {
    setLoadingDoctors(true);

    const res = await api.get("/hospital/user/doctors", {
      params: {
        lat: 17.385044,
        lng: 78.486671,
        distance: 5,
        women: true,
        mode: "BOTH",
        availability: "ALL",
        page: 1,
        // limit: 3,
      },
    });

    setDoctors(res.data?.doctors || []);
  } catch (err) {
    console.log("Women doctors error", err);
  } finally {
    setLoadingDoctors(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* HEADER */}
<LinearGradient
  colors={["#C084FC", COLORS.pink]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.header}
>
  <View style={styles.headerTop}>
    <LocationHeader />

    <View style={styles.headerIcons}>
      <TouchableOpacity style={styles.icon}>
        <Ionicons
          name="notifications-outline"
          size={22}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <Feather name="user" size={22} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  </View>

 <View style={styles.searchBar}>
  <Ionicons
    name="search-outline"
    size={20}
    color={COLORS.gray}
    style={{ marginRight: scale(10) }}
  />
  <Text
    style={styles.searchPlaceholder}
  >
    Search doctors, specialists...
  </Text>
</View>


</LinearGradient>
        <ScrollView
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={COLORS.pink}          // iOS loader color
      colors={[COLORS.pink]}           // Android loader color
    />
  }
>
          {/* HERO IMAGE */}
          <TouchableOpacity style={styles.heroImageWrapper} activeOpacity={0.9}>
            <Image
              source={WomenWeCare}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* WOMEN CATEGORIES */}
          <WomenCategories
            data={categories}
            loading={loadingCategories}
          />

          {/* FREE HEALTH CHECKUP */}
          <TouchableOpacity activeOpacity={0.95}>
            <LinearGradient
              colors={["#C084FC", COLORS.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.freeCheckupBanner}
            >
              <Text style={styles.freeTitle}>Free Health Checkup</Text>
              <Text style={styles.freeSub}>
                Get personalized health advice from our experts
              </Text>

              <TouchableOpacity style={styles.freeBtn}>
                <Text style={styles.freeBtnText}>Book Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
          {/* SYMPTOMS */}
          <WomenSymptoms
  data={symptoms}
  loading={loadingSymptoms}
/>

          <WomenHospitals
  data={hospitals}
  loading={loadingHospitals}
/>

         <WomenDoctors
  data={doctors}
  loading={loadingDoctors}
/>


          {/* ================= MAKE IT UP (FIGMA STYLE) ================= */}
<View style={styles.makeItWrapper}>
  <View style={styles.makeItLeft}>
    <Text style={styles.makeItTitle}>Make it up with Ease</Text>
    <Text style={styles.makeItSub}>Love India</Text>
  </View>

  <TouchableOpacity
    style={styles.makeItPlusBtn}
    activeOpacity={0.85}
    onPress={() => setShowReminderModal(true)}
  >
    <Text style={styles.makeItPlus}>+</Text>
  </TouchableOpacity>
</View>


          <View style={{ height: verticalScale(90) }} />
        </ScrollView>
      </View>
      <AddReminderModal
  visible={showReminderModal}
  onClose={() => setShowReminderModal(false)}
/>
    </SafeAreaView>
  );
};

export default WomenScreen;

/* STYLES */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, backgroundColor: COLORS.white },

  header: {
  paddingHorizontal: scale(16),
  paddingTop: verticalScale(17),
  paddingBottom: verticalScale(30),
},
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerIcons: { flexDirection: "row" },
  icon: { marginRight: scale(16) },

  searchBar: {
  marginTop: verticalScale(33),
  backgroundColor: COLORS.white,
  borderRadius: scale(10),
  height: verticalScale(50),
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: scale(20),
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 4,
},

searchPlaceholder: {
  fontSize: SIZES.medium,
  color: COLORS.gray,
},


  heroImageWrapper: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(17),
    borderRadius: scale(10),
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: verticalScale(170),
  },

  freeCheckupBanner: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(24),
    borderRadius: scale(18),
    padding: scale(20),
  },

  freeTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },

  freeSub: {
    fontSize: SIZES.small,
    color: COLORS.white,
    marginTop: verticalScale(6),
    maxWidth: scale(280),
  },

  freeBtn: {
    marginTop: verticalScale(14),
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(23),
    paddingVertical: verticalScale(12),
    borderRadius: scale(12),
    alignSelf: "flex-start",
  },

  freeBtnText: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: "#A855F7",
  },
  /* ================= MAKE IT UP – SMOKY FIGMA STYLE ================= */

makeItWrapper: {
  marginTop: verticalScale(105),
  marginBottom: verticalScale(60),
  paddingHorizontal: scale(25),

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

makeItLeft: {
  flex: 1,
},

makeItTitle: {
  fontSize: scale(30), 
  paddingRight: scale(80),        
  fontFamily: FONT.bold,
  color: COLORS.pink,
  opacity: 0.45,                
},

makeItSub: {
  marginTop: verticalScale(10),
  fontSize: scale(16),
  color: COLORS.pink,
  opacity: 0.25,                
},

makeItPlusBtn: {
  width: scale(64),             
  height: scale(64),
  borderRadius: scale(32),
  backgroundColor: COLORS.pink,

  justifyContent: "center",
  alignItems: "center",
},

makeItPlus: {
  fontSize: scale(38),          // 🔥 bold +
  color: COLORS.white,
  fontWeight: "700",
  lineHeight: scale(42),
},

});
