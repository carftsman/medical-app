import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/* ---------- STATIC CATEGORY DATA ---------- */

const GENERAL_HEALTH = [
  { id: '1', title: 'Full Body Checkup', image: require('../../../../assets/full_body.png') },
  { id: '2', title: 'Vitamins', image: require('../../../../assets/vitamins.png') },
  { id: '3', title: 'Hormone Health', image: require('../../../../assets/hormone.png') },
  { id: '4', title: 'Fertility', image: require('../../../../assets/fertility.png') },
  { id: '5', title: 'Immunity', image: require('../../../../assets/immunity.png') },
  { id: '6', title: 'Hair Fall', image: require('../../../../assets/hair_fall.png') },
  { id: '7', title: 'Sexual Health', image: require('../../../../assets/sexual_health.png') },
  { id: '8', title: 'Pregnancy', image: require('../../../../assets/pregnancy.png') },
];

const ILLNESS_CONDITIONS = [
  { id: '9', title: 'Fever', image: require('../../../../assets/fever.png') },
  { id: '10', title: 'Infection', image: require('../../../../assets/infection.png') },
  { id: '11', title: 'Kidney', image: require('../../../../assets/kidney.png') },
  { id: '12', title: 'Allergies', image: require('../../../../assets/allergies.png') },
  { id: '13', title: 'Blood Test', image: require('../../../../assets/Bloodtest.png') },
  { id: '14', title: 'Respiratory Issues', image: require('../../../../assets/respiratory.png') },
];

/* ---------- CATEGORY ITEM ---------- */

const CategoryItem = ({ item }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Image source={item.image} style={styles.icon} />
    <Text style={styles.label}>{item.title}</Text>
  </TouchableOpacity>
);

/* ---------- MAIN SCREEN ---------- */

export default function CategoriesScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredGeneralHealth = useMemo(() => {
    if (!searchText.trim()) return GENERAL_HEALTH;
    return GENERAL_HEALTH.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const filteredIllnessConditions = useMemo(() => {
    if (!searchText.trim()) return ILLNESS_CONDITIONS;
    return ILLNESS_CONDITIONS.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <View style={styles.container}>

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity>
          <Icon name="cart-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View style={styles.searchBox}>
        <Icon name="search-outline" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search by Category, Gen..."
          placeholderTextColor="#9CA3AF"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <Icon name="mic-outline" size={18} color="#9CA3AF" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>General Health</Text>
        <FlatList
          data={filteredGeneralHealth}
          numColumns={4}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />

        <Text style={styles.sectionTitle}>Illness Conditions</Text>
        <FlatList
          data={filteredIllnessConditions}
          numColumns={4}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CategoryItem item={item} />}
        />
      </ScrollView>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 8,
    color: '#111827',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 14,
    color: '#111827',
  },

  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 22,
  },

  icon: {
    width: 71,
    height: 99,
    resizeMode: 'contain',
    marginBottom: 8,
  },

  label: {
    fontSize: 12,
    textAlign: 'center',
    color: '#374151',
    paddingHorizontal: 6,
  },
});
