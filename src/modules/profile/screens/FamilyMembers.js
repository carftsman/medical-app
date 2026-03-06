import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect, cache } from 'react'
import FamilyDetailsCard from '../components/FamilyDetailsCard'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale, verticalScale } from '../../../utils/styling'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../api/client';

const FamilyMembers = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false)
  const fetchFamilyMembers = async () => {
    try {
      setLoading(true);

      const response = await api.get('/family-member');

      console.log("Family Members:", response.data);

      setFamilyData(response.data);

    } catch (error) {
      console.log("Fetch Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
 
  const onDelete = async (id)=> {
    try {
      setLoading(true);
      const response = await api.delete(`/family-member/${id}`);
      console.log("delete", response.data);
      fetchFamilyMembers();
    } catch (error) {
      console.log("err" , error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFamilyMembers();
  }, []);
  const filteredData = familyData.filter(item =>
    item.fullName.toLowerCase().includes(search?.toLowerCase())
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
            name={item.fullName}
            relationship={item.relation}
            age={item.age}
            number={item.phone}
            emailid={item.email}
            gender={item.gender}
            onEdit={() =>
              navigation.navigate("AddFamilyMembers", {
                memberData: item,
              })
            }
            onDelete={()=>onDelete(item.id)}
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