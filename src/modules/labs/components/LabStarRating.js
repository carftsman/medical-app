import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LabStarRating = ({ rating, onChange }) => {
    console.log('Rating:', rating);
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity key={item} onPress={() => onChange(item)}>
          <Ionicons
            name={item <= rating ? 'star' : 'star-outline'}
            size={32}
            color={item <= rating ? '#FFC107' : '#C7C7C7'}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LabStarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  star: {
    marginRight: 8,
  },
});
