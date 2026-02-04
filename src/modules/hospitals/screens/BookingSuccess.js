/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { scale, verticalScale } from "../../../utils/styling";
import api from "../../../api/client";
import { COLORS } from "../../../config/constants";

const BookingSuccess = ({ route }) => {
  const navigation = useNavigation();

  const { bookingId } = route.params || {};

  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookingId) {
      fetchSuccessDetails();
    }
  }, [bookingId]);

  const fetchSuccessDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/appointments/${bookingId}/success`,
        {
          params: {
            bookingId,
          },
        }
      );

      setSuccessData(response.data);
      console.log("DATA", response?.data);
    } catch (err) {
      setError("Unable to fetch booking success details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#056FD2" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!successData) {
    return null;
  }
console.log("BOOKING SUCCESS");
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* TOP BLUE SECTION */}
        <View style={styles.topBlue}>
          <View style={styles.badgeOuter}>
            <View style={styles.badgeMid}>
              <View style={styles.badgeInner}>
                <AntDesign name="check" size={scale(28)} color="#056FD2" />
              </View>
            </View>
          </View>

          <Text style={styles.successText}>Payment Successful</Text>

          <Text style={styles.subText}>
            ₹{successData.payment?.amountPaid}.00 has paid to{" "}
            {successData.payment?.hospital}
          </Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* DOCTOR CARD */}
          <View style={styles.doctorCard}>
            <View style={styles.row}>
              <Image
                source={{ uri: successData.doctor?.image }}
                style={styles.doctorImg}
              />

              <View style={styles.infoBox}>
                <Text numberOfLines={1} style={styles.docName}>
                  {successData.doctor?.name}
                </Text>

                <Text numberOfLines={1} style={styles.docSub}>
                  {successData.doctor?.specialization}
                  <Text style={styles.green}>
                    {" | "} {successData.doctor?.experience} Years
                  </Text>
                </Text>

                <View style={styles.ratingRow}>
                  <Text style={styles.star}>⭐</Text>
                  <Text style={styles.rating}>
                    {successData.doctor?.rating}
                  </Text>
                  <Text style={styles.review}>
                    ({successData.doctor?.reviews} reviews)
                  </Text>
                </View>
              </View>
            </View>

            {/* DATE & TIME */}
            <View style={styles.dateTimeBox}>
              <View style={styles.dateItem}>
                <Feather name="calendar" size={scale(18)} color="#056FD2" />
                <Text style={styles.dateText}>
                  {successData.appointment?.date}
                </Text>
              </View>

              <View style={styles.dateItem}>
                <Feather name="clock" size={scale(18)} color="#056FD2" />
                <Text style={styles.dateText}>
                  {successData.appointment?.time}
                </Text>
              </View>
            </View>
          </View>

          {/* MAP PLACEHOLDER */}
          <View style={styles.mapPreview}>
            <Text style={styles.mapText}>Map Preview</Text>
          </View>

          {/* DONE BUTTON */}
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() =>
              navigation.navigate("HospitalsTab", {
                screen: "HospitalsHomeScreeen",
              })
            }
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  topBlue: {
    height: verticalScale(260),
    backgroundColor: "#056FD2",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeOuter: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(14),
  },
  badgeMid: {
    width: scale(82),
    height: scale(82),
    borderRadius: scale(41),
    backgroundColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeInner: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    color: "#FFFFFF",
    fontSize: scale(20),
    fontWeight: "600",
  },
  subText: {
    color: "#EAF3FF",
    fontSize: scale(13),
    marginTop: verticalScale(6),
  },
  content: {
    flex: 1,
    padding: scale(16),
  },
  doctorCard: {
    backgroundColor: "#F3F9FF",
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: "#9CC9FF",
    padding: scale(12),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImg: {
    width: scale(87),
    height: scale(87),
    borderRadius: scale(8),
  },
  infoBox: {
    marginLeft: scale(12),
    width: scale(236),
  },
  docName: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#000",
  },
  docSub: {
    fontSize: scale(13),
    color: "#666",
    marginTop: verticalScale(2),
  },
  green: {
    color: "#1DB954",
    fontWeight: "600",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  star: {
    fontSize: scale(12),
  },
  rating: {
    fontWeight: "700",
    fontSize: scale(12),
    color: "#000",
  },
  review: {
    fontSize: scale(12),
    color: "#777",
  },
  dateTimeBox: {
    marginTop: verticalScale(12),
    borderWidth: 1,
    borderColor: "#7FB5FF",
    borderRadius: scale(14),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#000",
    marginLeft: scale(6),
  },
  mapPreview: {
    width: "100%",
    height: verticalScale(170),
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  mapText: {
    color: "#888",
    fontSize: scale(14),
  },
  doneBtn: {
    height: verticalScale(48),
    backgroundColor: "#056FD2",
    borderRadius: scale(24),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(14),
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "600",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
