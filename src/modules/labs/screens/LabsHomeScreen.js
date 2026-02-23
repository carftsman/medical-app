import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale } from '../../../utils/styling';

import LocationHeader from '../../../components/LocationHeader';
import SosButton from '../../../components/SosButton';

import CallToBookCard from '../components/CallToBookCard';
import LabTestByAge from '../components/LabTestByAge';
import LabCategories from '../components/LabCategories';
import NearbyLabs from '../components/NearbyLabs';
import RecentlyBookingTests from '../components/RecentlyBookingTests';
import CertifiedLabs from '../components/CertifiedLabs';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../config/constants';

export default function LabsHomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [uploadedList, setUploadedList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const cartItems = useSelector(state => state.labsCart.items);

  /* ================= RECEIVE NEW UPLOAD ================= */
  useEffect(() => {
    if (route?.params?.newUpload) {
      setUploadedList(prev => [route.params.newUpload, ...prev]);
    }
  }, [route?.params?.newUpload]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        {/* ================= HEADER ================= */}
        <LinearGradient
          colors={['#1E63F2', '#16C7B7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <LocationHeader />

            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons
                  name="notifications-outline"
                  size={scale(32)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={scale(32)}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* SEARCH */}
          <View style={styles.searchRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchBar}
              onPress={() => navigation.navigate('SearchScreen')}
            >
              <Ionicons
                name="search-outline"
                size={scale(28)}
                color="#9AA5B1"
              />
              <Text style={styles.searchPlaceholder}>
                Search for labs, Categories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartRight}
              onPress={() => navigation.navigate('CartScreen')}
            >
              <Ionicons name="cart-outline" size={scale(38)} color="#FFFFFF" />
              {cartItems.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 2,
                    right: -5,
                    height: 18,
                    width: 18,
                    backgroundColor: COLORS.danger,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                    }}
                  >
                    {cartItems.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ================= BODY ================= */}
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1E63F2']}
              tintColor="#1E63F2"
            />
          }
        >
          {/* ================= ACTION CARDS ================= */}
          <View style={styles.sideBySideRow}>
            <CallToBookCard phoneNumber="108" />

            <TouchableOpacity
              style={styles.sideCard}
              onPress={() => navigation.navigate('UploadPrescription')}
            >
              <View style={styles.sideLeft}>
                <View style={styles.docIconBox}>
                  <Ionicons
                    name="document-text-outline"
                    size={scale(18)}
                    color="#056FD2"
                  />
                </View>

                <View>
                  <Text style={styles.cardTitle}>Upload</Text>
                  <Text style={styles.cardSub}>Prescription</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={scale(16)}
                color="#9AA5B1"
              />
            </TouchableOpacity>
          </View>

          {/* ================= RECENT UPLOAD SECTION ================= */}
          {uploadedList.length > 0 && (
            <View style={{ marginTop: verticalScale(20) }}>
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Recent Appointments</Text>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('PrescriptionList', {
                      uploads: uploadedList,
                    })
                  }
                >
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              {uploadedList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentCard}
                  onPress={() =>
                    navigation.navigate('PrescriptionTracking', {
                      uploadId: item.id,
                      fileCount: item.fileCount,
                      labName: item.labName,
                      files: item.files,
                    })
                  }
                >
                  <View style={styles.recentIcon}>
                    <Ionicons
                      name="document-text-outline"
                      size={scale(18)}
                      color="#056FD2"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.refText}>#{item.id}</Text>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* ================= BANNER ================= */}
          <View style={styles.bannerWrapper}>
            <TouchableOpacity activeOpacity={0.9}>
              <ImageBackground
                source={require('../../../../assets/Labs_Banner.png')}
                style={styles.bannerImage}
                imageStyle={styles.bannerImageRadius}
              >
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>Stay informed about</Text>
                  <Text style={styles.bannerTitleBold}>the new variant</Text>

                  <Text style={styles.bannerDesc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    diam nonummy nibh euismod tincidunt.
                  </Text>

                  <View style={styles.infoChip}>
                    <Text style={styles.infoText}>info: (123) 123 456 789</Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <LabTestByAge labId={1} />
          <LabCategories labId={1} />
          <NearbyLabs />
          <RecentlyBookingTests />
          <CertifiedLabs />
        </ScrollView>

        {/* SOS */}
        <SosButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1E63F2' },
  container: { flex: 1, backgroundColor: '#F5FAFF' },

  header: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(44),
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },

  rightIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: scale(14) },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    height: verticalScale(44),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartRight: { marginLeft: scale(12) },

  searchPlaceholder: {
    marginLeft: scale(10),
    fontSize: scale(14),
    color: '#9AA5B1',
  },

  body: {
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(18),
  },

  sideBySideRow: { flexDirection: 'row' },

  sideCard: {
    flex: 1,
    backgroundColor: '#dce5f7',
    borderRadius: scale(12),
    paddingVertical: verticalScale(22),
    paddingHorizontal: scale(12),
    minHeight: verticalScale(72),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sideLeft: { flexDirection: 'row', alignItems: 'center' },

  docIconBox: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(8),
    backgroundColor: '#b1cef8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },

  cardTitle: { fontSize: scale(13), fontWeight: '600', color: '#222' },
  cardSub: { fontSize: scale(11), color: '#666' },

  /* Recent Section */
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },

  recentTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#222',
  },

  viewAll: {
    color: '#056FD2',
    fontWeight: '600',
    fontSize: scale(13),
  },

  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F6FF',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    borderRadius: scale(14),
    marginBottom: verticalScale(10),
  },

  recentIcon: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(10),
    backgroundColor: '#DCE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  refText: {
    fontWeight: '700',
    fontSize: scale(14),
    color: '#222',
  },

  statusText: {
    fontSize: scale(12),
    color: '#0E9F6E',
    marginTop: verticalScale(2),
  },

  bannerWrapper: { marginTop: verticalScale(14) },

  bannerImage: {
    width: '100%',
    height: verticalScale(160),
    borderRadius: scale(16),
    overflow: 'hidden',
    justifyContent: 'center',
  },

  bannerImageRadius: { borderRadius: scale(16) },
  bannerContent: { width: '65%', paddingLeft: scale(8) },

  bannerTitle: { fontSize: scale(16), fontWeight: '800', color: '#7A8799' },
  bannerTitleBold: { fontSize: scale(16), fontWeight: '800', color: '#5F6F85' },

  bannerDesc: {
    fontSize: scale(11),
    color: '#8B97A8',
    marginTop: verticalScale(6),
  },

  infoChip: {
    marginTop: verticalScale(36),
    paddingVertical: verticalScale(2),
    paddingHorizontal: scale(11),
    borderRadius: scale(8),
    borderWidth: 1.5,
    borderColor: '#F26D6D',
    backgroundColor: 'rgba(242,109,109,0.08)',
  },

  infoText: { fontSize: scale(11), fontWeight: '700', color: '#F26D6D' },
});
