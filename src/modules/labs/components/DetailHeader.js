import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DetailHeader = ({ testName, labName, status }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.iconBox}>
        <Ionicons name="flash-outline" size={scale(18)} color="#1976D2" />
      </View>

      <View>
        <Text style={styles.title}>{testName || '-'}</Text>
        <Text style={styles.subtitle}>{labName || '-'}</Text>

        {/* Optional status */}
        {status && (
          <Text style={styles.status}>{status}</Text>
        )}
      </View>

    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    backgroundColor: '#fff',
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
  },
  iconBox: {
    backgroundColor: '#E3F2FD',
    padding: scale(10),
    borderRadius: scale(10),
    marginRight: scale(10),
  },
  title: {
    fontSize: scale(15),
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: scale(13),
    color: '#666',
    marginTop: verticalScale(2),
  },
  status: {
    fontSize: scale(12),
    color: '#1976D2',
    marginTop: verticalScale(2),
  },
});
