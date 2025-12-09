// src/components/ServiceBlock.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Added navigation hook

export default function ServiceBlock() {
  const navigation = useNavigation(); // get navigation instance

  const services = [
    {
      id: "hospitals",
      title: "Hospitals",
      subtitle: "You can get the \n best Treatment",
      icon: require("../../assets/hospital.png"),
      screen: "Hospitals",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      subtitle: "Fast Delivery Available !",
      icon: require("../../assets/pha.png"),
      screen: "Pharmacy",
    },
    {
      id: "labtests",
      title: "Lab Tests",
      subtitle: "Get Reports Easy!",
      icon: require("../../assets/lab.png"),
      screen: "LabTests",
    },
  ];

  return (
    <View style={styles.wrapper}>
      {/* LEFT BIG CARD */}
      <TouchableOpacity
        style={styles.leftCard}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(services[0].screen)}
      >
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{services[0].title}</Text>
        </View>

        <Image
          source={require("../../assets/sthe.png")}
          style={styles.stethoIcon}
        />

        <Text numberOfLines={2} style={styles.cardSubtitle}>
          {services[0].subtitle}
        </Text>

        <Image source={services[0].icon} style={styles.leftImage} />
      </TouchableOpacity>

      {/* RIGHT COLUMN */}
      <View style={styles.rightColumn}>
        {/* Pharmacy */}
        <TouchableOpacity
          style={styles.pharmacyCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(services[1].screen)}
        >
          <Text style={styles.cardTitleSmall}>{services[1].title}</Text>
          <Text numberOfLines={1} style={styles.cardSubtitleSmall}>
            {services[1].subtitle}
          </Text>

          <View style={styles.cardImageWrap}>
            <Image source={services[1].icon} style={styles.rightImage} />
          </View>
        </TouchableOpacity>

        {/* Lab Tests */}
        <TouchableOpacity
          style={styles.labCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate(services[2].screen)}
        >
          <View style={styles.labInner}>
            <View style={styles.labTextWrap}>
              <Text numberOfLines={1} style={styles.cardTitleSmall}>
                {services[2].title}
              </Text>
              <Text numberOfLines={2} style={styles.cardSubtitleSmall}>
                {services[2].subtitle}
              </Text>
            </View>

            <Image source={services[2].icon} style={styles.labImageRight} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// LEFT CARD HEIGHT
const LEFT_HEIGHT = 220;
const GAP_BETWEEN = 8;

// 65/35 split
const PHARMACY_HEIGHT = Math.round(LEFT_HEIGHT * 0.65); // 143
const LAB_HEIGHT = LEFT_HEIGHT - PHARMACY_HEIGHT - GAP_BETWEEN; // 69

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
  },

  // /* LEFT CARD */
  // leftCard: {
  //   width: "48%",
  //   height: LEFT_HEIGHT,
  //   backgroundColor: "#fff",
  //   borderRadius: 16,
  //   marginRight: 8,

  //   paddingTop: 12, 
  //   paddingHorizontal: 12,
  //   paddingBottom: 10,

  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 6 },
  //   shadowOpacity: 0.22,
  //   shadowRadius: 12,
  //   elevation: 6,
  //   borderWidth: 0.5,
  //   borderColor: "rgba(10, 10, 10, 0.2)",
  // },
leftCard: {
  width: "48%",
  height: LEFT_HEIGHT,
  backgroundColor: "#E9F9EB",
  borderRadius: 16,
  marginRight: 8,
  paddingTop: 12,
  paddingHorizontal: 12,
  paddingBottom: 10,

  borderWidth: 1.2,
  borderColor: "#8DD19A",

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
},


  leftImage: {
    width: 180,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 12, 
    borderRadius: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stethoIcon: {
    position: "absolute",
    right: -12,   
    top: 1,     
    width: 90,   
    height: 100,  
    resizeMode: "contain",
    transform: [{ translateY: -20 }],
  },

  /* RIGHT COLUMN */
  rightColumn: {
    width: "48%",
  },

  // /* Pharmacy */
  // pharmacyCard: {
  //   height: PHARMACY_HEIGHT,
  //   backgroundColor: "#fff",
  //   borderRadius: 14,
  //   overflow: "hidden",
  //   marginBottom: GAP_BETWEEN,

  //   paddingTop: 5,
  //   paddingHorizontal: 12,

  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.12,
  //   shadowRadius: 12,
  //   elevation: 6,
  //   borderWidth: 0.5,
  //   borderColor: "rgba(10, 10, 10, 0.2)",
  // },

  pharmacyCard: {
  height: PHARMACY_HEIGHT,
  backgroundColor: "#F5ECFF",
  borderRadius: 14,
  overflow: "hidden",
  marginBottom: GAP_BETWEEN,

  paddingTop: 5,
  paddingHorizontal: 12,

  borderWidth: 1.2,
  borderColor: "#C29DEB",

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
},


  cardImageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },

  rightImage: {
    width: 150,
    height: 100,
    maxHeight: 100,
    resizeMode: "contain",
  },

  // /* LAB CARD */
  // labCard: {
  //   height: LAB_HEIGHT,
  //   backgroundColor: "#fff",
  //   borderRadius: 14,
  //   paddingTop: 4,
  //   paddingHorizontal: 12,

  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 3 },
  //   shadowOpacity: 0.12,
  //   shadowRadius: 12,
  //   elevation: 6,
  //   borderWidth: 0.5,
  //   borderColor: "rgba(10, 10, 10, 0.2)",
  // },
  labCard: {
  height: LAB_HEIGHT,
  backgroundColor: "#FFEAEA",
  borderRadius: 14,
  paddingTop: 4,
  paddingHorizontal: 12,

  borderWidth: 1.2,
  borderColor: "#E78B8B",

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
},


  labInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },

  labTextWrap: {
    flex: 1,
  },

  labImageRight: {
    width: 52,
    height: 75,
    marginLeft: 8,
    resizeMode: "contain",
  },

  /* TEXT STYLES */
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  cardTitleSmall: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  cardSubtitleSmall: {
    fontSize: 12.5,
    color: "#777",
    marginTop: 2,
  },
});
