import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LabSubmitButton = ({ title, }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={ () => navigation.navigate('LabFeedbackSuccess')} style={styles.button} >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LabSubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
