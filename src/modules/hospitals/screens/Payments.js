
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import api from '../../../api/client';
import { COLORS, FONT, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import Backbtn from '../components/Backbtn';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debitCardSchema, upiSchema } from '../utils/PayValidation';

const PAYMENT_MODES = [
  { id: 'debit', title: 'Debit Card', iconType: 'vector', iconName: 'card-outline' },
  { id: 'upi', title: 'UPI', icon: require('../../../../assets/Upi.png') },
  { id: 'phonepe', title: 'PhonePe', icon: require('../../../../assets/PhonePe.png') },
  { id: 'gpay', title: 'Google Pay', icon: require('../../../../assets/Google.png') },
];

const PaymentScreen = ({ navigation, route }) => {
  const bookingId = useSelector(state => state.hospital?.consultation?.bookingId);
  const totalAmount = route?.params?.totalFee ?? 0;
  const women = route?.params?.women;

  const [selectedMethod, setSelectedMethod] = useState(null);

  const debitForm = useForm({
    resolver: zodResolver(debitCardSchema),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardHolderName: '',
      expiry: '',
      cvv: '',
      secureCard: false,
    },
  });

  const upiForm = useForm({
    resolver: zodResolver(upiSchema),
    mode: 'onChange',
    defaultValues: {
      upiId: '',
      saveVpa: false,
    },
  });

  /* API */

  const confirmBooking = async () => {
    if (!bookingId) {
      alert('Booking ID missing');
      return;
    }

    try {
      const res = await api.post(
        `/appointments/${bookingId}/payment`,
        {}
      );

      if (!women) {
        navigation.replace('BookingSuccess', {
          bookingId,
          status: res.data.status,
          message: res.data.message,
        });
      }
      else {
        navigation.replace('WomenBookingSuccess', {
          bookingId,
          status: res.data.status,
          message: res.data.message,
        });
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || 'Payment failed');
      } else {
        alert('Network error');
      }
    }
  };

  /* DEBIT FORM */

  const renderDebitForm = () => (
    <View style={styles.formContainer}>
      {/* Card Number */}
      <Text style={styles.fieldLabel}>Card Number</Text>
      <Controller
        control={debitForm.control}
        name="cardNumber"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="XXXX XXXX XXXX XXXX"
            keyboardType="number-pad"
            value={field.value}
            maxLength={19}
            onChangeText={text => {
              const digits = text.replace(/\D/g, '').slice(0, 16);
              const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
              field.onChange(formatted);
            }}
          />
        )}
      />
      {debitForm.formState.errors.cardNumber && (
        <Text style={styles.errorText}>
          {debitForm.formState.errors.cardNumber.message}
        </Text>
      )}

      <Text style={styles.fieldLabel}>Card Holder Name</Text>
      <Controller
        control={debitForm.control}
        name="cardHolderName"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {debitForm.formState.errors.cardHolderName && (
        <Text style={styles.errorText}>
          {debitForm.formState.errors.cardHolderName.message}
        </Text>
      )}

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.fieldLabel}>Valid Upto</Text>
          <Controller
            control={debitForm.control}
            name="expiry"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="number-pad"
                maxLength={5}
                value={field.value}
                onChangeText={text => {
                  let digits = text.replace(/\D/g, '').slice(0, 4);
                  if (digits.length >= 3) {
                    digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                  }
                  field.onChange(digits);
                }}
              />
            )}
          />
          {debitForm.formState.errors.expiry && (
            <Text style={styles.errorText}>
              {debitForm.formState.errors.expiry.message}
            </Text>
          )}
        </View>
        <View style={{ flex: 1, marginLeft: scale(10) }}>
          <Text style={styles.fieldLabel}>CVV</Text>
          <Controller
            control={debitForm.control}
            name="cvv"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="number-pad"
                secureTextEntry
                maxLength={3}
                value={field.value}
                onChangeText={text => {
                  field.onChange(text.replace(/\D/g, '').slice(0, 3));
                }}
              />
            )}
          />
          {debitForm.formState.errors.cvv && (
            <Text style={styles.errorText}>
              {debitForm.formState.errors.cvv.message}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        disabled={!debitForm.formState.isValid}
        style={[
          styles.payBtn,
          !debitForm.formState.isValid && styles.disabledBtn,
        ]}
        onPress={confirmBooking}
      >
        <Text style={styles.payText}>
          Pay ₹{totalAmount.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  /* UPI FORM */

  const renderUpiForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.fieldLabel}>UPI ID</Text>
      <Controller
        control={upiForm.control}
        name="upiId"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="example@upi"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      {upiForm.formState.errors.upiId && (
        <Text style={styles.errorText}>
          {upiForm.formState.errors.upiId.message}
        </Text>
      )}

      <Controller
        control={upiForm.control}
        name="saveVpa"
        render={({ field }) => (
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => field.onChange(!field.value)}
          >
            <View
              style={[
                styles.checkbox,
                field.value && styles.checkboxChecked,
              ]}
            />
            <Text style={styles.checkboxLabel}>
              Save VPA for future
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        disabled={!upiForm.formState.isValid}
        style={[
          styles.payBtn,
          !upiForm.formState.isValid && styles.disabledBtn,
        ]}
        onPress={confirmBooking}
      >
        <Text style={styles.payText}>
          Pay ₹{totalAmount.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.paymentItem,
          selectedMethod === item.id && styles.selectedItem,
        ]}
        onPress={() => setSelectedMethod(item.id)}
      >
        <View style={styles.leftRow}>
          {item.iconType === 'vector' ? (
            <Ionicons name={item.iconName} size={24} color={COLORS.darkgray} />
          ) : (
            <Image source={item.icon} style={styles.icon} />
          )}
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View
          style={[
            styles.radio,
            selectedMethod === item.id && styles.radioSelected,
          ]}
        />
      </TouchableOpacity>

      {item.id === 'debit' && selectedMethod === 'debit' && renderDebitForm()}
      {item.id === 'upi' && selectedMethod === 'upi' && renderUpiForm()}
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <Backbtn onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.amountRow}>
        <Text style={styles.label}>Total Payable</Text>
        <Text style={styles.amount}>₹{totalAmount.toFixed(2)}</Text>
      </View>

      <FlatList
        data={PAYMENT_MODES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {(selectedMethod === 'phonepe' || selectedMethod === 'gpay') && (
        <TouchableOpacity style={styles.bottomPayBtn} onPress={confirmBooking}>
          <Text style={styles.payText}>
            Pay ₹{totalAmount.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(SIZES.large),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },

  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },

  label: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  amount: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },

  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },

  selectedItem: {
    backgroundColor: COLORS.Iceblue,
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: scale(26),
    height: scale(26),
    marginRight: scale(12),
    resizeMode: 'contain',
  },

  title: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.regular,
    color: COLORS.black,
  },

  radio: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: 2,
    borderColor: COLORS.gray,
  },

  radioSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  formContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
    backgroundColor: COLORS.white,
  },

  fieldLabel: {
    marginTop: verticalScale(12),
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(8),
    padding: scale(12),
    marginTop: verticalScale(8),
    fontFamily: FONT.regular,
  },

  row: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },

  checkbox: {
    width: scale(18),
    height: scale(18),
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    borderRadius: scale(4),
    marginRight: scale(8),
  },

  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  checkboxLabel: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.black,
  },

  payBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(8),
    paddingVertical: verticalScale(14),
    marginTop: verticalScale(20),
  },

  payText: {
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: scale(SIZES.medium),
  },

  bottomPayBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    marginHorizontal: scale(16),
    marginBottom: verticalScale(12),
    borderRadius: scale(10),
  },

  disabledBtn: {
    backgroundColor: COLORS.lightGray,
  },

  errorText: {
    marginTop: verticalScale(4),
    fontSize: scale(11),
    fontFamily: FONT.regular,
    color: 'red',
  },
});
