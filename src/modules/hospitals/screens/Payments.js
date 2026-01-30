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
import { COLORS, FONT, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Backbtn from '../components/Backbtn';
 
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { debitCardSchema, upiSchema } from '../utils/PayValidation.js';
 
const PAYMENT_MODES = [
  {
    id: 'debit',
    title: 'Debit Card',
    rightText: 'Add Card',
    iconType: 'vector',
    iconName: 'card-outline',
  },
  {
    id: 'upi',
    title: 'UPI',
    rightText: 'Add New UPI ID',
    icon: require('../../../../assets/Upi.png'),
  },
  {
    id: 'phonepe',
    title: 'PhonePe',
    icon: require('../../../../assets/PhonePe.png'),
  },
  {
    id: 'gpay',
    title: 'Google Pay',
    icon: require('../../../../assets/Google.png'),
  },
];
 
const PaymentScreen = ({ navigation }) => {
  const totalAmount = 112.0;
 
  const [showDebitForm, setShowDebitForm] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
 
  /* ---------------- Debit Card Form ---------------- */
  const debitForm = useForm({
    resolver: zodResolver(debitCardSchema),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardHolderName: '',
      expiry: '',
      cvv: '',
    },
  });
 
  /* ---------------- UPI Form ---------------- */
  const upiForm = useForm({
    resolver: zodResolver(upiSchema),
    mode: 'onChange',
    defaultValues: {
      upiId: '',
    },
  });
 
  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.paymentItem} activeOpacity={0.7}>
        <View style={styles.leftRow}>
          {item.iconType === 'vector' ? (
            <Ionicons
              name={item.iconName}
              size={scale(24)}
              color={COLORS.darkgray}
              style={styles.vectorIcon}
            />
          ) : (
            <Image source={item.icon} style={styles.icon} />
          )}
          <Text style={styles.title}>{item.title}</Text>
        </View>
 
        {item.rightText && (
          <Text
            style={styles.rightText}
            onPress={() => {
              setShowDebitForm(item.id === 'debit');
              setShowUpiForm(item.id === 'upi');
            }}
          >
            {item.rightText}
          </Text>
        )}
      </TouchableOpacity>
      {item.id === 'debit' && showDebitForm && renderDebitForm()}
      {item.id === 'upi' && showUpiForm && renderUpiForm()}
    </View>
  );
 //
  /* ---------------- Debit Card UI ---------------- */
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
      placeholder="XXXX - XXXX - XXXX - XXXX"
      keyboardType="number-pad"
      value={field.value}
      onChangeText={text => {
        const digitsOnly = text.replace(/\D/g, '').slice(0, 16);
        const formatted = digitsOnly.replace(/(.{4})/g, '$1 ').trim();
        field.onChange(formatted);
      }}
      maxLength={19} // 16 digits + 3 spaces (optional but recommended)
    />
  )}
/>
 
      {debitForm.formState.errors.cardNumber && (
        <Text style={styles.errorText}>
          {debitForm.formState.errors.cardNumber.message}
        </Text>
      )}
 
      {/* Card Holder Name */}
      <Text style={styles.fieldLabel}>Card Holder’s Name</Text>
      <Controller
        control={debitForm.control}
        name="cardHolderName"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Eg: John Doe"
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
 
      {/* Expiry & CVV */}
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
                value={field.value}
                onChangeText={text => {
                  let f = text.replace(/\D/g, '');
                  if (f.length >= 3) f = f.slice(0, 2) + '/' + f.slice(2, 4);
                  field.onChange(f);
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
    <>
      <TextInput
        style={[styles.input, { flex: 1, marginLeft: scale(10) }]}
        placeholder="CVV"
        keyboardType="number-pad"
        secureTextEntry
        value={field.value}
        onChangeText={text => {
          const digitsOnly = text.replace(/\D/g, '').slice(0, 3);
          field.onChange(digitsOnly);
        }}
        maxLength={3}
      />
      {debitForm.formState.errors.cvv && (
        <Text style={styles.error}>
          {debitForm.formState.errors.cvv.message}
        </Text>
      )}
    </>
  )}
/>
 
          {debitForm.formState.errors.cvv && (
            <Text style={styles.errorText}>
              {debitForm.formState.errors.cvv.message}
            </Text>
          )}
        </View>
      </View>
 
      {/* Proceed */}
      <TouchableOpacity
        disabled={!debitForm.formState.isValid}
        style={[
          styles.proceedBtn,
          !debitForm.formState.isValid && styles.disabledBtn,
        ]}
        onPress={() => {}}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
 
  /* ---------------- UPI UI ---------------- */
  const renderUpiForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.fieldLabel}>UPI ID</Text>
      <Controller
        control={upiForm.control}
        name="upiId"
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID"
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
 
      <TouchableOpacity
        disabled={!upiForm.formState.isValid}
        style={[
          styles.proceedBtn,
          !upiForm.formState.isValid && styles.disabledBtn,
        ]}
        onPress={() => {}}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Backbtn onPress={() => navigation.goBack()} />
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.headerSpacer} />
        </View>
 
        <View style={styles.amountRow}>
          <Text style={styles.label}>Total Payable</Text>
          <Text style={styles.amount}>₹{totalAmount.toFixed(2)}</Text>
        </View>
 
        <Text style={styles.sectionTitle}>Payment Mode</Text>
 
        <FlatList
          data={PAYMENT_MODES}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};
 
export default PaymentScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
  },
 
  backBtn: {
    width: scale(24),
  },
 
  backArrow: {
    fontSize: scale(26),
    color: COLORS.black,
  },
 
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(SIZES.large),
    fontFamily: FONT.medium,
    color: COLORS.black,
  },
 
  headerSpacer: {
    width: scale(24),
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
    color: COLORS.black,
    fontFamily: FONT.bold,
  },
 
  amount: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: scale(SIZES.large),
    fontFamily: FONT.bold,
    color: COLORS.black,
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(9),
    paddingBottom:verticalScale(19),
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightGray,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.white,
  },
 
  selectedItem: {
    backgroundColor: COLORS.Iceblue,
  },
 
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  icon: {
    width: scale(28),
    height: scale(28),
    marginRight: scale(12),
    resizeMode: 'contain',
  },
 
  title: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.regular,
    color: COLORS.black,
  },
 
  rightText: {
    fontSize: scale(SIZES.small),
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
 
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginLeft: scale(16),
    borderBottomWidth: 1.5,
    borderColor: COLORS.lightGray,
  },
  vectorIcon: {
  marginRight: scale(12),
},
formContainer: {
  paddingHorizontal: scale(16),
  paddingBottom: verticalScale(10),
},
 
input: {
  borderWidth: 1,
  borderColor: COLORS.lightGray,
  borderRadius: scale(8),
  padding: scale(12),
  marginTop: verticalScale(10),
},
 
row: {
  flexDirection: 'row',
  marginTop: verticalScale(10),
},
 
proceedBtn: {
  backgroundColor: COLORS.primary,
  borderRadius: scale(8),
  paddingVertical: verticalScale(14),
  marginTop: verticalScale(20),
},
 
disabledBtn: {
  backgroundColor: COLORS.lightGray,
},
 
proceedText: {
  color: COLORS.white,
  textAlign: 'center',
  fontFamily: FONT.bold,
},
fieldLabel: {
  marginTop: verticalScale(12),
  fontSize: scale(SIZES.small),
  fontFamily: FONT.medium,
  color: COLORS.black,
},
 
errorText: {
  marginTop: verticalScale(4),
  color: 'red',
  fontSize: scale(11),
  fontFamily: FONT.regular,
},
});