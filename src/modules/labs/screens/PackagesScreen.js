import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import PackagesFilterModal from '../components/PackagesFilterModal';
import { labApi } from '../services/labApi';
import PackageCard from '../components/PackageCard';
import PackageCardSkeleton from '../components/PackageCardSkeleton';
import PackagesHeader from '../components/PackagesHeader';
import { COLORS } from '../../../config/constants';
import { scale } from '../../../utils/styling';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { addToCart } from '../redux/labsCartSlice';

const PackagesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const labId = route?.params?.labId;
  const selectedAge = route?.params?.selectedAge;
  const categoryId = route?.params?.categoryId;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.labsCart.items);
  const { user } = useAuth();
  const userId = user?.id;

  const [filterVisible, setFilterVisible] = useState(false);
  const [labName, setLabName] = useState('');
  const [data, setData] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [addingItemIds, setAddingItemIds] = useState([]);

  const formatPackages = packages => {
    return (
      packages?.map(item => ({
        id: item.packageId,
        name: item.packageName,
        price: item.finalPrice,
        reportTime: item.reportTime,
        testsCount: item.testsCount,
        tests: item.tests,
        originalPrice: item.originalPrice,
        discountPercent: item.discountPercent,
        gender: item.gender || 'ALL',
        labId,
        image:
          item.imageUrl ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxEscPwXOmagb4I6akEBtLthHxH2gFrB_xg&s',
      })) || []
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (labId) {
        fetchLabDetails();
        fetchPackagesWithParams();
      }
    }, [labId, selectedAge, categoryId]),
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  const fetchLabDetails = async () => {
    try {
      const res = await labApi.getLabDetails(labId);
      setLabName(res?.data?.name || 'Laboratory');
    } catch (error) {
      console.log(
        'Lab details fetch error:',
        error?.response?.data || error.message,
      );
    }
  };

  const fetchPackagesWithParams = async () => {
    try {
      setListLoading(true);

      let params = {};

      if (selectedAge) {
        params.minAge = selectedAge;
        params.maxAge = selectedAge;
      }

      if (categoryId) {
        params.categoryId = categoryId;
      }

      console.log('FILTER PARAMS:', params);

      const res =
        selectedAge || categoryId
          ? await labApi.filterPackages(labId, params)
          : await labApi.getLabTests(labId);

      setData(formatPackages(res?.data?.packages || []));
    } catch (error) {
      console.log('Packages fetch error:', error);
    } finally {
      setListLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setListLoading(true);

      const res = await labApi.getLabTests(labId);
      const allPackages = res?.data?.packages || [];

      const filtered =
        searchText.trim().length === 0
          ? allPackages
          : allPackages.filter(item =>
              item.packageName
                ?.toLowerCase()
                .includes(searchText.toLowerCase()),
            );

      setData(formatPackages(filtered));
    } catch (error) {
      console.log('Search error:', error);
    } finally {
      setListLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchPackagesWithParams();
    } catch (error) {
      console.log('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddToCart = async item => {
    try {
      console.log('handleAddToCart', item);
      console.log(addingItemIds.includes(item.id));
      if (addingItemIds.includes(item.id)) return;

      setAddingItemIds(prev => [...prev, item.id]);

      const payload = {
        userId: userId,
        labId: item.labId,
        packageId: item.id,
        quantity: 1,
      };

      const res = await labApi.addToLabCart(payload);
      console.log('packages screen', res.data);
      if (res?.data?.item) {
        dispatch(addToCart(res.data.item));
      }
    } catch (error) {
      Alert.alert('', error.response.data.message || error.message, [
        {
          text: 'ok',
        },
        {
          text: 'view cart',
          onPress: () => navigation.navigate('CartScreen'),
        },
      ]);
      console.log(
        'Add to cart failed:',
        error?.response?.data || error.message,
      );
    }
  };

  const applyFilters = async filters => {
    try {
      setListLoading(true);

      let params = {};

      if (filters.feeRange) {
        const [min, max] = filters.feeRange.split('-');
        params.minPrice = Number(min);
        params.maxPrice = Number(max);
      }

      // AGE
      if (filters.age) {
        const [min, max] = filters.age.split('-');
        params.minAge = Number(min);
        params.maxAge = Number(max);
      }

      // GENDER
      if (filters.gender) {
        params.gender = filters.gender;
      }

      // SORT
      if (filters.sort) {
        params.sortBy = filters.sort;
      }

      console.log('FILTER PARAMS:', params);

      const res = await labApi.filterPackages(labId, params);

      let packages = formatPackages(res?.data?.packages || []);

      if (filters.sort === 'price_asc') {
        packages.sort((a, b) => a.price - b.price);
      }

      if (filters.sort === 'price_desc') {
        packages.sort((a, b) => b.price - a.price);
      }

      setData([...packages]);
    } catch (error) {
      console.log('Filter error:', error?.response?.data || error.message);
    } finally {
      setListLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PackagesHeader
        title={route?.params?.categoryName || labName}
        searchText={searchText}
        setSearchText={setSearchText}
        onFilterPress={() => setFilterVisible(true)}
      />

      {listLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <PackageCardSkeleton key={index} />
        ))
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tests found</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => {
            const isAdded = cartItems.some(
              cart => Number(cart.packageId) === Number(item.id),
            );

            return (
              <PackageCard
                item={item}
                isAdded={isAdded}
                onAddToCart={() => handleAddToCart(item)}
                onViewDetails={() =>
                  navigation.navigate('PackagesDetails', {
                    packageId: item.id,
                    labId: item.labId,
                  })
                }
              />
            );
          }}
        />
      )}

      <PackagesFilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={applyFilters}
      />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
