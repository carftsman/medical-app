import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logOut: state => {
      console.log('logging out');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setToken, setIsAuthenticated, logOut, setUser } =
  authSlice.actions;

export default authSlice.reducer;
