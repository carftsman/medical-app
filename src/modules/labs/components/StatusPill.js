import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../utils/styling';

const colors = {
  Normal: '#E6F4EA',
  Abnormal: '#FDECEA',
  Borderline: '#FFF4E5',
};

const textColors = {
  Normal: '#2E7D32',
  Abnormal: '#D32F2F',
  Borderline: '#F57C00',
};

export default function StatusPill({ status }) {
  return (
    <View style={[styles.container, { backgroundColor: colors[status] }]}>
      <Text style={[styles.text, { color: textColors[status] }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
  },
  text: {
    fontSize: scale(11),
    fontWeight: '600',
  },
});
