import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title='Edit Profile' onPress={() => navigation.navigate('EditProfile')} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})