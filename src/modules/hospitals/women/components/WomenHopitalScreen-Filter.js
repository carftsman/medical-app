import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../../../../utils/styling';
import { COLORS,SIZES, FONT } from '../../../../config/constants';
const WomenHospitalFilter = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Icon name="tune-variant" size={scale(20)} color={COLORS.pink}/>
  </TouchableOpacity>
);


export default WomenHospitalFilter;

const styles = StyleSheet.create({
  container: {
    width: scale(42),
    height: verticalScale(42),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.pink,   
    backgroundColor: COLORS.white, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
  },

  iconText: {
    fontSize: scale(SIZES.medium),  
    fontFamily: FONT.medium,        
    color: COLORS.pink,        
  },
});



