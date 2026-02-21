import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { labApi } from '../services/labApi';

const ReviewCart = () => {
  const { user } = useAuth();

  const [reviewCart, setReviewCart] = useState({});

  useEffect(() => {
    fetchCartSummary();
  }, []);

  const fetchCartSummary = async () => {
    try {
      const res = await labApi.getCartSummary(user.id);
      console.log(res.data);
    } catch (error) {
      console.log('review cart error', error);
    }
  };

  console.log('userId', user.id);
  return (
    <View>
      <Text>ReviewCart</Text>
    </View>
  );
};

export default ReviewCart;

const styles = StyleSheet.create({});
