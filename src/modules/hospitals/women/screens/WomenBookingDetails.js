import React, { useEffect, useState } from "react"; 
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { scale, verticalScale } from "../../../../utils/styling"; 
import DoctorCard from "../components/DoctorCard"; 
import InfoRow from "../components/InfoRow";
import PaymentRow from "../components/PaymentRow"; 
import { SafeAreaView } from "react-native-safe-area-context"; 
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import api from '../../../../api/client';

export default function WomenBookingDetails({ route }) { 
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  // If coming from previous screen
  const bookingId = route?.params?.bookingId || 2;

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const response = await api.get(
        `/appointments/${bookingId}`
      );

      setBookingData(response.data);
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F36" />
      </SafeAreaView>
    );
  }

  return ( 
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <ScrollView> 

        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", padding: scale(16) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.header}>Book an Appointment</Text>
        </View>
        
        {/* Doctor Card */}
        <DoctorCard 
          name={bookingData?.doctor?.name}
          specialization={bookingData?.doctor?.specialization}
          experience={bookingData?.doctor?.experience}
          rating={bookingData?.doctor?.rating}
          reviews={bookingData?.doctor?.reviews}
        />

        {/* Date */}
        <InfoRow 
          icon="calendar-outline" 
          title="Date" 
          value={`${bookingData?.appointment?.date} | ${bookingData?.appointment?.time}`}
          showChange={true}
        /> 
        
        {/* Reason */}
        <InfoRow 
          icon="create-outline" 
          title="Reason" 
          value={bookingData?.reason}
        /> 
        
        {/* Payment */}
        <View style={styles.paymentBox}> 
          <Text style={styles.paymentTitle}>Payment Summary</Text> 
          
          <PaymentRow
            label="Consultation Fee" 
            value={`₹${bookingData?.payment?.consultationFee}`} 
          /> 
          
          <PaymentRow 
            label="Service Fee" 
            value={
              bookingData?.payment?.serviceFee === 0 
                ? "Free" 
                : `₹${bookingData?.payment?.serviceFee}`
            }
            highlight 
          /> 
          
          <PaymentRow 
            label="GST (18%)" 
            value={`₹${bookingData?.payment?.gst}`} 
          /> 
          
          <View style={styles.divider} /> 
          
          <PaymentRow 
            label="Total Payable" 
            value={`₹${bookingData?.payment?.total}`} 
          /> 
        </View> 
      </ScrollView> 

      <TouchableOpacity
        onPress={() => navigation.navigate("WomenBookingSuccess")}
        style={styles.button}
      >
        <Text style={styles.text}>Pay</Text>
      </TouchableOpacity>

    </SafeAreaView> 
  ); 
}

const styles = StyleSheet.create({
  header: {
    fontSize: scale(18), 
    fontWeight: "600",
    marginLeft: scale(16),
  },
  paymentBox: {
    margin: scale(16), 
    padding: scale(16), 
    backgroundColor: "#fff", 
    borderRadius: scale(16), 
    shadowColor: "#000", 
    shadowOpacity: 0.05, 
    shadowRadius: 10,
    elevation: 2,
  },
  paymentTitle: {
    fontSize: scale(16),
    fontWeight: "600", 
    marginBottom: verticalScale(12), 
  }, 
  divider: { 
    height: 1,
    backgroundColor: "#eee", 
    marginVertical: verticalScale(12), 
  }, 
  button: {
    backgroundColor: "#F47FBB",
    margin: scale(16),
    borderRadius: scale(24),
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "600",
  },
});
