import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from '../utils/styling';

const SOSButton = () => {
  const [showSOS, setShowSOS] = useState(false);

  return (
    <>
      {showSOS && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={() => setShowSOS(false)}
        />
      )}

      <View style={styles.container}>
        {showSOS && (
          <>
            <TouchableOpacity style={[styles.miniBtn, styles.top]}>
              <Ionicons name="call" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.miniBtn, styles.left]}>
              <Ionicons name="location" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.miniBtn, styles.bottom]}>
              <MaterialCommunityIcons name="ambulance" size={22} color="#fff" />
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => setShowSOS(prev => !prev)}
        >
          <Text style={styles.text}>SOS</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SOSButton;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  container: {
    position: 'absolute',
    bottom: verticalScale(130),
    right: scale(20),
    alignItems: 'center',
    zIndex: 2,
  },

  mainBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },

  text: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },

  miniBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 6,
  },

  top: { bottom: 60, right: 45 },
  left: { right: 75, top:10 },
  bottom: { top: 60, right: 45 },
});
