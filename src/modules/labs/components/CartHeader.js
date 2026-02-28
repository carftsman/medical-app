import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS } from '../../../config/constants';

import { useNavigation } from '@react-navigation/native';

const CartHeader = ({ labName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>

      <View style={{ alignItems: 'flex-start' }}>
        <Text style={styles.title}>Cart</Text>
        {labName && (
          <Text
            style={{
              fontSize: scale(12),
              color: COLORS.primary,
              fontWeight: '500',
            }}
          >
            Selected Lab {labName}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(56),
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(10),
    gap: scale(10),
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
