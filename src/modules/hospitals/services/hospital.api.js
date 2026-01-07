import api from '../../../api/client';

export const hospitalApi = {
  getHospitalsByMode: data => {
    return api.post('/hospital/user/hospitals-by-mode', data);
  },

  // Get hospitals by category
  getHospitalsByCategory: data => {
    return api.post('/hospital/user/hospitals-by-category', data);
  },

  // Get nearby hospitals
  getNearbyHospitals: data => {
    return api.post('/hospital/user/nearby-hospitals', data);
  },
};
