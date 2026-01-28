// ================= SearchHospital.js =================
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../../../utils/styling';
import { hospitalApi } from '../../../api/hospitalApi';

const SearchHospital = ({ mode = 'BOTH', onResults }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length === 0) {
        onResults([]);
        return;
      }

      searchHospitals();
    }, 500); // debounce

    return () => clearTimeout(timer);
  }, [query, mode]);

  const searchHospitals = async () => {
    try {
      const res = await hospitalApi.searchHospitals({
        query,
        mode,
        page: 1,
        limit: 20,
      });

      // ✅ Swagger response uses `data`
      const hospitals = res?.data?.data || [];

      onResults(Array.isArray(hospitals) ? hospitals : []);
    } catch (error) {
      console.log('Search API error:', error);
      onResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="magnify" size={scale(18)} color="#9E9E9E" />
      <TextInput
        placeholder="Search Hospitals"
        placeholderTextColor="#9E9E9E"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

export default SearchHospital;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scale(44),
    backgroundColor: '#F3F4F6',
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    marginHorizontal: scale(8),
    color: '#000',
  },
});
