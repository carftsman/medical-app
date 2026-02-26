import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react';
import { ScrollView } from 'react-native';


const PaymentsHistory = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  return (
    <View style ={styles.container} >
      <ScrollView showsVerticalScrollIndicator = {false}>
      
      <Text>Payment</Text>
       </ScrollView>
    </View>
   
  
  )
}

export default PaymentsHistory

const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundcolor:'#F5F6F8',
    paddingHorizontal : 16,
},

})