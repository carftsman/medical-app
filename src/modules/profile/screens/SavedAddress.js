import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../../../api/client';

const SavedAddress = () => {
  const [address, setAddress] = useState();
  const fetchAddress = async () => {
    try {
      const res = await api.get('/labs/address', {
        params: {
          userId: 6,
        },
      });

      console.log('address', res.data);
      setAddress(res.data);
    } catch (error) {
      console.log('address error', error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <View>
      <Text>{JSON.stringify(address)}</Text>
    </View>
  );
};

export default SavedAddress;

const styles = StyleSheet.create({});
