import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReportList = ({ reports = [] }) => {
  if (!reports.length) {
    return (
      <View style={styles.empty}>
        <Text>No Reports Available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reports.map((item, index) => (
        <View key={index} style={styles.row}>
          
          <View style={styles.left}>
            <Ionicons
              name="document-text-outline"
              size={scale(16)}
              color="#D32F2F"
            />
            <Text style={styles.text}>
              {item.fileName || `Report ${index + 1}`}
            </Text>
          </View>

          <TouchableOpacity onPress={() => console.log('Download:', item.fileUrl)}>
            <Ionicons
              name="download-outline"
              size={scale(18)}
              color="#1976D2"
            />
          </TouchableOpacity>

        </View>
      ))}
    </View>
  );
};

export default ReportList;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#BBDEFB',
    borderRadius: scale(10),
    padding: scale(10),
    marginTop: verticalScale(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: scale(8),
    fontSize: scale(14),
    color: '#000',
  },
  empty: {
    padding: scale(12),
    alignItems: 'center',
  },
});
