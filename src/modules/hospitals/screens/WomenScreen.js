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

import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();
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
        distance: 50,
        women: true,
        mode: "BOTH",
        availability: "ALL",
        page: 1,
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
    <View style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* HEADER */}
<LinearGradient
  colors={[COLORS.purple, COLORS.pink]}
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

 <TouchableOpacity
  style={styles.searchBar}
  activeOpacity={0.8}
  onPress={() => navigation.navigate("WomenSearchScreen")}
>
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
</TouchableOpacity>
</LinearGradient>
        <ScrollView
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={COLORS.pink}          
      colors={[COLORS.pink]}           
    />
  }
>
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

          {/* Banner */}
          <TouchableOpacity activeOpacity={0.95}>
            <LinearGradient
              colors={[COLORS.purple, COLORS.pink]}
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
{/* Hospitals */}
          <WomenHospitals
  data={hospitals}
  loading={loadingHospitals}
/>
{/* Doctors */}
         <WomenDoctors
  data={doctors}
  loading={loadingDoctors}
/>


          {/*MAKE IT UP  */}
 <View style={styles.makeItWrapper}>
  <View style={styles.makeItLeft}>
    <Text style={styles.makeItTitle}>Make it up with Ease</Text>
    <Text style={styles.makeItSub}>Love India</Text>
  </View>
</View> 


          <View style={{ height: verticalScale(90) }} />
        </ScrollView>
          {/* REMINDER BUTTON */}
<TouchableOpacity
  style={styles.floatingButton}
  activeOpacity={0.85}
  onPress={() => setShowReminderModal(true)}
>
  <Text style={styles.floatingPlus}>+</Text>
</TouchableOpacity>
      </View>

      <AddReminderModal
  visible={showReminderModal}
  onClose={() => setShowReminderModal(false)}
/>
    </View>
  );
};

export default WomenScreen;

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
  shadowColor:COLORS.black,
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
    color: COLORS.purple,
  },

makeItWrapper: {
  marginTop: verticalScale(50),
  marginBottom: verticalScale(30),
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
  fontSize: scale(38),         
  color: COLORS.white,
  fontWeight: "700",
  lineHeight: scale(42),
},

floatingButton: {
  position: "absolute",
  bottom: verticalScale(115), // adjust if needed
  right: scale(20),
  width: scale(64),
  height: scale(64),
  borderRadius: scale(32),
  backgroundColor: COLORS.pink,
  justifyContent: "center",
  alignItems: "center",
  elevation: 10,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
},

floatingPlus: {
  fontSize: scale(36),
  color: COLORS.white,
  fontWeight: "700",
},
});
