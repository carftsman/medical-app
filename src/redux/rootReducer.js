import { combineReducers } from '@reduxjs/toolkit';
import favouritesReducer from './slices/favouritesSlice';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  favourites: favouritesReducer,
});

export default rootReducer;
