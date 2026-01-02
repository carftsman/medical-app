import axios from 'axios';
import { store } from '../redux/store';
import { logOut } from '../redux/slices/authSlice';

const API_BASE_URL = 'https://hospital-backend-1-9jq0.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth?.token;
    console.log('interceptors', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(logOut());
    }

    return Promise.reject(error);
  },
);

export default api;
