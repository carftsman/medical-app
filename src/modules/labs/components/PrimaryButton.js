import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import React from 'react';
import { scale,verticalScale } from '../../../utils/styling' ; 



const PrimaryButton = ({title}) => {
  return (
    <TouchableOpacity style={styles.btn } >
       <Text style= { styles.text} > {title}</Text>
    </TouchableOpacity>  
  );
}

export default PrimaryButton

const styles = StyleSheet.create({
   btn: {
    backgroundColor: '#1976D2',
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    marginTop: verticalScale(14),
  },
  text:{
    color:  '#fff',
    fontsize: scale(15),
    fontWeight:'600',
  },
})