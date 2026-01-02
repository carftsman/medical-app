import axios from 'axios';
import { saveToken } from '../utils/storage';

const API = axios.create({
  baseURL:
    'https://hospital-backend-1-9jq0.onrender.com/api/hospital/user/auth',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ----------------------
// SEND OTP
// ----------------------
export const sendOtp = async phone => {
  try {
    const res = await API.post('/send-otp', { phone });

    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    console.log('OTP ERROR', err?.response?.data);

    return {
      success: false,
      message: err?.response?.data?.message || 'Failed',
    };
  }
};

// ----------------------
// VERIFY OTP
// ----------------------
export const verifyOtp = async ({ phone, otp }) => {
  try {
    console.log(' verifyOtp() ->', { phone, otp });

    const res = await API.post('/verify-otp', { phone, otp });

    if (res.data?.token) {
      await saveToken(res.data.token);
    }

    console.log(' verifyOtp success', res.data);

    return { success: true, verified: true, token: res.data?.token };
  } catch (err) {
    console.log('VERIFY OTP ERROR:');
    console.log('status:', err?.response?.status);
    console.log('data:', err?.response?.data);
    console.log('message:', err?.message);

    return {
      success: false,
      message:
        err?.response?.data?.message ||
        `Invalid OTP: ${err?.message || 'Unknown error'}`,
    };
  }
};
