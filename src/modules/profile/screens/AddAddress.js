import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import api from "../../../api/client";
import useAuth from "../../../hooks/useAuth";


function AddAddress({ navigation, route }) {

const { user } = useAuth();
  const userId = user?.id || 6;
  const editData = route?.params?.editData || null;
  const isEdit = editData !== null;

  const [fullName, setFullName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [stateModalVisible, setStateModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setFullName(editData.fullName || '');
      setHouseNo(editData.houseNo || editData.house || '');
      setStreet(editData.street || '');
      setLandmark(editData.landmark || '');
      setCity(editData.city || '');
      setStateValue(editData.state || '');
      setPincode(editData.pinCode || editData.pincode || '');
      setMobile(editData.mobile || '');
    }
  }, [editData]);

  const indianStates = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
    'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
    'Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
    'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
    'Uttar Pradesh','Uttarakhand','West Bengal',
    'Andaman and Nicobar Islands','Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'
  ];

  const handleSaveAddress = async () => {

    if (!fullName || !houseNo || !street || !city || !stateValue || !pincode || !mobile) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      Alert.alert('Error', 'Full Name should contain only alphabets');
      return;
    }

    if (pincode.length !== 6) {
      Alert.alert('Error', 'Pin code must be 6 digits');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Mobile number must be 10 digits');
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        // UPDATE ADDRESS
        response = await api.patch(
          `/labs/address/${editData.id}`,
          {
            userId: userId,
            fullName: fullName,
            mobile: mobile,
            house: houseNo,
            street: street,
            landmark: landmark,
            city: city,
            state: stateValue,
            pinCode: pincode
          }
        );
      } else {
        // ADD ADDRESS
        response = await api.post(
          '/labs/address',
          {
            userId: userId,
            fullName: fullName,
            mobile: mobile,
            house: houseNo,
            street: street,
            landmark: landmark,
            city: city,
            state: stateValue,
            pinCode: pincode
          }
        );
      }

      if (response?.data) {
        Alert.alert(
          'Success',
          isEdit ? 'Address updated successfully' : 'Address saved successfully'
        );

        navigation.navigate('SavedAddress', { refresh: true });
      }

    } catch (error) {
      console.log('Save Address Error:', error?.response?.data?.message || error.message);
      Alert.alert(
        'Error',
        error?.response?.data?.message || error.message || 'Failed to save address'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {isEdit ? 'Edit Address' : 'Add Address'}
        </Text>

        <View style={{ width: scale(28) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(120) }}
      >
        <View style={styles.formContainer}>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={(text) =>
              setFullName(text.replace(/[^A-Za-z\s]/g, ''))
            }
          />

          <Text style={styles.label}>House / Flat No</Text>
          <TextInput
            placeholder="Enter House / Flat No"
            style={styles.input}
            value={houseNo}
            onChangeText={setHouseNo}
          />

          <Text style={styles.label}>Street / Area</Text>
          <TextInput
            placeholder="Enter Street name / Area"
            style={styles.input}
            value={street}
            onChangeText={setStreet}
          />

          <Text style={styles.label}>Landmark</Text>
          <TextInput
            placeholder="Enter Landmark"
            style={styles.input}
            value={landmark}
            onChangeText={setLandmark}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: scale(12) }}>
              <Text style={styles.label}>City</Text>
              <TextInput
                placeholder="Enter City"
                style={styles.input}
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>State</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setStateModalVisible(true)}
              >
                <Text style={styles.dropdownText}>
                  {stateValue || 'Select'}
                </Text>
                <Icon name="chevron-down" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Pin code</Text>
          <TextInput
            placeholder="Enter Pincode"
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
            value={pincode}
            onChangeText={(text) =>
              setPincode(text.replace(/[^0-9]/g, ''))
            }
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholder="Enter MobileNumber"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            value={mobile}
            onChangeText={(text) =>
              setMobile(text.replace(/[^0-9]/g, ''))
            }
          />

        </View>
      </ScrollView>

      {/* STATE MODAL */}
      <Modal visible={stateModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select State</Text>

            <FlatList
              data={indianStates}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stateItem}
                  onPress={() => {
                    setStateValue(item);
                    setStateModalVisible(false);
                  }}
                >
                  <Text style={styles.stateText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
          <Text style={styles.buttonText}>
            {loading
              ? 'Saving...'
              : isEdit
              ? 'Update Address'
              : 'Add Address'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default AddAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#000'
  },

  formContainer: { paddingHorizontal: scale(20) },

  label: {
    fontSize: scale(14),
    fontWeight: '600',
    marginBottom: verticalScale(6),
    marginTop: verticalScale(15),
    color: '#000'
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(14),
    fontSize: scale(14),
    backgroundColor: '#FFF'
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },

  dropdownText: {
    fontSize: scale(14),
    color: '#000'
  },

  row: { flexDirection: 'row' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: scale(20),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    maxHeight: '70%'
  },

  modalTitle: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#000',
    marginBottom: verticalScale(15)
  },

  stateItem: {
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },

  stateText: {
    fontSize: scale(16),
    color: '#000'
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
    padding: scale(20)
  },

  button: {
    backgroundColor: '#1E73BE',
    paddingVertical: verticalScale(15),
    borderRadius: scale(12),
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontWeight: '600'
  }
});