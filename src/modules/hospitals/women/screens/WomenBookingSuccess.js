import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale } from '../../../../utils/styling';
import { SafeAreaView } from "react-native-safe-area-context"; 
import SuccessHeader from "../components/SuccessHeader";
import DoctorCard from "../components/DoctorCard";
import DateTimeRow from "../components/DateTimeRow";
import MapPreview from "../components/MapPreview";
import ShareButton from "../components/ShareButton";
import api from '../../../../api/client';

const WomenBookingSuccess = ({ route }) => {

  const [loading, setLoading] = useState(true);
  const [successData, setSuccessData] = useState(null);

  const bookingId = route?.params?.bookingId || 2;

  useEffect(() => {
    fetchSuccessDetails();
  }, []);

  const fetchSuccessDetails = async () => {
    try {
      const response = await api.get(
        `/appointments/${bookingId}/success`
      );
      setSuccessData(response.data);
    } catch (error) {
      console.log("Success API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F47FBB" }}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <SuccessHeader
          amount={successData?.payment?.amountPaid}
          hospital={successData?.hospital?.name}
        />
      </View>

      <View style={styles.cardSection}>
        
        <DoctorCard
          name={successData?.doctor?.name}
          specialization={successData?.doctor?.specialization}
          experience={successData?.doctor?.experience}
          rating={successData?.doctor?.rating}
          reviews={successData?.doctor?.reviews}
        />

        <DateTimeRow
          date={successData?.appointment?.date}
          time={successData?.appointment?.time}
        />

        <MapPreview
          hospitalName={successData?.hospital?.name}
          latitude={successData?.hospital?.latitude}
          longitude={successData?.hospital?.longitude}
        />

      </View>

      <View style={styles.buttonWrapper}>
        <ShareButton link={successData?.shareLink} />
      </View>
    </SafeAreaView>
  );
}

export default WomenBookingSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F47FBB",
  },

  topSection: {
    paddingTop: verticalScale(70),
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(100),
    alignItems: "center",
    backgroundColor: "#F47FBB",
  },

  cardSection: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    marginTop: -verticalScale(55),
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    paddingTop: verticalScale(24),
    paddingHorizontal: scale(20),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
    elevation: 10,
  },

  buttonWrapper: {
    backgroundColor: "#F4F6FA",
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
});
