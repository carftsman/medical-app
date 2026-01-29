import api from './client';

export const authApi = {
  sendOtp: data => api.post(`/hospital/user/auth/send-otp`,data),
  verifyOtp: data => api.post('/hospital/user/auth/verify-otp',data),
  login:data=> api.post('/hospital/user/auth/login', data),
  //categories:data=>api.get('/api/hospital/user/categories',data)
};
 