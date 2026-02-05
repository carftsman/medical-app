import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import {scale, verticalScale} from "../../../utils/styling"

const CategoryCard = ({imageUrl, title}) => {
  return (
    
    <View style={styles.container}>
      <View style={styles.imgbg}>
      <Image  style={styles.Image} source = {imageUrl} resizeMode='contain'/>
    </View>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
    </View>
   
  );
}

export default CategoryCard;
const styles = StyleSheet.create({
  container: {
    width: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
  },
  imgbg: {
    width: scale(90),
    height: scale(90),
    backgroundColor: '#DAEDFE',
    borderRadius: scale(100),
    borderWidth: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DBEAFE',
  },
  title: {
    fontSize: scale(14),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: verticalScale(6),
  },
});

