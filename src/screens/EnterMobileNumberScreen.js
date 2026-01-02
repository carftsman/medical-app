import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  InteractionManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash.debounce';

import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import BackButton from '../components/BackButton';
import { COLORS, FONT, SIZES } from '../config/constants';
import { sendOtp } from '../services/authService';
import { isValidPhone, normalizePhone } from '../utils/validation';

export default function EnterMobileNumberScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const trimmed = useMemo(() => input.trim(), [input]);
  const validatedPhone = useMemo(() => {
    if (!isValidPhone(trimmed)) return null;
    return normalizePhone(trimmed);
  }, [trimmed]);

  const debouncedSendOtp = useRef(
    debounce(async phone => {
      setLoading(true);

      const resp = await sendOtp(phone);

      setLoading(false);

      if (resp.success) {
        navigation.navigate('OTP', { phone });
      } else {
        setError(resp.message || 'Failed to send OTP');
      }
    }, 1000),
  ).current;

  const handlePress = () => {
    if (!validatedPhone) {
      setError('Please enter a valid phone number');
      return;
    }

    setError(null);
    setLoading(true);

    InteractionManager.runAfterInteractions(() => {
      debouncedSendOtp(validatedPhone);
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Login Using OTP</Text>
        </View>

        <InputField
          placeholder="Enter your Phone Number"
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
          style={{ marginTop: 10, paddingLeft: 45 }}
        />

        <Ionicons
          name="call-outline"
          size={22}
          color={COLORS.gray}
          style={{
            position: 'absolute',
            left: SIZES.large + 35,
            top: 115,
            zIndex: 20,
          }}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <PrimaryButton
          title={loading ? 'Sending...' : 'Login Using OTP'}
          onPress={handlePress}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SIZES.large },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 5,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft: 90,
    fontWeight: '700',
    marginTop: SIZES.medium,
  },
  error: { color: COLORS.danger, marginTop: 10, marginLeft: 10 },
});
