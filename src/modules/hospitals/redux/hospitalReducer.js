import { combineReducers } from '@reduxjs/toolkit';
import BookingSlice from './slices/BookingSlice';
const hospitalReducer = combineReducers({
  consultation: BookingSlice,
});
export default hospitalReducer;
