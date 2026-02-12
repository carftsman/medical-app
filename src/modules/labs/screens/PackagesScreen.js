import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PackagesFilterModal from '../components/PackagesFilterModal';
import { labApi } from '../services/labApi';
import PackageCard from '../components/PackageCard';
import PackageCardSkeleton from '../components/PackageCardSkeleton';
import PackagesHeader from '../components/PackagesHeader';
import { useRoute } from '@react-navigation/native';
import { COLORS } from '../../../config/constants';
import { scale } from '../../../utils/styling';
import { useLabCart } from '../context/LabCartContext';
const PackagesScreen = () => {
  const navigation = useNavigation();
  const [filterVisible, setFilterVisible] = useState(false);
  const route = useRoute();
  const labId = route?.params?.labId ?? 1;
  const { cartItems, addToCart } = useLabCart();

  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [addingItemIds, setAddingItemIds] = useState([]); // track adding

  useEffect(() => {
    fetchPackages();
    
  }, []);
  useEffect(() => {
  if (searchText.trim().length === 0) {
    fetchPackages(); // reload all packages when search cleared
  } else {
    const delayDebounce = setTimeout(() => {
      searchPackages(searchText);
    }, 400); // small debounce

    return () => clearTimeout(delayDebounce);
  }
}, [searchText]);


  // fetch packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await labApi.getLabTests(labId);

      const formattedData =
        res?.data?.packages?.map(item => ({
          id: item.packageId,
          name: item.packageName,
          price: item.finalPrice,
          reportTime: item.reportTime,
          testsCount: item.testsCount,
          originalPrice: item.originalPrice,
          discountPercent: item.discountPercent,
          labId,
          image: item.imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxEscPwXOmagb4I6akEBtLthHxH2gFrB_xg&s',
        })) || [];

      setData(formattedData);
    } catch (error) {
      console.log('Packages API error', error);
    } finally {
      setLoading(false);
    }
  };

  
  // handle Add to Cart
 const handleAddToCart = async (item) => {
  try {
    if (addingItemIds.includes(item.id)) return;

    setAddingItemIds(prev => [...prev, item.id]);

    const payload = {
      userId: item.userId || 21,
      labId: item.labId,
      labTestId: item.id,
    };

    await addToCart(payload);

  } catch (error) {
    console.log('Add to cart failed:', error?.response?.data || error.message);
  } finally {
    setAddingItemIds(prev => prev.filter(id => id !== item.id));
  }
};
  // apply filters
  const applyFilters = async (filters) => {
  try {
    setLoading(true);

    let minPrice = null;
    let maxPrice = null;

    if (filters.feeRange) {
      const parts = filters.feeRange.split('-');
      minPrice = parts[0].replace('<', '');
      maxPrice = parts[1]?.replace('>', '');
    }

    const payload = {
      minPrice,
      maxPrice,
      age: filters.age,
    };

    console.log("Filter Payload:", payload);

    const res = await labApi.filterPackages(labId, payload);

    const formatted =
      res?.data?.packages?.map(item => ({
        id: item.packageId,
        name: item.packageName,
        price: item.finalPrice,
        reportTime: item.reportTime,
        testsCount: item.testsCount,
        labId,
      })) || [];

    setData(formatted);
  } catch (e) {
    console.log('Filter error', e);
  } finally {
    setLoading(false);
  }
};


  // search packages
  const searchPackages = async (text) => {
    try {
      setLoading(true);
      const res = await labApi.searchLabTests(labId, text);

      const formattedData =
        res?.data?.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          labId: item.labId,
          image: //item.imageUrl || 
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxEscPwXOmagb4I6akEBtLthHxH2gFrB_xg&s',
        })) || [];

      setData(formattedData);
    } catch (error) {
      console.log('Search API error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PackagesHeader
        searchText={searchText}
        setSearchText={setSearchText}
        onFilterPress={() => setFilterVisible(true)}
      />

      {loading ? (
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
          renderItem={({ item }) => {
            const isAdded = cartItems.some(cart => cart.labTestId === item.id);

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
