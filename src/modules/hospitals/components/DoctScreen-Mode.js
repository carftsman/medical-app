import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { verticalScale } from '../../../utils/styling';

const DoctorScreenMode = ({ selected, onChange }) => {
  return (
    <View style={styles.container}>
      {/* Hospital Button */}
      <TouchableOpacity
        style={[styles.button, selected === 'OFFLINE' && styles.activeButton]}
        onPress={() => {
          console.log('Hospital pressed');
          onChange('OFFLINE');
        }}
      >
        <Ionicons
          name="medkit-outline"
          size={18}
          color={selected === 'OFFLINE' ? '#fff' : '#1E90FF'}
          style={styles.icon}
        />
        <Text
          style={[styles.text, selected === 'OFFLINE' && styles.activeText]}
        >
          Hospital Visit
        </Text>
      </TouchableOpacity>

      {/* Online Button */}
      <TouchableOpacity
        style={[styles.button, selected === 'ONLINE' && styles.activeButton]}
        onPress={() => {
          console.log('Online pressed');
          onChange('ONLINE');
        }}
      >
        <Ionicons
          name="videocam-outline"
          size={18}
          color={selected === 'ONLINE' ? '#fff' : '#1E90FF'}
          style={styles.icon}
        />
        <Text style={[styles.text, selected === 'ONLINE' && styles.activeText]}>
          Online Consult
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorScreenMode;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EAF4FF',
    padding: 5,
    borderRadius: 25,
    marginBottom: verticalScale(10),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#1E90FF',
  },
  text: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  icon: {
    marginRight: 6,
  },
});
