import { combineReducers } from '@reduxjs/toolkit';
import locationReducer from "./slices/locationSlice"
import favouritesReducer from './slices/favouritesSlice';
import authReducer from './slices/authSlice';
import hospitalReducer from '../modules/hospitals/redux/hospitalReducer';
import labsCartReducer from '../modules/labs/redux/labsCartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  hospital:hospitalReducer,
  location : locationReducer,
  favourites: favouritesReducer,
  labsCart: labsCartReducer

});

export default rootReducer;
