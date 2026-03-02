import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrescriptionEmptyView from '../components/prescription/PrescriptionEmptyView';
import PrescriptionListScreen from '../components/prescription/PrescriptionsList';

import { getUserPrescriptions } from '../services/prescriptionApi';

const MyPrescriptionsScreen = () => {
  const navigation = useNavigation();

  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewPDF, setPreviewPDF] = useState(null);

  /* ================= FETCH ================= */
  const fetchPrescriptions = async () => {
    try {
      const response = await getUserPrescriptions();
      let data = response?.data?.data || [];

      if (!Array.isArray(data)) data = [data];

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setUploads(sorted);
    } catch (error) {
      console.log('Prescription List Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPrescriptions();
    }, []),
  );

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <View style={styles.header}>
  //         <TouchableOpacity>
  //           <Feather name="arrow-left" size={22} color="#111827" />
  //         </TouchableOpacity>

  //         <Text style={styles.headerTitle}>My Prescriptions</Text>
  //         <View style={{ width: 25 }} />
  //       </View>
  //       <View style={styles.loaderContainer}>
  //         <ActivityIndicator size="large" color="#056FD2" />
  //       </View>
  //     </View>
  //   );
  // }

  return <PrescriptionEmptyView />;

  return (
    <PrescriptionListScreen
      uploads={uploads}
      refreshing={refreshing}
      setRefreshing={setRefreshing}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      previewPDF={previewPDF}
      setPreviewPDF={setPreviewPDF}
      fetchPrescriptions={fetchPrescriptions}
    />
  );
};

const Step = ({ icon, title, desc }) => (
  <View style={styles.stepRow}>
    <View style={styles.stepIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDesc}>{desc}</Text>
    </View>
  </View>
);

export default MyPrescriptionsScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: '#111827',
  },
  container: {
    alignItems: 'center',
    padding: 24,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    marginTop: 24,
    marginBottom: 24,
  },
  innerIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    right: 38,
    bottom: 36,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  howTitle: {
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 16,
  },
  steps: {
    width: '100%',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  stepDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 20,
  },
  secureText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },
});
