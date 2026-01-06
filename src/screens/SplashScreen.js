import React, { useEffect } from 'react';
import {
  Text,
  Image,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT } from '../config/constants';
import { scale, verticalScale } from '../utils/styling';
import useAuth from '../hooks/useAuth';

export default function SplashScreen({ navigation }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(isAuthenticated ? 'Bottom' : '/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Medical Hunt
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: scale(140),
    height: scale(140),
  },

  title: {
    fontFamily: FONT.extraBold,
    fontSize: scale(26),
    marginTop: verticalScale(10),
    color: COLORS.primary,
    letterSpacing: 0.6,
  },
});
