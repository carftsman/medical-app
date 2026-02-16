import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { useNavigation } from '@react-navigation/native';

export default function ReportCard({
  reportId,
  status,
  testName,
  labName,
  date,
}) {
  const navigation = useNavigation();
  console.log('status', status);

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'NORMAL':
        return {
          textColor: '#2E7D32',
          bgColor: '#E8F5E9',
        };
      case 'ABNORMAL':
        return {
          textColor: '#C62828',
          bgColor: '#FFEBEE',
        };
      
      case 'BorderLine':
        return {
          textColor: '#ED6C02',
          bgColor: '#FFF3E0',
        };
      default:
        return {
          textColor: '#616161',
          bgColor: '#F5F5F5',
        };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ReportDetails', {
          id: reportId,
        })
      }
    >
    
      <View style={styles.card}>
  
        <View style={styles.topRow}>
           <Text
              style={[
                styles.reportId,
                // { color: reportIdStyle.textColor },
              ]}
            >
              {reportId}
            </Text>
      
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: statusStyle.bgColor },
            ]}
          >
            
            <Text
              style={[
                styles.statusText,
                { color: statusStyle.textColor },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="flask-outline" size={scale(16)} color="#555" />
          <Text style={styles.title}>{testName}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={scale(14)} color="#777" />
          <Text style={styles.subText}>{date}</Text>

          <Ionicons
            name="document-text-outline"
            size={scale(14)}
            color="#777"
            style={{ marginLeft: scale(10) }}
          />
          <Text style={styles.subText}>12 Tests</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="business-outline" size={scale(14)} color="#777" />
          <Text style={styles.subText}>{labName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: scale(14),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(6),
  },
  reportId:{
   color: '#125aa3',
   fontSize:scale(14),
   fontWeight:"bold",
   
   
  },

  statusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: scale(12),
    fontWeight: '600',
  },

  id: {
    fontSize: scale(13),
    color: '#1E88E5',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  title: {
    fontSize: scale(14),
    fontWeight: '600',
    marginLeft: scale(6),
    color: '#222',
  },
  subText: {
    fontSize: scale(12),
    color: '#666',
    marginLeft: scale(6),
  },
});
