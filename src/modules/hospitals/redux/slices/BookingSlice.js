import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "all",
  category: {
    id: null,
    name: "",
  },
};

const BookingSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    setConsultationMode: (state, action) => {
      state.mode = action.payload;
    },

    setCategory: (state, action) => {
      state.category.id = action.payload.id;
      state.category.name = action.payload.name;
    },
  },
});

export const {
  setConsultationMode,
  setCategory,
} = BookingSlice.actions;

export default BookingSlice.reducer;
