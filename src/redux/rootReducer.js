import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import locationReducer from './slices/locationSlice';
import hospitalReducer from '../modules/hospitals/redux/hospitalReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  hospital: hospitalReducer,
  location: locationReducer,
 
});

export default rootReducer;
