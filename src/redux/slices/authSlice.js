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
      console.log('logging out');
      state.token = null;
      state.isAuthenticated = false;
      console.log(state);
    },
  },
});

export const { setToken, setIsAuthenticated, logOut } = authSlice.actions;

export default authSlice.reducer;
