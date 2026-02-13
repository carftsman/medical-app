import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LabFeedbackInput = ({ value, onChangeText }) => {
    console.log('Feedback Value:', value);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Give your feedback"
        multiline
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default LabFeedbackInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
});
