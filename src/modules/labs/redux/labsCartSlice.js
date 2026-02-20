import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
};

const labsCartSlice = createSlice({
  name: 'labsCart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = (action.payload || []).map(item => ({
        ...item,
        name: item.name || item.packageName, // ✅ normalize here
      }));
    },
    addToCart: (state, action) => {
      const exists = state.items.find(
        item =>
          Number(item.packageId) === Number(action.payload.packageId)
      );
      if (!exists) {
        state.items.push({
          ...action.payload,
          name:
            action.payload.name ||
            action.payload.packageName, // ✅ normalize here too
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item =>
          Number(item.packageId) !== Number(action.payload)
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
} = labsCartSlice.actions;
export default labsCartSlice.reducer;

