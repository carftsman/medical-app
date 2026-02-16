import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LabStarRating from '../components/LabStarRating';
import LabFeedbackInput from '../components/LabFeedbackInput';
import LabSubmitButton from '../components/LabSubmitButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';


const LabFeedback = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
  };

  return (
    <SafeAreaView style={styles.container}>
     < View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000"marginBottom={13} />
        </TouchableOpacity>
      
        <Text style={styles.header}> Rate Your Experience</Text>
        <View style={{ width: 24 }} />
      </View>

      <LabStarRating rating={rating} onChange={setRating} />

      <LabFeedbackInput value={feedback} onChangeText={setFeedback} />

      <LabSubmitButton title="Submit" />
    </SafeAreaView>
  );
};

export default LabFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: scale(20),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
