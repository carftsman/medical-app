import api from './client';

export const authApi = {
  sendOtp: data => api.post(`/hospital/user/auth/send-otp`),
  verifyOtp: data => api.post('/hospital/user/auth/verify-otp'),
};
