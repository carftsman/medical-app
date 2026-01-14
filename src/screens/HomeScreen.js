import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationHeader from "../components/LocationHeader";
import NotificationHeader from "../components/NotificationHeader";
import SearchBar from "../components/SearchBar";
import ServiceBlock from "../components/ServiceBlock";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from '../utils/styling';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native";
import useAuth from "../hooks/useAuth";

export default function HomeScreen() {
  const [showSOS, setShowSOS] = React.useState(false);

  const {handleLogout} = useAuth()

  const copyCode = () => {
    Alert.alert("Coupon Code", "NEW25 copied");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
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

      <Button title="logout" onPress={handleLogout}/>

      
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

        {/* SHOP SMARTER SAVE BETTER */}
        <View style={styles.shopSection}>
          <Text style={styles.shopTitle}>Shop Smarter Save Better</Text>

          <View style={styles.shopRow}>
            <LinearGradient
              colors={["#AD46FF", "#F6339A"]}
              style={styles.shopCard}
            >
              <Text style={styles.shopOffer}>FLAT 25% OFF</Text>
              <Text style={styles.shopSub}>On First Order</Text>
              <TouchableOpacity style={styles.shopCodnveBox} onPress={copyCode}>
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
      {/* Floating SOS button */}
      
<View style={styles.sosContainer}>
  {showSOS && (
    <>
      {/* CALL */}
      <TouchableOpacity style={[styles.sosMiniBtn, styles.sosTop]}>
        <Ionicons name="call" size={22} color="#fff" />
      </TouchableOpacity>

      {/* LOCATION */}
      <TouchableOpacity style={[styles.sosMiniBtn, styles.sosLeft]}>
        <Ionicons name="location" size={22} color="#fff" />
      </TouchableOpacity>

      {/* AMBULANCE */}
      <TouchableOpacity style={[styles.sosMiniBtn, styles.sosBottom]}>
        <MaterialCommunityIcons name="ambulance" size={22} color="#fff" />
      </TouchableOpacity>
    </>
  )}

  {/* MAIN SOS BUTTON */}
  <TouchableOpacity
    style={styles.sosMainBtn}
    activeOpacity={0.8}
    onPress={() => setShowSOS(!showSOS)}
  >
    <Text style={styles.sosText}>SOS</Text>
  </TouchableOpacity>
</View>

          {/* SOS text + button section
          <View style={styles.sosWrapper}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sosTextLine1}>Make it up</Text>
              <Text style={styles.sosTextLine2}>
                with <Text style={{ fontWeight: '800' }}>TRUST</Text>
              </Text>
              <Text style={styles.sosTextLine3}>Love India ❤️</Text>
            </View>
          </View>
        </ScrollView> */}
        {/* Floating SOS button */}
        {/* <TouchableOpacity style={styles.floatingSos} activeOpacity={0.85}>
          <Image
            source={require('../../assets/sos.png')}
            style={styles.sosButton}
          />
        </TouchableOpacity> */}
      
    </SafeAreaView>
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

  
})

