import { combineReducers } from '@reduxjs/toolkit';
import BookingSlice from './slices/BookingSlice';
import nearbyHospitalsReducer from './slices/nearbyHospitalSlice'; 
const hospitalReducer = combineReducers({
  consultation: BookingSlice,
  nearbyHospitals: nearbyHospitalsReducer,
});
export default hospitalReducer;
