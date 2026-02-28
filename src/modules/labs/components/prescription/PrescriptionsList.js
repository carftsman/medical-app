import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserPrescriptions } from '../services/prescriptionApi';
import Pdf from 'react-native-pdf';

const PrescriptionListScreen = ({
  uploads,
  refreshing,
  setRefreshing,
  previewImage,
  setPreviewImage,
  previewPDF,
  setPreviewPDF,
  fetchPrescriptions,
}) => {
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrescriptions();
  };

  /* ================= OPEN FILE ================= */
  const openFile = file => {
    const url = file?.fileUrl;
    if (!url) return;

    const type = file?.fileType || '';

    if (type.includes('image')) {
      setPreviewImage(url);
      return;
    }

    if (type.includes('pdf')) {
      setPreviewPDF(url);
      return;
    }
  };

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item }) => {
    const firstFile = item.files?.[0];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('PrescriptionTracking', {
            groupId: item.groupId,
            selectedLab: item.lab,
          })
        }
      >
        <View style={styles.iconWrapper}>
          <Icon
            name={
              firstFile?.fileType?.includes('pdf')
                ? 'file-pdf-box'
                : 'file-image'
            }
            size={28}
            color="#056FD2"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.labName}>
            {item?.lab?.name || 'Selected Lab'}
          </Text>

          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>

          <Text style={styles.fileCount}>
            {item.files?.length || 0} file(s)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <View style={{ width: 25 }} />
      </View>

      {/* LIST */}
      <FlatList
        data={uploads}
        keyExtractor={item => item.groupId?.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#056FD2']}
          />
        }
        contentContainerStyle={{ padding: 20 }}
      />

      {/* IMAGE MODAL */}
      <Modal visible={!!previewImage} transparent>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setPreviewImage(null)}
        >
          <Image
            source={{ uri: previewImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      {/* PDF MODAL */}
      <Modal visible={!!previewPDF} animationType="slide">
        <View style={styles.pdfModalContainer}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setPreviewPDF(null)}
          >
            <Icon name="close" size={26} color="#111827" />
          </TouchableOpacity>

          <Pdf
            source={{ uri: previewPDF }}
            style={styles.pdf}
            trustAllCerts={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PrescriptionListScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
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

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 16,
    elevation: 4,
  },

  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  labName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },

  fileCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#056FD2',
    marginTop: 6,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullImage: {
    width: '95%',
    height: '80%',
  },

  pdfModalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  pdf: {
    flex: 1,
    width: '100%',
  },

  closeBtn: {
    padding: 16,
    alignSelf: 'flex-end',
  },
});
