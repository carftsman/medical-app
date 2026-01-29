import React from 'react';
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';

import Header from '../components/Header';
import SectionHeader from '../components/SectionHeader';
import BookingDoctorCard from '../components/BookingDoctorCard';
import DetailRow from '../components/DetailRow'; 
import PaymentRow from '../components/PaymentRow'; 
const BookingDetails = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <Header />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <BookingDoctorCard />

  
        <View style={styles.section}>
          <SectionHeader title="Booking Details" showChange />

          <DetailRow
            icon="person-outline"
            label="Patient Name"
            value="John Doe"
          />
          
          <DetailRow
            icon="calendar-outline"
            label="Slot Date"
            value="Wed, 06 Jan"
          />

          <DetailRow
            icon="time-outline"
            label="Slot Time"
            value="12:30 PM"
          />

          <View style={styles.reasonHeader}>
            <Text style={styles.reasonTitle}>Reason</Text>
            <TouchableOpacity>
              <Text style={styles.reasonChange}>Change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.reasonRow}>
            <Ionicons
              name="document-text-outline"
              size={23}
              color="#4f76c4ff"
            />
            <Text>Chest pain</Text>
          </View>
        </View>

      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <PaymentRow
            label="Consultation Fee"
            value="₹100.00"
            valueStyle={styles.amountValue}
          />
           <PaymentRow
            label="Service Fee"
            value="Free"
            valueStyle={styles.freeText}
          />

          <PaymentRow
            label="GST (18%)"
            value="₹12.00"
            valueStyle={styles.amountValue}
          />

          <View style={styles.divider} />

          <PaymentRow
            label="Total Payable"
            value="₹112.00"
            valueStyle={styles.totalValue}
          />
        </View>
      </ScrollView>
        <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Pay ₹102.00</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default BookingDetails;
const styles = StyleSheet.create({
  safe: { 
    flex: 1,
    backgroundColor: '#F4F6FA'
 },

  container: { 
    paddingHorizontal: scale(16) 
  },
     section: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    padding: scale(14),
    marginBottom: verticalScale(16),
  },
  
  reasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },

  reasonTitle: { fontWeight: 'bold', fontSize: 18 },

  reasonChange: { color: '#0c3ea1ff' },

  reasonRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
   
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
   amountValue: { fontWeight: '500' },

  freeText: { color: '#10B981', fontWeight: '500' },

   divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: verticalScale(10),
  },

  totalValue: { fontWeight: '600' },

  payButton: {
    backgroundColor: '#0A74DA',
    paddingVertical: verticalScale(14),
    margin: scale(16),
    borderRadius: scale(8),
    alignItems: 'center',
  },

  payText: {
     color: '#fff', 
     fontWeight: '600' 
    },
});
