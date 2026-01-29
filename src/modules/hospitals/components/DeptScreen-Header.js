import React from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale, verticalScale } from "../../../utils/styling";
import { COLORS } from "../../../config/constants";

const DoctorConsultHeader = () => {
  return (
    <LinearGradient
      colors={[COLORS.darkblue, COLORS.lightblue]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.darkblue} />

      <Text style={styles.headerTitle}>Doctor Consult</Text>
      <Text style={styles.headerSubtitle}>
        Consult Certified Doctors Online 24/7
      </Text>

      <LinearGradient
        colors={[COLORS.blueshade, COLORS.teal]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.left}>
          <Text style={styles.bannerTitle}>
            Get the Best{"\n"}medical Services
          </Text>
          <Text style={styles.bannerDesc}>
            We provide best quality medical services without further cost.
          </Text>
        </View>

        <View style={styles.imgContainer}>
          <LinearGradient
            colors={["#214876", COLORS.blueshade]}
            style={styles.bnrGradient}
          />
          <Image
            source={require("../../../../assets/department-screen/deptscr_bannerDoc.png")}
            style={styles.doctorImage}
          />
        </View>
      </LinearGradient>

      <View style={styles.ctaButton}>
        <Text style={styles.ctaText}>
          Book consultation starting at ₹199
        </Text>
      </View>
    </LinearGradient>
  );
};

export default DoctorConsultHeader;

const styles = StyleSheet.create({
  gradient: {
    paddingTop: verticalScale(15),
    paddingHorizontal: scale(16),
    borderBottomLeftRadius: scale(38),
    borderBottomRightRadius: scale(38),
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: scale(22),
    fontWeight: "700",
  },
  headerSubtitle: {
    color: COLORS.white,
    fontSize: scale(14),
    marginTop: verticalScale(4),
    marginBottom: verticalScale(16),
  },
  banner: {
    borderRadius: scale(26),
    padding: scale(16),
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flex: 1,
    paddingRight: scale(10),
  },
  bannerTitle: {
    fontSize: scale(23),
    fontWeight: "900",
    color: "#0B2B4B",
    marginBottom: verticalScale(6),
  },
  bannerDesc: {
    fontSize: scale(13),
    color: "#0B2B4B",
    lineHeight: verticalScale(18),
    marginBottom: verticalScale(14),
  },
  imgContainer: {
    height: verticalScale(120),
    width: scale(120),
    justifyContent: "center",
    alignItems: "center",
  },
  bnrGradient: {
    height: verticalScale(110),
    width: scale(102),
    position: "absolute",
    borderRadius: scale(50),
    top: scale(-10),
    left: scale(30),
  },
  doctorImage: {
    width: scale(175),
    height: verticalScale(175),
    resizeMode: "contain",
    marginRight: scale(28),
    marginTop: scale(10),
  },
  ctaButton: {
    width: scale(300),
    height: scale(55),
    margin: verticalScale(20),
    backgroundColor: COLORS.white,
    borderRadius: scale(14),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
  },
  ctaText: {
    color: "#12448f",
    fontSize: scale(15),
    fontWeight: "600",
    paddingLeft: scale(18),
    paddingTop: scale(8),
  },
});
