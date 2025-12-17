import React from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LocationHeader from "../components/LocationHeader";
import NotificationHeader from "../components/NotificationHeader";
import SearchBar from "../components/SearchBar";
import ServiceBlock from "../components/ServiceBlock";



export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      
      <StatusBar 
              translucent
              backgroundColor="transparent" 
              barStyle="dark-content"
            />       
      {/* Header */}
      <View style={styles.topHeaderWrapper}>
        <View style={styles.headerRow}>
          <View style={styles.leftWrap}><LocationHeader /></View>
          <View style={styles.rightWrap}><NotificationHeader /></View>
        </View>

        {/* Search bar */}
        <SearchBar placeholder="Search doctor, drugs, tests..." />
      </View>

      {/* <LinearGradient
        colors={["#e6f0fa", "#ffffff"]} 
        style={styles.gradientBackground}
      > */}

      {/* Scrollable content */}
      <ScrollView
         style={styles.scrollContainer}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
      >
        <View style={styles.capsuleWrapper}>
          <View style={styles.capsuleCard}>
            <Text style={styles.capsuleTitle}>All your healthcare needs in one place</Text>
            <Text style={styles.capsuleSubtitle}>
              Consult doctors • Order medicines • Book lab tests
            </Text>
          </View>
        </View>


        <ServiceBlock />

        <View style={{ marginTop: 16 }}>
          {/* Other content goes here */}
        </View>

        <Image
          source={require("../../assets/banner.png")}
          style={styles.banner}
          resizeMode="contain"
        />

        {/* SOS text + button section */}
        <View style={styles.sosWrapper}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTextLine1}>Make it up</Text>
            <Text style={styles.sosTextLine2}>with <Text style={{ fontWeight: '800' }}>TRUST</Text></Text>
            <Text style={styles.sosTextLine3}>Love India ❤️</Text>
          </View>

        </View>


      </ScrollView>
      {/* Floating SOS button */}
      <TouchableOpacity style={styles.floatingSos} activeOpacity={0.85}>
        <Image
          source={require("../../assets/sos.png")}
          style={styles.sosButton}
        />
      </TouchableOpacity>


      {/* </LinearGradient> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /*safeArea: { flex: 1, backgroundColor: "#fff" },*/
topHeaderWrapper: {
  backgroundColor: "#E9F5FF",
  paddingBottom: 1,
  paddingTop: 10,
  paddingHorizontal: 16,   
},



  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 50,
  },
  leftWrap: { flex: 1 },
  rightWrap: { justifyContent: "center" },

  capsuleWrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
    
  },

  // capsuleCard: {
  //   paddingVertical: 14,
  //   paddingHorizontal: 12,
  //   borderRadius: 12,
  //   backgroundColor: "#fff",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.06,
  //   shadowRadius: 10,
  //   shadowOffset: { width: 0, height: 4 },
  //   elevation: 3,
  //   borderWidth: 0.5,
  //   borderColor: "rgba(10, 10, 10, 0.2)",
  // },

  capsuleCard: {
  paddingVertical: 14,
  paddingHorizontal: 12,
  borderRadius: 12,
  backgroundColor: "#FFF6E9",

  borderWidth: 1.2,
  borderColor: "#E4B856",

  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
},


  capsuleTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
    alignSelf: "center",
  },

  capsuleSubtitle: {
    fontSize: 13.3,
    color: "#555",
    marginTop: 2,
    alignSelf: "center",
  },

  banner: {
    width: "90%",
    height: undefined,
    aspectRatio: 2.5,
    alignSelf: "center",
    marginBottom: 20,
  },

  gradientBackground: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    marginTop: 8,
  },

  sosWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 18,
  },


  sosTextLine1: {
    fontSize: 45,
    fontFamily: "serif",
    fontWeight: "800",
    color: "#A9C1DB",
    letterSpacing: 1,
  },


  sosTextLine2: {
    fontSize: 45,
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: 1,
    marginTop: -4,
  },

  sosTextLine3: {
    fontSize: 28,
    fontFamily: "serif",
    color: "#A9C1DB",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  floatingSos: {
    position: "absolute",
    bottom: 110,
    right: 20,
    zIndex: 999,
    elevation: 10,
  },

scrollContainer: {
    flex: 1, 
    backgroundColor: "#fff", 
  },
  scrollContent: {
    paddingBottom: 150, 
  },

});
