import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../../../api/client';
import { COLORS } from '../../../../config/constants';
import { scale, verticalScale } from '../../../../utils/styling';
import Icon from 'react-native-vector-icons/Ionicons';
 import AntDesign from 'react-native-vector-icons/AntDesign';

const WomenDepartmentsScreen = () => {
  const navigation = useNavigation();
 
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
 
  useEffect(() => {
    fetchCategories();
  }, []);
 
  const fetchCategories = async () => {
    try {
      const response = await api.get('/hospital/user/categories', {
        params: { women: true },
      });
 
      const data = response?.data?.data || [];
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.log('Error fetching categories', error);
    }
  };

  const onSearch = text => {
    setSearchText(text);
 
    if (!text.trim()) {
      setFilteredCategories(categories);
      return;
    }
    const filtered = categories.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCategories(filtered);
  };
const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('WomenHospitalsScreen', {
          departmentId: item.id,
          departmentName:item.name,
        })
      }
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: item.image || item.imageUrl,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.goBack()}
>
  <AntDesign name="left" size={20} color="black" />
</TouchableOpacity>

        <Text style={styles.headerTitle}>Health Categories</Text>
      </View>
      {/* Search */}
      <View style={styles.searchContainer}>
  {/* Search icon */}
  <Icon name="search-outline" size={18} color="#9CA3AF" />
  {/* Input */}
  <TextInput
    placeholder="Search Departments"
    placeholderTextColor="#9CA3AF"
    value={searchText}
    onChangeText={onSearch}
    style={styles.searchInput}
  />
  <Icon name="mic-outline" size={18} color="#9CA3AF" />
</View>
<FlatList
  data={filteredCategories}
  keyExtractor={item => item.id.toString()}
  renderItem={renderItem}
  numColumns={3}                    
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.listContent}
/>
    </View>
  );
};
export default WomenDepartmentsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
  height: verticalScale(64),
  paddingTop: verticalScale(14),  
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: scale(16),
},
backButton: {
  position: 'absolute',
  left: scale(20),
  top: verticalScale(45),        
},
backIcon: {
  fontSize: scale(28),
  color: COLORS.black,
},
headerTitle: {
  fontSize: scale(18),
  fontWeight: '600',
  color: COLORS.black,
  marginTop: verticalScale(25),    
},
 searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.white,
  borderRadius: scale(12),
  paddingHorizontal: scale(12),
  marginHorizontal: scale(16),
  marginTop:scale(16),
  marginBottom: verticalScale(18),
  height: verticalScale(44),
  borderWidth: 1,
  borderColor: COLORS.lightGray,
},
searchInput: {
  flex: 1,
  fontSize: scale(14),
  color: COLORS.black,
  marginHorizontal: scale(8),
},
  listContent: {
    paddingHorizontal: scale(16),
  paddingTop: verticalScale(10),    
  paddingBottom: verticalScale(24),
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
  width: '33.33%',        
  alignItems: 'center',
  marginBottom: verticalScale(18),
},
imageWrapper: {
  width: scale(90),
  height: verticalScale(90),
  borderRadius: scale(16),
  backgroundColor: '#FDF2F8',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: verticalScale(6),
},
image: {
  width: '70%',
  height: '70%',
  borderRadius: scale(12),
},
cardText: {
  fontSize: scale(11),
  color: COLORS.black,
  textAlign: 'center',
  fontWeight: '400',
},
});