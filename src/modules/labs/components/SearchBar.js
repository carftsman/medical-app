import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';

export default function SearchBar({ 
  onFilterPress, 
  onMicPress, 
  value,                
  onChangeText          
}) {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={scale(18)} color="#888" />

        <TextInput
          placeholder="Search by labName, TestName..."
          placeholderTextColor="#999"
          style={styles.input}
          value={value}            
          onChangeText={onChangeText}       
        />

        <TouchableOpacity onPress={onMicPress} style={styles.micBtn}>
          <Ionicons name="mic-outline" size={scale(18)} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
        <Ionicons name="options-outline" size={scale(18)} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },

  search: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: '#625d5d',
  },

  input: {
    flex: 1,
    paddingVertical: verticalScale(8),
    marginLeft: scale(6),
    fontSize: scale(13),
    color: '#000',
  },

  micBtn: {
    paddingLeft: scale(6),
  },

  filterBtn: {
    marginLeft: scale(8),
    backgroundColor: '#F4F6F8',
    padding: scale(10),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: '#858282',
  },
});
