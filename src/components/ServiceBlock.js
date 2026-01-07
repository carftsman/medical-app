import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "../utils/styling";

export default function ServiceBlock() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/*  BANNER */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <View style={styles.megaSale}>
            <Text style={styles.megaText}>MEGA SALE</Text>
          </View>

          <Text style={styles.bannerTitle}>UPTO 70% OFF</Text>
          <Text style={styles.bannerSub}>On healthcare products</Text>

          <TouchableOpacity style={styles.shopBtn}>
            <Text style={styles.shopText}>Shop Now</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/bannerpic.png")}
          style={styles.bannerImg}
        />
      </View>

      
      <View style={styles.row}>
        {/* LAB */}
        <TouchableOpacity
          style={[styles.smallCard, styles.labBg]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("LabTests")}
        >
          <Text style={styles.cardTitle}>Lab Tests</Text>
          <Text style={styles.cardSub}>Get Reports Easy!</Text>

          <Image
            source={require("../../assets/labhome.png")}
            style={styles.smallImg}
          />
        </TouchableOpacity>

        {/* PHARMACY */}
        <TouchableOpacity
          style={[styles.smallCard, styles.pharmacyBg]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Pharmacy")}
        >
          <Text style={styles.cardTitle}>Pharmacy</Text>
          <Text style={styles.cardSub}>Fast Delivery Available!</Text>

          <Image
            source={require("../../assets/Pharmacyhome.png")}
            style={styles.smallImg}
          />
        </TouchableOpacity>
      </View>

      {/* HOSPITAL*/}
      <TouchableOpacity
        style={styles.hospitalCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Hospitals")}
      >
        <View style={styles.hospText}>
          <Text style={styles.hospitalTitle}>Hospitals</Text>
          <Text style={styles.hospitalSub}>Get the best treatment</Text>
        </View>

        <Image
          source={require("../../assets/hosp.logo.png")}
          style={styles.hospitalImg}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(12),
  },

  
  banner: {
    backgroundColor: "#3B82F6",
    borderRadius: scale(18),
    flexDirection: "row",
    paddingLeft:scale(16),
    alignItems: "center",
    justifyContent:"space-between"
  },

  bannerLeft: {
    paddingRight: scale(8),
  },

  megaSale: {
    backgroundColor: "#FACC15",
    alignSelf: "flex-start",
    borderRadius: scale(6),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    marginBottom: verticalScale(6),
  },

  megaText: {
    fontSize: scale(10),
    fontWeight: "800",
    color: "#000",
  },

  bannerTitle: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#FFFFFF",
  },

  bannerSub: {
    fontSize: scale(12),
    color: "#E0EAFF",
    
  },

  shopBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginTop: verticalScale(6),
    alignSelf: "flex-start",
  },

  shopText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: scale(12),
  },

  bannerImg: {
    width: scale(120),
    height: scale(150),
    resizeMode: "cover",
    
  },

  /* LAB & PHARMACY */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(14),
  },

  smallCard: {
    width: "48%",
    borderRadius: scale(14),
    paddingTop: scale(14),
    paddingLeft: scale(14),
    height: verticalScale(140),
    justifyContent: "space-between",
  },

  labBg: {
    backgroundColor: "#D2E6FF",
  },

  pharmacyBg: {
    backgroundColor: "#DDF4F5",
  },

  cardTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#111",
  },

  cardSub: {
    fontSize: scale(12),
    color: "#666",
    marginTop: verticalScale(2),
  },

  smallImg: {
    width: scale(85),
    height: scale(85),
    resizeMode: "cover",
    alignSelf: "center",
  },

  /*HOSPITAL */
  hospitalCard: {
    backgroundColor: "#DEFFE2",
    borderRadius: scale(18),
    paddingLeft: scale(16),
    marginTop: verticalScale(14),
    flexDirection: "row",
    justifyContent: "space-between",
    
  },

  hospText: {
    flex: 1,
    paddingTop:scale(10)
  },

  hospitalTitle: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#111",
  },

  hospitalSub: {
    fontSize: scale(13),
    color: "#555",
    marginTop: verticalScale(4),
  },

  hospitalImg: {
    width: scale(170),
    height: scale(110),
    resizeMode: "cover",
    borderRadius:scale(18)
  },
});
