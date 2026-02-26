import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MedicinesFeedbackInput from '../components/MedicinesFeedbackInput';
import MedicinesFeedbackSubmitButton from '../components/MedicinesFeedbackSubmitButton'; 
import MedicinesStarRating from '../components/MedicinesStarRating';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import api from '../../../api/client';


const MedicinesFeedbackScreen = ({route}) => {
  const navigation = useNavigation();
   const id = route?.params?.id || 2;
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  console.log("id",id);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Please rate your experience');
      return;
    }

    try {
      setLoading(true);

      // const response = await api.post(
      //   '/labs/feedback', 
      //   {
      //     bookingId: id, 
      //     rating: rating,
      //     comment: feedback,
      //   },
       
        
      // );

    console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        navigation.navigate(
          'MedicinesFeedbackSuccessScreen',
        
        );

        setRating(0);
        setFeedback('');
        
      }
    } catch (error) {
      console.log('Feedback Error:', error?.response || error);
      Alert.alert('Error', error.response.data.message||'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.header}> Rate Your Experience</Text>
        <View style={{ width: 24 }} />
      </View>

      <MedicinesStarRating rating={rating} onChange={setRating} />

      <MedicinesFeedbackInput value={feedback} onChangeText={setFeedback} />

      <MedicinesFeedbackSubmitButton
        title={loading ? 'Submitting...' : 'Submit'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default MedicinesFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: scale(20),
  },
  topBar: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  header: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(22),
    color: '#222',
  },
});
