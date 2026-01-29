import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const doctor = action.payload;

      const exists = state.items.find(d => d.id === doctor.id);

      if (exists) {
        state.items = state.items.filter(d => d.id !== doctor.id);
      } else {
        state.items.push(doctor);
      }
    },
  },
});

export const { toggleFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
