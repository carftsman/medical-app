import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";


const DepartmentsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <Text style={styles.headerTitle}>Doctor Consult</Text>
      <Text style={styles.headerSubtitle}>
        Consult Certified Doctors Online 24/7
      </Text>

      {/* Banner Card */}
      <View style={styles.banner}>
        {/* Left */}
        <View style={styles.left}>
          <Text style={styles.bannerTitle}>
            Get the Best{"\n"}medical Services
          </Text>

          <Text style={styles.bannerDesc}>
            We provide best quality medical services without further cost.
          </Text>

          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>
              ₹ Book consultation starting at ₹199
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../../assets/deptscr_bannerDoc.png")}
          style={styles.doctorImage}
        />
      </View>
    </View>
  );
};

export default DepartmentsScreen;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B5ED7", 
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#E3ECFF",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },

  banner: {
    backgroundColor: "#1FB6D9",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    flex: 1,
    paddingRight: 10,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B2B4B",
    marginBottom: 6,
  },

  bannerDesc: {
    fontSize: 13,
    color: "#0B2B4B",
    lineHeight: 18,
    marginBottom: 14,
  },

  ctaButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },

  ctaText: {
    color: "#0B2B4B",
    fontSize: 13,
    fontWeight: "600",
  },

  doctorImage: {
    width: 115,
    height: 145,
    resizeMode: "contain",
  },
});
