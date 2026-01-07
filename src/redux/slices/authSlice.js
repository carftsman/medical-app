import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    logOut: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, setIsAuthenticated, logOut } = authSlice.actions;

export default authSlice.reducer;
