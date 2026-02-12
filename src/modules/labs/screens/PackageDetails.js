import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { labApi } from '../services/labApi';
import { COLORS, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import PackageDetailsSkeleton from '../components/PackageDetailsSkeleton';
 
const PackageDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
 
  const packageId = route?.params?.packageId ?? 1;
 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openIncludes, setOpenIncludes] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
 
  useEffect(() => {
    if (packageId) {
      fetchDetails();
      checkIfInCart();
    }
  }, [packageId]);
 
  const fetchDetails = async () => {
    try {
      const res = await labApi.getPackageDetails(packageId);
      const apiData = res?.data;
  
      if (!apiData) return;
  
      // 🔥 Transform API schema to match existing UI
      const formattedData = {
        id: apiData.packageId,
        name: apiData.packageName,
        image: null, // keep fallback image
        summary: {
          testsCount: apiData.testsCount,
          reportTime: apiData.reportTime,
        },
        testsIncluded: [
          {
            category: "Tests Included",
            tests: apiData.tests || [],
          },
        ],
        instructions: [], // not provided in API
        pricing: apiData.pricing,
      };
  
      setData(formattedData);
    } catch (error) {
      console.log(
        'Package details API error:',
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };
 
  const checkIfInCart = async () => {
    try {
      const res = await labApi.getLabCart();
      const exists = res?.data?.items?.some(
        item => item.labTestId === packageId,
      );
      setIsAdded(!!exists);
    } catch (error) {
      console.log('Get cart error:', error?.message);
    }
  };
 
  const handleAddToCart = async () => {
  try {
    const payload = {
      userId: 21, // change dynamically later if needed
      labId: data?.labs?.[0]?.id || 1,
      labTestId: data?.id,
    };
 
    const res = await labApi.addToLabCart(payload);
 
    if (res?.data?.message === 'Added to cart') {
      setIsAdded(true);
    }
  } catch (error) {
    console.log(
      'Add to cart failed:',
      error?.response?.data || error.message,
    );
  }
};
 
  if (loading) return <PackageDetailsSkeleton />;
 
  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Unable to load package details</Text>
      </View>
    );
  }
 
  const testsBlock = data.testsIncluded?.[0];
 
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.canGoBack() && navigation.goBack()
          //onPress={() => navigation.navigate('LabDetails')
          //onPress={() => navigation.navigate('PackagesScreen')
          }
        >
          <Icon name="arrow-left" size={scale(22)} color={COLORS.black} />
        </TouchableOpacity>
 
        <Text style={styles.headerTitle} numberOfLines={1}>
          {data.name}
        </Text>
 
        <TouchableOpacity>
          <Icon name="share-variant" size={scale(20)} color={COLORS.black} />
        </TouchableOpacity>
      </View>
 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
      >
        <Image
          source={{
            uri:
              data.image ||
              'https://www.healthchek.in/images/blogs/98312381.jpg',
          }}
          style={styles.banner}
        />
 
        <Text style={styles.title}>{data.name}</Text>
 
        <View style={styles.infoRow}>
          <Text style={styles.info}>🧪 Tests</Text>
          <Text style={styles.infoValue}>
            {data.summary?.testsCount}
          </Text>
        </View>
 
        <View style={styles.infoRow}>
          <Text style={styles.info}>⏱ Reports</Text>
          <Text style={styles.infoValue}>
            {data.summary?.reportTime}
          </Text>
        </View>
 
        {/* TESTS INCLUDED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Tests Included ({testsBlock?.tests?.length || 0})
          </Text>
 
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setOpenIncludes(!openIncludes)}
          >
            <View style={styles.accordionHeader}>
              <Text style={styles.accordionTitle}>
                {testsBlock?.category}
              </Text>
              <Icon
                name={openIncludes ? 'chevron-up' : 'chevron-down'}
                size={scale(20)}
              />
            </View>
 
            {openIncludes && (
              <View style={styles.accordionBody}>
                {testsBlock?.tests?.map((test, index) => (
                  <View key={index} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{test}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        </View>
 
        {/* INSTRUCTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
 
          <View style={styles.instructionBox}>
            {data.instructions?.map((item, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
 
      {/* BOTTOM CTA */}
      <View style={styles.bottom}>
        <View>
          <Text style={styles.originalPrice}>
            ₹{data.pricing?.originalPrice}
          </Text>
          <Text style={styles.price}>
            ₹{data.pricing?.finalPrice}
          </Text>
        </View>
 
        {!isAdded ? (
          <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <Text style={styles.btnText}>View Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
 
export default PackageDetails;
 
 
 
/* ================= STYLES ================= */
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
 
  headerTitle: {
    flex: 1,
    marginHorizontal: scale(12),
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '800',
  },
  banner: {
    width: '100%',
    height: verticalScale(300),
    marginTop: verticalScale(80)
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: '700',
    padding: scale(16),
  },
  desc: {
    color: COLORS.gray,
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(10),
    backgroundColor: '#d7eafc',
    alignItems: 'center',
    marginHorizontal: scale(10),
    borderRadius: 10,
    paddingVertical: verticalScale(5),
  },
  info: {
    color: COLORS.darkgray,
    fontSize: SIZES.large,
  },
  infoValue: {
    color: COLORS.primary,
    fontWeight: '600',
    padding: 12,
    fontSize: SIZES.large,
  },
  section: {
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '700',
    marginBottom: verticalScale(8),
  },
  accordion: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(8),
    backgroundColor: COLORS.white,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  accordionBody: {
    paddingHorizontal: scale(12),
    paddingBottom: scale(10),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: verticalScale(6),
  },
  bullet: {
    fontSize: SIZES.large,
    marginRight: scale(6),
  },
  bulletText: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
  },
  instructionBox: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: scale(8),
    padding: scale(12),
    backgroundColor: COLORS.Iceblue,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(16),
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
  },
  price: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontWeight: '700',
  },
  originalPrice: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(24),
    borderRadius: scale(10),
  },
  btnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});