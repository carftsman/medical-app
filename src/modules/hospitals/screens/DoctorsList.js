import React from 'react';
import { View, Text,StyleSheet ,TextInput,FlatList,TouchableOpacity,Image,} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { useEffect,useState } from 'react';
import axios from 'axios';

const DoctorsList = () => {
  const[ doctors, setDoctors ] =useState([]);
  const[selectedtab, setSelectedTab]= useState('All');
  const[search, setSearch]= useState('');

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const response = await axios.get('https://api.example.com/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
   const filteredDoctors = doctors.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = selectedTab === 'All' || item.specialization === selectedTab;
    return matchSearch && matchTab;
   });
     const renderDoctor = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text> ⭐ {item.rating} </Text>
        </View>
        <Text style={styles.speciality}>{item.speciality}</Text>
        <Text style={styles.hospital}>{item.hospital}</Text>
         <View style={styles.detailsrow}>
           <Text>{item.experience}</Text>
           <Text> {item.fee}</Text>
           <Text>{item.time}</Text>
         </View>
         <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Appointment</Text>
         </TouchableOpacity>
      </View>
      </View>
   
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doctors List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search doctors..."
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.tabs}>
        {['All', 'Gynecologist', 'Cardiologist'].map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tab,
                selectedTab === tab && styles.activeTab,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
       <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id.toString()}
         showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default DoctorsList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    fontSize: 13,
  },
  activeTab: {
    backgroundColor: '#2563EB',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  speciality: {
    color: '#2563EB',
    fontSize: 13,
  },
  hospital: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

