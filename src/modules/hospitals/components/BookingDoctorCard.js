import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { scale, verticalScale } from '../../../utils/styling';

const BookingDoctorCard = ({ doctor }) => {
 if (!doctor) return null;

  return (
    <View style={styles.doctorCard}>
      <View style={styles.doctorImageContainer}>
        <Image
          source= {{ uri: doctor.image }}
          style={styles.doctorImage}
        />
      </View>

      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>

        <View style={styles.subRow}>
          <Text style={styles.doctorSpec}>
            {doctor.specialization}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.experience}>
            {doctor.experience} Years
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★★★★★</Text>
          <Text style={styles.reviewText}>
            {doctor.rating} ({doctor.reviews} reviews)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingDoctorCard;
const styles = StyleSheet.create({
     doctorCard: {
        flexDirection: 'row',
        backgroundColor: '#EFF8FF',
        borderColor: '#b5d9fcff',
        borderWidth: 1,
        borderRadius: scale(10),
        padding: scale(12),
        marginVertical: verticalScale(16),
        alignItems: 'center',
      },
    
      doctorImageContainer: {
        width: scale(90),
        height: scale(90),
        borderRadius: scale(8),
        overflow: 'hidden',
        marginRight: scale(16),
      },
    
      doctorImage: { 
        width: '100%',
        height: '100%' 
       },
    
      doctorInfo: { flex: 1 },
    
      doctorName: {
        fontSize: scale(18),
        fontWeight: '600',
        color: '#111827',
      },
    
      subRow: {
         flexDirection: 'row', 
         alignItems: 'center'
        },
    
      doctorSpec: { color: '#818181' },
    
      dot: {
         marginHorizontal: 6,
         color: '#818181'
     },
    
      experience: { 
        color: '#10B981' 
      },
    
      ratingRow: { 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4 
    },
    
      star: {
         color: '#F59E0B',
         marginRight: 8, 
        
      },
    
      reviewText: {
        color: '#0f0f0fff' 
      },
    
})  