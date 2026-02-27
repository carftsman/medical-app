import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import api from "../../../api/client";
 
const LabsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryId = route?.params?.categoryId;
 
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
 
  const [sortBy, setSortBy] = useState("distance");
  const [radius, setRadius] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);
  const [minFee, setMinFee] = useState(null);
  const [maxFee, setMaxFee] = useState(null);
 
  const [showFilter, setShowFilter] = useState(false);
 
  const fetchLabs = async () => {
    try {
      setLoading(true);
 
      const response = await api.get("/labs/nearby", {
        params: {
          latitude: 17.4401,
          longitude: 78.3489,
          search,
          sortBy,
          page: 1,
          limit: 50,
          categoryId,
        },
      });
 
      const data = response?.data?.labs || [];
      setLabs(data);
      setFilteredLabs(data);
    } catch (error) {
      console.log("ERROR:", error?.response?.data || error.message);
      setLabs([]);
      setFilteredLabs([]);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchLabs();
  }, [categoryId]);
 
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLabs();
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);
 
  const applyFilters = () => {
    let updated = [...labs];
 
   
    if (radius !== null) {
      updated = updated.filter((lab) => lab.distance <= radius);
    }
 
   
    if (minRating !== null && maxRating !== null) {
      updated = updated.filter(
        (lab) => lab.rating >= minRating && lab.rating <= maxRating
      );
    }
 
   
    if (minFee !== null && maxFee !== null) {
      updated = updated.filter(
        (lab) =>
          lab.consultationFee >= minFee &&
          lab.consultationFee <= maxFee
      );
    }
 
    setFilteredLabs(updated);
    setShowFilter(false);
  };
 
  const clearFilters = () => {
    setSortBy("distance");
    setRadius(null);
    setMinRating(null);
    setMaxRating(null);
    setMinFee(null);
    setMaxFee(null);
    setFilteredLabs(labs);
  };
 
  const renderStars = (rating = 0) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name={i <= Math.round(rating) ? "star" : "star-outline"}
          size={14}
          color="#FFA500"
        />
      ))}
      <Text style={styles.reviewText}> ({rating})</Text>
    </View>
  );
 
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: item.imageUrl || "https://via.placeholder.com/100",
          }}
          style={styles.labImage}
          resizeMode="contain"
        />
 
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          {renderStars(item.rating)}
 
          <View style={styles.locationRow}>
            <Icon name="location-outline" size={13} color="gray" />
            <Text style={styles.city}> {item.city}</Text>
            <Text
              style={[styles.open, { color: item.isOpen ? "#1BB55C" : "red" }]}
            >
              {" "}• {item.isOpen ? "Opens Now" : "Closed"}
            </Text>
          </View>
 
          <Text style={styles.distance}>{item.distance} km away</Text>
          <Text style={styles.fee}>
            Starting from ₹{item.consultationFee}
          </Text>
        </View>
      </View>
 
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() =>
          navigation.navigate("LabDetails", {
            labId: item.id,
            categoryId,
          })
        }
      >
        <Text style={styles.viewText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laboratory</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <Icon name="cart-outline" size={22} />
        </TouchableOpacity>
      </View>
 
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={18} color="#888" />
          <TextInput
            placeholder="Search for labs or city"
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
 
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setShowFilter(true)}
        >
          <Icon name="options-outline" size={20} />
        </TouchableOpacity>
      </View>
 
      {loading ? (
        <ActivityIndicator size="large" color="#1E88E5" />
      ) : filteredLabs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Labs Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredLabs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
 
      <Modal visible={showFilter} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <ScrollView>
              <View style={styles.filterHeader}>
                <Text style={styles.filterTitle}>Filters</Text>
                <TouchableOpacity onPress={clearFilters}>
                  <Text style={{ color: "#1E88E5" }}>Clear All</Text>
                </TouchableOpacity>
              </View>
 
              <Text style={styles.sectionTitle}>
                Distance {radius ? `(${radius} km)` : ""}
              </Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                step={1}
                minimumValue={1}
                maximumValue={50}
                minimumTrackTintColor="#1E88E5"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1E88E5"
                value={radius || 1}
                onValueChange={setRadius}
              />
 
              <Text style={styles.sectionTitle}>Rating</Text>
              {[[1,2],[2,3],[3,4],[4,5]].map((range,index)=>(
                <TouchableOpacity
                  key={index}
                  style={styles.optionRow}
                  onPress={()=>{
                    setMinRating(range[0]);
                    setMaxRating(range[1]);
                  }}
                >
                  <View style={styles.leftRow}>
                    <View style={styles.circle}>
                      {minRating === range[0] && <View style={styles.innerDot} />}
                    </View>
                    <Text style={{ marginLeft: 10 }}>
                      {range[0]} - {range[1]} Stars
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
 
              <Text style={styles.sectionTitle}>Fee Range</Text>
              {[[0,100],[100,300],[300,500],[500,1000]].map((range,index)=>(
                <TouchableOpacity
                  key={index}
                  style={styles.optionRow}
                  onPress={()=>{
                    setMinFee(range[0]);
                    setMaxFee(range[1]);
                  }}
                >
                  <View style={styles.leftRow}>
                    <View style={styles.circle}>
                      {minFee === range[0] && <View style={styles.innerDot} />}
                    </View>
                    <Text style={{ marginLeft: 10 }}>
                      ₹{range[0]} - ₹{range[1]}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
 
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={applyFilters}
              >
                <Text style={{ color:"#fff", fontWeight:"600" }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
 
export default LabsScreen;
 
const styles = StyleSheet.create({
  container:{
  flex:1,
  backgroundColor:"#F6F7F9",
  paddingHorizontal:16
  },
 
  header:{
  flexDirection:"row",
  alignItems:"center",
  paddingTop:12,
  paddingBottom:18
  },
  headerTitle:{
  fontSize:20,
  fontWeight:"700",
  marginLeft:16,
  flex:1
  },
 
  searchRow:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:18
  },
  searchBox:{
  flex:1,
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#fff",
  borderRadius:14,
  paddingHorizontal:14,
  height:48
 },
  searchInput:{
  flex:1,
  marginLeft:8,
  fontSize:14
 },
  filterBtn:{
  marginLeft:12,
  backgroundColor:"#fff",
  borderRadius:14,
  height:48,
  width:48,
  justifyContent:"center",
  alignItems:"center"
 },
 
  card:{
  backgroundColor:"#fff",
  borderRadius:16,
  padding:14,
  marginBottom:16,
  elevation:2
},
  labImage:{
  width:80,
  height:110,
  borderRadius:15
 },
  name:{
  fontSize:15,
  fontWeight:"600",
  marginBottom:4
 },
  reviewText:{
  fontSize:12,
  color:"gray"
},
  locationRow:{
  flexDirection:"row",
  alignItems:"center",
  marginTop:4
},
  city:{
  fontSize:12,
  color:"gray"
 },
  open:{
  fontSize:12
},
  distance:{
  fontSize:11,
  color:"gray",
  marginTop:4
 },
  fee:{
  fontSize:12,
  fontWeight:"600",
  marginTop:4,
  color:"#1E88E5"
 },
  viewBtn:{
  backgroundColor:"#1E88E5",
  marginTop:12,
  paddingVertical:10,
  borderRadius:10,
  alignItems:"center"
 },
  viewText:{
  color:"#fff",
  fontWeight:"600",
  fontSize:14
},
 
  emptyContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:50
  },
  emptyText:{
    fontSize:16,
    color:"#777",
    fontWeight:"500"
  },
 
  modalContainer:{
  flex:1,
  justifyContent:"flex-end",
  backgroundColor:"rgba(0,0,0,0.3)"
  },
  bottomSheet:{
  backgroundColor:"#fff",
  padding:20,
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  maxHeight:"80%"
  },
  filterHeader:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:10
  },
  filterTitle:{
  fontSize:18,
  fontWeight:"700"
  },
  sectionTitle:{
  marginTop:15,
  fontWeight:"600"
  },
  optionRow:{ paddingVertical:12
 
   },
 
  leftRow:{
  flexDirection:"row",
  alignItems:"center" },
 
  circle:{
    width:18,
    height:18,
    borderRadius:9,
    borderWidth:2,
    borderColor:"#247ad1",
    justifyContent:"center",
    alignItems:"center"
  },
 
  innerDot:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:"#247ad1"
  },
 
  applyBtn:{
  backgroundColor:"#1E88E5",
  padding:14,
  borderRadius:12,
  alignItems:"center",
  marginTop:20 },
});