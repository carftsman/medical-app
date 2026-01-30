import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../utils/styling';
import { COLORS, FONT } from '../../../config/constants';

const DoctSearchBar = ({ search, setSearch }) => {
  return (
    <View style={styles.searchBox}>
      <Icon name="magnify" size={scale(18)} color="#9E9E9E" />
      <TextInput
        placeholder="Search for Doctors"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
    </View>
  );
};

export default DoctSearchBar;

const styles = StyleSheet.create({
  /* Search */
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.lightGray,
    borderRadius: scale(30),
    paddingHorizontal: scale(12),
    height: verticalScale(58),
    backgroundColor: COLORS.white,
  },

  /* Input Field */
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(14),
    color: COLORS.black,
    fontFamily: FONT.regular,
  },
});
