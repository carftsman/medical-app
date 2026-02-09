import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PackageCard from '../components/PackageCard'
const LabsScreen = () => {
  return (
    <View>
      <Text>LabsScreen</Text>
      <View>
        <PackageCard/>
      </View>
    </View>
  )
}

export default LabsScreen

const styles = StyleSheet.create({})