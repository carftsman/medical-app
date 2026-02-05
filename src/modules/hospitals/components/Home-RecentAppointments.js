import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scale, verticalScale } from '../../../utils/styling';

const RecentAppointments = ({
  loadingRecent = false,
  onViewDetails,
  onViewAll,
}) => {
  return (
    <>
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>Recent Appointments</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

        <View style={styles.recentCard}>
          <View style={styles.recentRow}>
            <Image
              source={require('../../../../assets/Doctors.png')}
              style={styles.doctorImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.hospitalName}>Apollo Hospitals</Text>
              <Text style={styles.doctorName}>Dr. Rajesh Kumar</Text>

              <View style={styles.dateRow}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={14} color="#6B7280" />
                  <Text style={styles.dateText}>Dec 28, 2025</Text>
                </View>

                <View style={styles.iconRow}>
                  <Ionicons name="time-outline" size={14} color="#6B7280" />
                  <Text style={styles.timeText}>10:30 AM</Text>
                </View>
              </View>
            </View>

            <View style={styles.statusWrap}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.detailsBtn} onPress={onViewDetails}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
    </>
  );
};

export default RecentAppointments;

const styles = StyleSheet.create({
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: verticalScale(24),
  },
  recentTitle: {
    fontSize: scale(18),
    fontWeight: '700',
  },
  viewAll: {
    color: '#2563EB',
    fontWeight: '600',
  },

  recentCard: {
    backgroundColor: '#FFF',
    marginHorizontal: scale(15),
    marginTop: verticalScale(12),
    borderRadius: scale(14),
    padding: scale(14),
    elevation: 1,
  },
  recentRow: {
    flexDirection: 'row',
  },

  doctorImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },

  hospitalName: {
    fontSize: scale(15),
    fontWeight: '800',
  },
  doctorName: {
    fontSize: scale(13),
    color: '#6B7280',
  },

  dateRow: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
  },
  dateText: {
    marginLeft: 4,
    fontSize: scale(12),
  },
  timeText: {
    marginLeft: 4,
    fontSize: scale(12),
  },

  statusWrap: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
    height: 28,
  },
  statusText: {
    fontSize: scale(12),
    color: '#16A34A',
    fontWeight: '600',
  },

  detailsBtn: {
    marginTop: verticalScale(12),
    backgroundColor: '#2563EB',
    paddingVertical: verticalScale(10),
    borderRadius: scale(20),
    width: verticalScale(220),
    alignSelf: 'center',
    alignItems: 'center',
  },
  detailsText: {
    color: '#FFF',
    fontWeight: '700',
  },

  
  skeletonImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },
  skeletonLineLg: {
    width: '70%',
    height: 16,
    borderRadius: 4,
  },
  skeletonLineSm: {
    width: '50%',
    height: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  skeletonRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  skeletonDate: {
    width: 80,
    height: 12,
    borderRadius: 4,
    marginRight: 12,
  },
  skeletonTime: {
    width: 60,
    height: 12,
    borderRadius: 4,
  },
  skeletonStatus: {
    width: 70,
    height: 24,
    borderRadius: 12,
  },
  skeletonButton: {
    marginTop: verticalScale(12),
    width: verticalScale(220),
    height: verticalScale(36),
    borderRadius: scale(20),
    alignSelf: 'center',
  },
});
