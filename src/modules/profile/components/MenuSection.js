// components/MenuSection.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import { scale, verticalScale } from '../../../utils/styling';

const MenuSection = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          icon={item.icon}
          danger={item.danger}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
};

export default MenuSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(16),  
    marginBottom: verticalScale(20),
    overflow: 'hidden',
  },
});
