import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { labApi } from '../services/labApi';
import { addToCart } from '../redux/labsCartSlice';
import PackageCard from '../components/PackageCard';
import PackageCardSkeleton from '../components/PackageCardSkeleton';
import { COLORS, SIZES, FONT } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const PackagesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.labsCart.items);

  const labId = 1;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await labApi.getLabTests(labId);
      setData(res?.data?.tests || []);
    } catch (error) {
      console.log('Packages API error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={scale(22)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Multi Specialty Laboratory</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={scale(18)} color={COLORS.gray} />
          <TextInput
            placeholder="Search for tests, Packages"
            placeholderTextColor={COLORS.gray}
            style={styles.searchInput}
          />
          <Icon name="microphone" size={scale(18)} color={COLORS.gray} />
        </View>

        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="tune-variant" size={scale(20)} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* LIST / SKELETON */}
      {loading ? (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <PackageCardSkeleton key={index} />
          ))}
        </>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isAdded = cartItems.some(
              cart => cart.labTestId === item.id,
            );

            return (
              <PackageCard
                item={item}
                isAdded={isAdded}
                onAddToCart={() =>
                  dispatch(
                    addToCart({
                      labTestId: item.id,
                      labId: item.labId,
                      name: item.name,
                      price: item.price,
                      reportTime: item.reportTime,
                    }),
                  )
                }
                onViewDetails={() =>
                  navigation.navigate('PackagesDetails', {
                    labTestId: item.id,
                  })
                }
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default PackagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    padding: scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  headerTitle: {
    marginLeft: scale(12),
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    height: verticalScale(54),
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(8),
    fontSize: SIZES.medium,
  },
  filterBtn: {
    marginLeft: scale(10),
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(10),
  },
});
