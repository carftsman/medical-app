import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../../../../utils/styling';

const PrescriptionEmptyView = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <View style={{ width: 25 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Empty State Icon */}
        <View style={styles.circle}>
          <View style={styles.innerIcon}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={36}
              color="#3B82F6"
            />
          </View>

          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#3B82F6" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          You haven’t uploaded any prescriptions yet.
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Upload your first prescription to find the best lab prices near you
          and book tests with ease
        </Text>

        {/* Upload Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('UploadPrescription')}
          style={styles.uploadBtn}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
          <Text style={styles.uploadText}> Upload Prescription</Text>
        </TouchableOpacity>

        {/* How it works */}
        <Text style={styles.howTitle}>HOW IT WORKS</Text>

        <View style={styles.steps}>
          <Step
            icon={<Ionicons name="camera-outline" size={20} color="#3B82F6" />}
            title="Upload"
            desc="Snap a photo or upload a PDF of your doctor’s prescription."
          />
          <Step
            icon={<Ionicons name="time-outline" size={20} color="#3B82F6" />}
            title="Wait"
            desc="Labs review and confirms avialability within 30–120 mins."
          />
          <Step
            icon={
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                color="#3B82F6"
              />
            }
            title="Book"
            desc="Compare prices and book a home collection from your preferred lab."
          />
        </View>

        {/* Secure Badge */}
        <View style={styles.secureBadge}>
          <Ionicons name="shield-checkmark" size={16} color="#3B82F6" />
          <Text style={styles.secureText}> 100% ENCRYPTED & SECURE</Text>
        </View>
      </ScrollView>
    </View>
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

export default PrescriptionEmptyView;

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
