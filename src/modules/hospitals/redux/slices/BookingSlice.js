import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  mode: 'all', 
  
};
const BookingSlice = createSlice({
  name: 'consultation',
  initialState,
  reducers: {
    setConsultationMode: (state, action) => {
      state.mode = action.payload;
    },
    clearConsultationMode: (state) => {
      state.mode = null;
    },
  },
});

export const { setConsultationMode} =
  BookingSlice.actions;

export default BookingSlice.reducer;
