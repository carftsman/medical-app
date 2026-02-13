import React, { createContext, useContext, useEffect, useState } from 'react';
import { labApi } from '../services/labApi';

const LabCartContext = createContext();

export const LabCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const res = await labApi.getLabCart();
      setCartItems(res?.data?.items || []);
    } catch (error) {
      console.log('Cart fetch error:', error?.message);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (payload) => {
    try {
      const res = await labApi.addToLabCart(payload);

      if (res?.data?.message === 'Added to cart') {
        setCartItems(prev => [...prev, res.data.item]);
      }

      return res;
    } catch (error) {
      console.log('Add to cart failed:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <LabCartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        loadingCart,
      }}
    >
      {children}
    </LabCartContext.Provider>
  );
};

export const useLabCart = () => useContext(LabCartContext);
