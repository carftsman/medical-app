import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../../utils/styling';
import {SIZES, FONT, COLORS} from '../../../../config/constants';


const WomenHospitalSearch = ({ value, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Icon
          name="magnify"
          size={scale(18)}
          color="#9CA3AF"
          style={styles.icon}
        />

        <TextInput
          placeholder="Search hospital name or location"
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={text => onChange(text)}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>
    </View>
  );
};

export default WomenHospitalSearch;


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(44),
    backgroundColor: COLORS.lightGray,
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
  },

  icon: {
    marginRight: scale(6),
  },

  input: {
    flex: 1,
    fontSize: scale(SIZES.small),
    fontFamily: FONT.regular,
    color: COLORS.darkgray,
    paddingVertical: 0,
  },

});

