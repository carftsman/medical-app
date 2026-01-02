import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import BackButton from '../components/BackButton';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { verifyOtp, sendOtp } from '../services/authService';
import { isValidOtp } from '../utils/validation';
import { COLORS, FONT, SIZES } from '../config/constants';
import useAuth from '../hooks/useAuth';

const OTP_LENGTH = 6;
const RESEND_DELAY = 60;

export default function EnterOTPScreenLogin({ navigation, route }) {
  const phone = route?.params?.phone;

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [showSuccess, setShowSuccess] = useState(false);

  const [timer, setTimer] = useState(RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inlineError, setInlineError] = useState(null);

  const { saveToken } = useAuth();

  const intervalRef = useRef(null);
  const verifyRef = useRef(false);
  const resendRef = useRef(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleChange = useCallback((index, text) => {
    const digit = text.replace(/\D/g, '');
    setDigits(prev => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  }, []);

  const focusNext = (index, text) => {
    if (text && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const focusPrevious = index => {
    if (index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleVerify = useCallback(async () => {
    if (verifyRef.current) return;
    verifyRef.current = true;
    Keyboard.dismiss();

    const otp = digits.join('');

    if (!isValidOtp(otp, OTP_LENGTH)) {
      setInlineError(`Please enter ${OTP_LENGTH} digits`);
      verifyRef.current = false;
      return;
    }

    setLoading(true);
    const resp = await verifyOtp({ phone, otp });
    setLoading(false);

    if (resp.success && resp.verified) {
      setShowSuccess(true);
      saveToken(resp.token);
    } else {
      setInlineError(resp.message || 'Verification failed');
    }

    setTimeout(() => (verifyRef.current = false), 500);
  }, [digits, phone]);

  const handleResend = async () => {
    if (!canResend || resendRef.current) return;
    resendRef.current = true;

    setInlineError(null);
    setCanResend(false);
    setTimer(RESEND_DELAY);

    const resp = await sendOtp(phone);

    if (!resp.success) setInlineError(resp.message || 'Failed to resend OTP');

    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    setTimeout(() => (resendRef.current = false), 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.top}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.header}>OTP Verification</Text>
        </View>

        <Text style={styles.info}>
          A 6 digit OTP has been sent to your phone number{' '}
          <Text style={styles.phoneNumber}>{phone}</Text>
          <Text style={styles.change} onPress={() => navigation.goBack()}>
            {' '}
            Change
          </Text>
        </Text>

        <Text style={styles.label}>Enter OTP</Text>

        <View style={styles.otpContainer}>
          {digits.map((v, i) => (
            <TextInput
              key={i}
              ref={r => (inputsRef.current[i] = r)}
              value={v}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={i === 0}
              onChangeText={text => {
                handleChange(i, text);
                focusNext(i, text);
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace' && !digits[i]) {
                  focusPrevious(i);
                }
              }}
            />
          ))}
        </View>

        {inlineError && <Text style={styles.errorText}>{inlineError}</Text>}

        <PrimaryButton
          title={loading ? 'Verifying...' : 'Verify OTP'}
          onPress={handleVerify}
        />

        <TouchableOpacity
          disabled={!canResend}
          onPress={handleResend}
          style={styles.resendRow}
        >
          <Text
            style={[styles.resendText, !canResend && styles.resendDisabled]}
          >
            {canResend
              ? 'Resend code'
              : `Resend in 00:${String(timer).padStart(2, '0')}`}
          </Text>
        </TouchableOpacity>

        <Modal transparent visible={showSuccess} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.card}>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={40} color={COLORS.primary} />
              </View>

              <Text style={styles.mTitle}>Yeay! Welcome Back</Text>

              <Text style={styles.mSubtitle}>
                Once again you login successfully into medidoc app
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.replace('Bottom')}
              >
                <Text style={styles.buttonText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.large,
  },

  top: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },

  header: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginLeft: 50,
    fontWeight: '700',
  },

  info: {
    fontSize: SIZES.small + 1,
    color: COLORS.gray,
    marginBottom: SIZES.large,
  },
  change: { color: COLORS.danger },

  label: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginBottom: 10,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },

  otpBox: {
    width: 48,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
  },

  resendText: { color: COLORS.black },
  resendDisabled: { color: COLORS.gray },

  resendRow: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: { color: 'red', textAlign: 'center', marginVertical: 10 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    width: '85%',
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 10,
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#EEF2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  mTitle: { fontSize: 20, fontFamily: FONT.bold },
  mSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginVertical: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    width: '70%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONT.medium,
  },
});
