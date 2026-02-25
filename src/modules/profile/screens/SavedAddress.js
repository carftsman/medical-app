import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import api from "../../../api/client"
import useAuth from "../../../hooks/useAuth"

function SavedAddress({ navigation, route }) {

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth()
  const USER_ID = user?.id || 6;

  // GET ADDRESS API
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/labs/address`, {
        params: { userId: USER_ID }
      });

      const result = response.data;

      let combinedAddresses = [];

      if (result.defaultAddress) {
        combinedAddresses.push(result.defaultAddress);
      }

      if (result.savedAddresses && result.savedAddresses.length > 0) {
        combinedAddresses = [
          ...combinedAddresses,
          ...result.savedAddresses
        ];
      }

      setAddresses(combinedAddresses);

    } catch (error) {
      console.log("error", error?.response?.data?.message || error.message)
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Refresh when returning from AddAddress
  useEffect(() => {
    if (route.params?.refresh) {
      fetchAddresses();
    }
  }, [route.params?.refresh]);

  const goToAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  const deleteAddress = async (index, id) => {
    try {
      await api.delete(`/labs/address/${id}`);

      const updated = [...addresses];
      updated.splice(index, 1);
      setAddresses(updated);

      Alert.alert('Success', 'Address deleted successfully');

    } catch (error) {
      console.log('Delete Error:', error);
      Alert.alert('Error', 'Unable to delete address');
    }
  };

  const renderAddress = ({ item, index }) => (
    <View style={styles.card}>

      <View style={styles.leftSection}>
        <Text style={styles.name}>{item.fullName || ''}</Text>

        <Text style={styles.addressText}>
          {item.house || ''}, {item.street || ''}
        </Text>

        <Text style={styles.addressText}>
          {item.city || ''}, {item.state || ''}, {item.pinCode || ''}
        </Text>

        {item.mobile && (
          <Text style={styles.phone}>
            +91 {item.mobile}
          </Text>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.iconSection}>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate('AddAddress', {
              editData: item,
              editIndex: index
            })
          }
        >
          <Icon name="pencil" size={24} color="#1E73BE" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteAddress(index, item.id)}
        >
          <Icon
            name="trash-outline"
            size={scale(22)}
            color="#FF4D4F"
          />
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={scale(24)} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Address</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1E73BE" />
        </View>
      ) : addresses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Icon name="location-outline" size={scale(50)} color="#1E73BE" />
          </View>

          <Text style={styles.emptyTitle}>No Saved Address to show</Text>

          <Text style={styles.emptySubtitle}>
            There is no saved address to show.
          </Text>

          <TouchableOpacity onPress={goToAddAddress} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={addresses}
            renderItem={renderAddress}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity onPress={goToAddAddress} style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default SavedAddress;

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },

  backButton: {
    position: 'absolute',
    left: scale(16)
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#000'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  listContainer: {
    flex: 1,
    padding: scale(16)
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },

  leftSection: {
    flex: 1
  },

  name: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#000',
    marginBottom: verticalScale(4)
  },

  addressText: {
    fontSize: scale(13),
    color: '#6B6B6B',
    marginTop: verticalScale(2)
  },

  phone: {
    fontSize: scale(13),
    color: '#000',
    marginTop: verticalScale(6)
  },

  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    marginHorizontal: scale(14)
  },

  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  actionButton: {
    marginLeft: scale(14),
    padding: scale(4)
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20)
  },

  emptyIcon: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(25)
  },

  emptyTitle: {
    fontSize: scale(22),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center'
  },

  emptySubtitle: {
    fontSize: scale(14),
    color: '#8A8A8A',
    textAlign: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(25)
  },

  addButton: {
    backgroundColor: '#1E73BE',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(40),
    borderRadius: scale(12)
  },

  addButtonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontWeight: '600'
  },

  bottomButton: {
    backgroundColor: '#1E73BE',
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: 'center',
    marginTop: verticalScale(10)
  },

  bottomButtonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontWeight: '600'
  }

});