import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { labApi } from '../services/labApi';
import { addToCart } from '../redux/labsCartSlice';
import { COLORS, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import PackageDetailsSkeleton from '../components/PackageDetailsSkeleton';
const PackageDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.labsCart.items);

  const labTestId = route?.params?.labTestId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    if (!labTestId) {
      setLoading(false);
      return;
    }

    try {
      const res = await labApi.getLabTestDetails(labTestId);
      setData(res?.data);
    } catch (error) {
      console.log('Package details API error', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PackageDetailsSkeleton />;
  }

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Unable to load package details</Text>
      </View>
    );
  }

  const isAdded = cartItems.some(
    item => item.labTestId === data.id,
  );

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri:
              data.image ||
              'https://www.healthchek.in/images/blogs/98312381.jpg',
          }}
          style={styles.banner}
        />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={scale(22)} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={styles.headerTitle} numberOfLines={1}>
            {data.name}
          </Text>

          <TouchableOpacity>
            <Icon name="share-variant" size={scale(20)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.desc}>{data.description}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.info}>🧪 Tests</Text>
        <Text style={styles.infoValue}>12</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.info}>⏱ Reports</Text>
        <Text style={styles.infoValue}>{data.reportTime}</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.price}>₹{data.price}</Text>

        {!isAdded ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              dispatch(
                addToCart({
                  labTestId: data.id,
                  labId: data.labId,
                  name: data.name,
                  price: data.price,
                  reportTime: data.reportTime,
                }),
              )
            }
          >
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
  banner: {
    width: '100%',
    height: verticalScale(300),
    marginTop: 80,
  },
  header: {
    position: 'absolute',
    top: verticalScale(40),
    left: scale(16),
    right: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: scale(12),
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '800',
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
  },
  info: {
    color: COLORS.darkgray,
    fontSize: SIZES.medium,
  },
  infoValue: {
    color: COLORS.primary,
    fontWeight: '600',
    padding: 12,
    fontSize: SIZES.medium,
  },
  bottom: {
    marginTop: 'auto',
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
