import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CategoryCard = ({imageUrl, title}) => {
  return (
    <TouchableOpacity>
    <View style={styles.container}>
      <View style={styles.imgbg}>
        <Image  style={styles.Image} source = {imageUrl} resizeMode='contain'/>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
    </TouchableOpacity>
  );
}

export default CategoryCard;
const styles  = StyleSheet.create({
  container: {
  
    alignItems: 'center',
    justifyContent: 'center'
  },
  Image: {
    width: 60,
    height: 60,
    
  },
  imgbg: {
  width: 90,
height: 90,
backgroundColor: '#DAEDFE',
borderRadius: 100,
borderWidth: 4,
justifyContent: 'center',
alignItems: 'center',
borderColor:  '#DBEAFE',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
  }
})