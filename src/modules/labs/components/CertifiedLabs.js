import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { scale, verticalScale } from "../../../utils/styling";

const CertifiedLabs = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Testing Made{"\n"}
          <Text style={styles.bold}>Simple,</Text>
        </Text>

        <Image
          source={require("../../../../assets/certified.png")}
          style={styles.badge}
        />

        <Text style={styles.subText}>
          Certified Safety and Quality fulfilled by{"\n"}
          National Health Organization
        </Text>
      </View>
    </View>
  );
};

export default CertifiedLabs;

/* STYLES */
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },

  container: {
    marginTop: verticalScale(28),
    marginBottom: verticalScale(90),
    paddingVertical: verticalScale(26),
    paddingHorizontal: scale(16),
    backgroundColor: "#EAF4FF",
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    alignItems: "flex-start",
  },

  title: {
    fontSize: scale(22),
    fontWeight: "700",
    color: "#056FD2",
    textAlign: "left",
    marginBottom: verticalScale(16),
  },

  bold: {
    fontWeight: "800",
  },

  badge: {
    width: scale(70),
    height: scale(70),
    resizeMode: "contain",
    marginBottom: verticalScale(12),
    alignSelf: "center",
  },

  subText: {
    fontSize: scale(12),
    color: "#333",
    textAlign: "center",
    lineHeight: scale(18),
    alignSelf: "center", // ✅ ONLY CHANGE
  },
});
