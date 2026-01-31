import api from '../../../api/client';

export const hospitalApi = {
  getHospitalsByMode: data => {
    return api.post('/hospital/user/hospitals-by-mode', data);
  },

  // Get hospitals by category
  getHospitalsByCategory: data => {
    return api.post('/hospital/user/hospitals-by-category', data);
  },

  //catgories
  getcategories:(params)=>{
    return api.get('/hospital/user/categories',{
      params,
    })
  },

  getNearbyHospitals: params => {
  return api.get('/hospital/user/hospitals/nearby', {
    params,
  });
},  
};
