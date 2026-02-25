import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, FONT, SIZES } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { patientDetailsSchema } from '../utils/FormValidation';
import Backbtn from '../components/Backbtn';
import Button from '../components/Button';

const DESCRIPTION_HEIGHT = verticalScale(120);

const PatientDetails = ({ route, navigation }) => {
  const [description, setDescription] = useState('');
  const [callMode, setCallMode] = useState('audio');
  const [problem, setProblem] = useState('');

  const categoryName = route.params?.categoryName;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(patientDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
  });

  const onSubmit = data => {
    if (!categoryName) {
      Alert.alert('Validation', 'Please select your health problem');
      return;
    }
    const payload = {
      ...data,
      categoryName,
      description,
      callMode,
    };

    console.log('Final Payload:', payload);

    navigation.navigate('Payments', {});
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }} edges={['top']}>
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={100}
      >
        {/*  Header  */}
        <View style={styles.header}>
          <Backbtn onPress={() => navigation.navigate('HospitalsTab')} />
          <Text style={styles.headerTitle}>Add New Patient</Text>
          <View style={styles.rightSpace} />
        </View>

        <Text style={styles.label}>Patient Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter Patient Name"
              placeholderTextColor={COLORS.lightGray}
              style={[
                styles.input,
                errors.name && { borderColor: COLORS.danger },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>Mobile Number</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter Mobile Number"
              placeholderTextColor={COLORS.lightGray}
              keyboardType="number-pad"
              maxLength={10}
              style={[
                styles.input,
                errors.phone && { borderColor: COLORS.danger },
              ]}
              value={value}
              onChangeText={text => onChange(text.replace(/[^0-9]/g, ''))}
            />
          )}
        />

        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}

        <Text style={styles.label}>Email ID</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email ID"
              placeholderTextColor={COLORS.lightGray}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                errors.email && { borderColor: COLORS.danger },
              ]}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* Health Problem */}
        <Text style={styles.label}>Select your Health Problem</Text>
        <TouchableOpacity
          style={[styles.dropdown, categoryName && styles.active]}
          onPress={() =>
            navigation.navigate('DepartmentsList', {
              onSelect: value => {
                setProblem(value);
              },
            })
          }
        >
          <Text
            style={[
              styles.dropdownText,
              !problem && { color: '#999' },
              categoryName && styles.activeText,
            ]}
          >
            {categoryName || 'Problem'}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </TouchableOpacity>
        {/* {errors.problem && <Text style={styles.error}>{errors.problem}</Text>} */}

        {/*  Mode of Call  */}
        <Text style={styles.label}>Mode of Call</Text>
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              callMode === 'audio' && styles.selectedMode,
            ]}
            onPress={() => setCallMode('audio')}
          >
            <Ionicons
              name="call"
              size={18}
              color={callMode === 'audio' ? '#fff' : '#007bff'}
            />
            <Text
              style={[
                styles.modeText,
                callMode === 'audio' && { color: '#fff' },
              ]}
            >
              Audio Call
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              callMode === 'video' && styles.selectedMode,
            ]}
            onPress={() => setCallMode('video')}
          >
            <Ionicons
              name="videocam"
              size={18}
              color={callMode === 'video' ? '#fff' : '#007bff'}
            />
            <Text
              style={[
                styles.modeText,
                callMode === 'video' && { color: '#fff' },
              ]}
            >
              Video Call
            </Text>
          </TouchableOpacity>
        </View>
        {/*  Description  */}
        <View style={styles.descHeader}>
          <Text style={styles.descLabel}>Describe symptoms in detail</Text>

          <Text style={styles.optional}>(optional)</Text>
        </View>

        <TextInput
          placeholder="Description"
          multiline
          style={[styles.textArea, { height: DESCRIPTION_HEIGHT }]}
          value={description}
          onChangeText={setDescription}
        />
        {/* </ScrollView> */}
        {/* <Button title="Pay Now" onPress={handlePayNow} disabled={false} /> */}
        <Button
          title="Pay Now"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        />
        {/* </KeyboardAvoidingView> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(SIZES.medium),
  },
  safeArea: {
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(SIZES.medium),
  },
  headerTitle: {
    flex: 1,
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.medium,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight: '700',
  },
  rightSpace: {
    width: 25,
  },
  label: {
    fontSize: scale(SIZES.medium),
    fontFamily: FONT.regular,
    color: COLORS.black,
    marginTop: verticalScale(SIZES.small),
    marginBottom: verticalScale(SIZES.base),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(SIZES.base),
    paddingVertical: verticalScale(SIZES.small),
    paddingHorizontal: scale(SIZES.medium),
    fontSize: scale(SIZES.small),
    color: COLORS.black,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(SIZES.base),
    paddingVertical: verticalScale(SIZES.small),
    paddingHorizontal: scale(SIZES.medium),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: scale(SIZES.small),
    color: COLORS.black,
    fontFamily: FONT.regular,
  },
  error: {
    color: COLORS.danger,
    fontSize: scale(SIZES.small),
    marginTop: verticalScale(4),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(SIZES.base),
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: verticalScale(SIZES.small),
    borderRadius: scale(24),
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  selectedMode: {
    backgroundColor: COLORS.primary,
  },
  modeText: {
    marginLeft: scale(SIZES.base),
    fontFamily: FONT.medium,
    fontSize: scale(SIZES.small),
    color: COLORS.primary,
  },
  descHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(SIZES.medium),
  },
  descLabel: {
    fontFamily: FONT.medium,
    fontSize: scale(SIZES.medium),
    color: COLORS.black,
    lineHeight: verticalScale(22),
    letterSpacing: -0.25,
    paddingRight: scale(SIZES.small),
  },
  optional: {
    fontFamily: FONT.medium,
    fontSize: scale(SIZES.medium),
    color: COLORS.black,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: scale(SIZES.base),
    padding: scale(SIZES.medium),
    fontSize: scale(SIZES.medium),
    textAlignVertical: 'top',
    marginTop: verticalScale(SIZES.base),
  },
  active: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.Iceblue,
  },
  activeText: {
    color: COLORS.darkblue,
    fontSize: scale(16),
  },
});
