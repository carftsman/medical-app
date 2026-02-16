// ================= SearchHospital.js =================
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from '../../../utils/styling';
import { hospitalApi } from '../../../api/hospitalApi';

const SearchHospital = ({ mode = 'BOTH', onResults }) => {
  const [query, setQuery] = useState('');
  const lastRequestId = useRef(0);

  useEffect(() => {
    const trimmed = query.trim();

    const timer = setTimeout(() => {
      if (trimmed.length === 0) {
        onResults(null); 
        return;
      }
      searchHospitals(trimmed);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, mode]);

  const searchHospitals = async text => {
    const requestId = ++lastRequestId.current;

    try {
      const res = await hospitalApi.searchHospitals({
        query: text,
        mode: mode.toUpperCase(),
        page: 1,
        limit: 20,
      });
      if (requestId !== lastRequestId.current) return;

      const hospitals = res?.data?.data || [];
      onResults(Array.isArray(hospitals) ? hospitals : []);
    } catch (error) {
      if (requestId === lastRequestId.current) {
        console.log('Search API error:', error);
        onResults([]);
      }
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
