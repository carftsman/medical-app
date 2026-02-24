import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Feathericons from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../../api/client';

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  /*PERMISSION */

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const openGallery = async () => {
    setImageModalVisible(false);

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.assets?.length > 0) {
      setProfileImage(result.assets[0]);
    }
  };

  const openCamera = async () => {
    setImageModalVisible(false);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.assets?.length > 0) {
      setProfileImage(result.assets[0]);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/hospital/user/profile');
        const user = response.data.user;
        console.log("API USER:", user); 

        setFullName(user.fullName || '');
        setPhone(user.phone || '');
        setEmail(user.email || '');
        if (user.gender) {
          setGender(user.gender.trim().toUpperCase());
        } else {
          setGender('');
        }
        setEmergencyName(user.emContactName || '');
        setEmergencyContact(user.emContactNumber || '');

        if (user.DateOfBirth) {
          setDob(user.DateOfBirth); // store ISO directly
          setDate(new Date(user.DateOfBirth));
        } else {
          setDob(null);
        }
      } catch (error) {
        console.log('FULL ERROR:', error);
        console.log('STATUS:', error.response?.status);
        console.log(
          'BACKEND DATA:',
          JSON.stringify(error.response?.data, null, 2),
        );
        alert('Update Failed');
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    console.log('SAVE BUTTON CLICKED');

    try {
      const payload = {
        fullName,
        phone,
        email,
        gender: gender ? gender.toUpperCase() : null,
        emContactName: emergencyName,
        emContactNumber: emergencyContact,
        DateOfBirth: dob || null,
      };

      const response = await api.patch('/hospital/user/profile/edit', payload);

      console.log('Success:', response.data);

      navigation.navigate('Profile', { refresh: true });
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feathericons name="arrow-left" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage.uri }
                : require('../../../../assets/profile.jpg')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <Feathericons
              name="edit-2"
              size={14}
              color="#fff"
              onPress={() => setImageModalVisible(true)}
            />
          </TouchableOpacity>
        </View>
        {/* Input Fields */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.inputWithIcon}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              flex: 1,
              fontSize: scale(14),
              color: '#000',
              marginBottom: verticalScale(5),
              marginTop: verticalScale(12),
            }}
          >
            {dob
              ? new Date(dob).toLocaleDateString('en-GB').replace(/\//g, '-')
              : 'Select Date of Birth'}
          </Text>
          <Feathericons name="calendar" size={18} color="#056FD2" />
        </TouchableOpacity>
        <Text style={styles.label}>Gender</Text>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: scale(10),
              paddingHorizontal: scale(12),
              paddingVertical: verticalScale(10),
              borderWidth: 1,
              borderColor: '#A4A4A4',
            }}
            activeOpacity={0.8}
            onPress={() => setShowGenderOptions(!showGenderOptions)}
          >
            <Text style={{ flex: 1, fontSize: scale(14), color: '#000' }}>
              {gender === 'FEMALE'
                ? 'Female'
                : gender === 'MALE'
                ? 'Male'
                : 'Select Gender'}
            </Text>

            <Feathericons
              name={showGenderOptions ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#A4A4A4"
            />
          </TouchableOpacity>

          {showGenderOptions && (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: verticalScale(3),
              }}
            >
              <TouchableOpacity
                style={{ padding: verticalScale(12) }}
                onPress={() => {
                  setGender('FEMALE');
                  setShowGenderOptions(false);
                }}
              >
                <Text style={{ fontSize: scale(14) }}>Female</Text>
              </TouchableOpacity>

              <View style={{ height: 1, backgroundColor: '#E5E7EB' }} />

              <TouchableOpacity
                style={{ padding: verticalScale(12) }}
                onPress={() => {
                  setGender('MALE');
                  setShowGenderOptions(false);
                }}
              >
                <Text style={{ fontSize: scale(14) }}>Male</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.label}>Emergency Name</Text>
        <TextInput
          style={styles.input}
          value={emergencyName}
          onChangeText={setEmergencyName}
        />
        <Text style={styles.label}>Emergency Contact</Text>
        <TextInput
          style={styles.input}
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
      </ScrollView>
      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            if (Platform.OS === 'android') {
              setShowPicker(false);
            }

            if (event.type === 'dismissed') {
              return; // user pressed cancel
            }

            if (selectedDate) {
              setDate(selectedDate);

              const isoDate = selectedDate.toISOString().split('T')[0];
              setDob(isoDate);
            }
          }}
        />
      )}
      <Modal
        transparent
        animationType="slide"
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setImageModalVisible(false)}
        >
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setImageModalVisible(false);
                openCamera();
              }}
            >
              <Feathericons name="camera" size={scale(20)} color="#000" />
              <Text style={styles.optionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                setImageModalVisible(false);
                openGallery();
              }}
            >
              <Feathericons name="image" size={scale(20)} color="#000" />
              <Text style={styles.optionText}>Photos</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: scale(5),
  },

  cancel: {
    color: '#0071E2',
    fontWeight: '500',
    fontSize: scale(16),
  },

  content: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(5),
  },

  profileImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
  },

  editIcon: {
    position: 'absolute',
    bottom: verticalScale(0),
    right: scale(125),
    backgroundColor: '#056FD2',
    padding: scale(6),
    borderRadius: scale(20),
  },

  label: {
    fontSize: scale(13),
    color: '#444',
    marginBottom: verticalScale(6),
    marginTop: verticalScale(12),
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: '#A4A4A4',
    fontSize: scale(14),
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(2),
    borderWidth: 1,
    borderColor: '#A4A4A4',
  },

  flexInput: {
    flex: 1,
    paddingVertical: verticalScale(10),
    fontSize: scale(14),
  },

  bottomContainer: {
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },

  saveButton: {
    width: '90%',
    backgroundColor: '#056FD2',
    paddingVertical: verticalScale(12),
    borderRadius: scale(12),
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(15),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomSheet: {
    width: '89%',
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 28,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
  },

  optionText: {
    fontSize: scale(16),
    marginLeft: scale(15),
    fontWeight: '500',
  },
});
