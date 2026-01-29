import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  mode: 'all',
  selectedDate: null,
  selectedTime: null,
  consultationType: null,
  bookingId: null,
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
    setDate(state, action) {
      state.selectedDate = action.payload;
      state.selectedTime = null; // reset time when date changes
    },
    setTime(state, action) {
      state.selectedTime = action.payload;
    },
    resetSlot(state) {
      state.selectedDate = null;
      state.selectedTime = null;
    },
    setConsultationType: (state, action) => {
      state.consultationType = action.payload;
    },
    resetConsultationType: (state) => {
      state.consultationType = null;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    }
  },
});

export const {
  setConsultationMode,
  setDate,
  setTime,
  resetSlot,
  setConsultationType,
  resetConsultationType,
  setBookingId } = BookingSlice.actions;

export default BookingSlice.reducer;
