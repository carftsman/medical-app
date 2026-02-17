import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONT } from '../../../config/constants';
import { scale, verticalScale } from '../../../utils/styling';

const PackagesHeader = ({
  title = 'Multi Specialty Laboratory',
  searchText,
  setSearchText,
  onFilterPress,
}) => {
  const navigation = useNavigation();

  return (
    <>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={scale(22)} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {/* SEARCH + FILTER */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="magnify" size={scale(18)} color={COLORS.gray} />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search for tests, Packages"
            placeholderTextColor={COLORS.gray}
            style={styles.searchInput}
          />

          <Icon name="microphone" size={scale(18)} color={COLORS.gray} />
        </View>

        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <Icon name="tune-variant" size={scale(20)} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PackagesHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  headerTitle: {
    marginLeft: scale(12),
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.black,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    height: verticalScale(54),
  },
  searchInput: {
    flex: 1,
    marginHorizontal: scale(8),
    fontSize: SIZES.medium,
  },
  filterBtn: {
    marginLeft: scale(10),
    backgroundColor: COLORS.white,
    padding: scale(10),
    borderRadius: scale(10),
  },
});
