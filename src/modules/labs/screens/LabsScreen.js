import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api/client';
import { useRoute } from '@react-navigation/native';

const LabsListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const categoryId = route?.params?.categoryId;

  // ✅ ADDED
  const uploadedFiles = route?.params?.files || [];
  const isUploadFlow = route?.params?.isUploadFlow || false;

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNearbyLabs = async () => {
    try {
      setLoading(true);

      const response = await api.get('/labs/nearby', {
        params: {
          latitude: 17.4401,
          longitude: 78.3489,
          radius: 8,
          sortBy: 'distance',
          minRating: 3,
          maxRating: 5,
          page: 1,
          limit: 10,
          categoryId: categoryId,
        },
      });

      setLabs(response?.data?.labs || []);
    } catch (error) {
      console.log('API ERROR:', error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearbyLabs();
  }, []);

  const renderStars = (rating = 0) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Icon
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFA500"
          />
        ))}
        <Text style={styles.reviewText}>
          {' '}
          ({rating ? rating.toFixed(1) : 0})
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image
          source={{
            uri:
              item.image ||
              'https://content3.jdmagicbox.com/v2/comp/hyderabad/v3/040pxx40.xx40.160331113748.z9v3/catalogue/apollo-diagnostics-hyderabad-0bhdew3qqm.jpg',
          }}
          style={styles.labImage}
        />

        <View style={styles.labInfo}>
          <Text style={styles.labName}>{item.name}</Text>

          {renderStars(Math.round(item.rating || 0))}

          <View style={styles.locationRow}>
            <Icon name="location-outline" size={14} color="gray" />
            <Text style={styles.city}> {item.city || 'Unknown City'}</Text>
            <Text style={styles.openStatus}>
              {'  '}• {item.isOpen ? 'Open Now' : 'Closed'}
            </Text>
          </View>
        </View>
      </View>

 {/* ✅ PASS SELECTED LAB PROPERLY */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('LabDetails', {
            labId: item.id,
            categoryId: categoryId,
            files: uploadedFiles,
            isUploadFlow: isUploadFlow,
            selectedLab: {
              id: item.id,
              name: item.name,
              city: item.city,
              address: item.address,
              location: item.location,
            },
          })
        }
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Laboratory</Text>

        <Icon name="cart-outline" size={24} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={18} color="gray" />
          <TextInput
            placeholder="Search for labs, Packages"
            style={styles.searchInput}
          />
          <Icon name="mic-outline" size={18} color="gray" />
        </View>

        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="options-outline" size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1E88E5" />
      ) : (
        <FlatList
          data={labs}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default LabsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 45,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 8,
  },

  filterBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
  },

  labImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },

  labInfo: {
    flex: 1,
  },

  labName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  reviewText: {
    fontSize: 13,
    color: 'gray',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  city: {
    fontSize: 13,
    color: 'gray',
  },

  openStatus: {
    fontSize: 13,
    color: 'green',
  },

  button: {
    backgroundColor: '#1E88E5',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
