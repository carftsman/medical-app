import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale, verticalScale } from '../../../utils/styling';

const TestResultBox = ({summary,}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>
           {summary}
     </Text>
    </View>
  )
}

export default TestResultBox

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#FDECEA',
        padding: scale(12),
        borderRadius: scale(10),
        marginTop: verticalScale(6),
    },
    text: {
        fontSize: scale(13),
        color: '#C62828',
        lineHeight: verticalScale(18),
    },
})