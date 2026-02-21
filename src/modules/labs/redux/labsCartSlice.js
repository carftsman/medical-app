import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const labsCartSlice = createSlice({
  name: 'labsCart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(
        item => Number(item.labTestId) === Number(action.payload.labTestId)      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => Number(item.labTestId) !== Number(action.payload)
      );
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } =
  labsCartSlice.actions;

export default labsCartSlice.reducer;
