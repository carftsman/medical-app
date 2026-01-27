import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from "./slices/locationSlice"
import favouritesReducer from './slices/favouritesSlice';
import authReducer from './slices/authSlice';
import hospitalReducer from '../modules/hospitals/redux/hospitalReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  hospital:hospitalReducer,
  location : locationReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
