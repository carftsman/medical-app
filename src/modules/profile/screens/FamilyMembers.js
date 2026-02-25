import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import FamilyDetailsCard from '../components/FamilyDetailsCard'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale } from '../../../utils/styling'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const FamilyMembers = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const familyData = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      relationship: 'Father',
      age: 55,
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: '2',
      name: 'Sita Kumar',
      relationship: 'Mother',
      age: 50,
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    }
  ];

  const filteredData = familyData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <View style={styles.container}>

      <View style={styles.screenHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.screenHeaderText}>Family Members</Text>
        <View style={{ width: scale(26) }}></View>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="magnify" size={22} color="gray" />
        <TextInput
          placeholder="Search family member..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>


      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FamilyDetailsCard
            image={item.image}
            name={item.name}
            relationship={item.relationship}
            age={item.age}
            gender={item.gender}
          // onEdit={() => console.log('Edit', item.name)}
          // onDelete={() => console.log('Delete', item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity onPress={() => navigation.navigate('AddFamilyMembers')} style={styles.btn}>
        <Text style={styles.book}>Add Family Member</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FamilyMembers

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    backgroundColor: '#ffffff',
    flex: 1
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(15),
  },
  screenHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
  },
  btn: {
    borderRadius: scale(20),
    backgroundColor: '#056FD2',
    marginHorizontal: scale(10),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
    // padding: scale(20)
  },
  book: {
    color: '#fff',
    fontSize: scale(16),
    paddingVertical: verticalScale(18),
    textAlign: 'center',
    fontWeight: '600',
  },
})