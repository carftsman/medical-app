import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { scale, verticalScale } from "../../../utils/styling";

const CallToBookCard = ({ phoneNumber = "108", onPress }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity
      style={[styles.sideCard, { marginRight: scale(12) }]}
      onPress={onPress || handleCall}
      activeOpacity={0.8}
    >
      <View style={styles.sideLeft}>
        <View style={styles.callIconBox}>
          <Ionicons
            name="call-outline"
            size={scale(18)}
            color="#0BB783"
          />
        </View>

        <View>
          <Text style={styles.cardTitle}>Book a Test</Text>
          <Text style={styles.cardSub}>Via Call</Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={scale(16)}
        color="#9AA5B1"
      />
    </TouchableOpacity>
  );
};

export default CallToBookCard;

/*STYLES*/

const styles = StyleSheet.create({
  sideCard: {
    flex: 1,
    backgroundColor: "#dce5f7",
    borderRadius: scale(12),
    paddingVertical: verticalScale(22),
    paddingHorizontal: scale(12),
    minHeight: verticalScale(72),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sideLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  callIconBox: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(8),
    backgroundColor: "#c4f0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },

  cardTitle: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#222",
  },

  cardSub: {
    fontSize: scale(11),
    color: "#666",
  },
});
