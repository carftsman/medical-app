import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../utils/styling';
import { authApi } from '../api/authApi';
 
export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('phone');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
 
  const [showCodes, setShowCodes] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
 
  const COUNTRY_CODES = ['+91', '+1', '+44', '+61'];
 
  const isValidPhone = v => /^\d{10}$/.test(v);
  const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 
  const handleSendOtp = async () => {
    setError('');
 
    if (!value.trim()) {
      setError('Please enter value');
      return;
    }
 
    if (activeTab === 'phone' && !isValidPhone(value)) {
      setError('Enter valid 10 digit number');
      return;
    }
 
    if (activeTab === 'email' && !isValidEmail(value)) {
      setError('Enter valid email');
      return;
    }
 
    try {
      setLoading(true);
      const payload =
        activeTab === 'phone'
          ? { phone: value }
          : { email: value };

      await authApi.sendOtp(payload);
 
      setLoading(false);

      navigation.navigate('OTP', { value, type:activeTab, });
    } catch (err) {
      console.log("send otp error", err.response)
      setLoading(false);
      setError(err?.response?.data?.message||'Something went wrong');

    }
  };

  
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
 
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
 
        {/* TOGGLE */}
        <View style={styles.toggleWrap}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'phone' && styles.activeToggle]}
            onPress={() => {
              setActiveTab('phone');
              setValue('');
              setError('');
            }}
          >
            <Text style={styles.toggleTxt}>Phone</Text>
          </TouchableOpacity>
 
          <TouchableOpacity
            style={[styles.toggleBtn, activeTab === 'email' && styles.activeToggle]}
            onPress={() => {
              setActiveTab('email');
              setValue('');
              setError('');
            }}
          >
            <Text style={styles.toggleTxt}>Email</Text>
          </TouchableOpacity>
        </View>
 
        <Text style={styles.label}>
          {activeTab === 'phone' ? 'Mobile Number' : 'Email Address'}
        </Text>
 
        {/* INPUT BOX */}
        <View style={styles.inputBox}>
          {activeTab === 'phone' && (
            <View>
              <TouchableOpacity
                style={styles.countryWrap}
                onPress={() => setShowCodes(!showCodes)}
              >
                <Text style={styles.countryText}>{countryCode}</Text>
                <Ionicons name="chevron-down" size={16} />
              </TouchableOpacity>
 
              {showCodes && (
                <View style={styles.dropdown}>
                  {COUNTRY_CODES.map(code => (
                    <TouchableOpacity
                      key={code}
                      style={styles.dropItem}
                      onPress={() => {
                        setCountryCode(code);
                        setShowCodes(false);
                      }}
                    >
                      <Text>{code}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
 
         
          {activeTab === 'email' && (
            <Ionicons
              name="mail-outline"
              size={scale(20)}
              color="#7D8A99"
              style={{ marginRight: scale(8) }}
            />
          )}
 
          <TextInput
            style={styles.input}
            placeholder={activeTab === 'phone' ? 'Enter number' : 'Enter email'}
            placeholderTextColor="#9CA3AF"
            keyboardType={activeTab === 'phone' ? 'number-pad' : 'email-address'}
            autoCapitalize="none"
            maxLength={activeTab === 'phone' ? 10 : 50}
            value={value}
            autoFocus
            onChangeText={t => {
              setValue(t);
              setError('');
            }}
          />
        </View>
 
        {!!error && <Text style={styles.error}>{error}</Text>}
 
        {/* BUTTON */}
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSendOtp}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, padding: scale(24) },
 
  logo: {
    width: scale(150),
    height: scale(120),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: verticalScale(24),
  },
 
  toggleWrap: {
    flexDirection: 'row',
    backgroundColor: '#F1F3F5',
    borderRadius: scale(30),
    marginBottom: verticalScale(24),
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    color:"#2563EB",
    borderColor: '#2563EB',
    borderRadius: scale(30),
  },
  toggleTxt: { fontSize: scale(14), fontWeight: '600' },
 
  label: {
    fontSize: scale(20),
    fontWeight: '700',
    marginBottom: verticalScale(8),
  },
 
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    height: verticalScale(52),
  },
 
  countryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(8),
    marginRight: scale(8),
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  countryText: { fontWeight: '700', marginRight: 4 },
 
  dropdown: {
    position: 'absolute',
    top: verticalScale(52),
    left: 0,
    width: scale(70),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: scale(8),
    zIndex: 10,
  },
  dropItem: {
    padding: scale(8),
  },
 
  input: {
    flex: 1,
    fontSize: scale(16),
    color: '#111',
  },
 
  error: {
    color: '#DC2626',
    marginTop: verticalScale(8),
  },
 
  btn: {
    backgroundColor: '#2563EB',
    marginTop: verticalScale(24),
    paddingVertical: verticalScale(14),
    borderRadius: scale(12),
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: scale(16),
  },
});