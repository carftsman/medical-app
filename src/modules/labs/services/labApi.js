import api from '../../../api/client';

export const labApi = {
  getLabTests: labId => {
    return api.get(`/labs/${labId}/packages`);
  },


  getPackageDetails: packageId => {
  return api.get(`/labs/packages/${packageId}`);
},

addToLabCart: payload =>
    api.post('/labs/cart', payload),

  getLabCart: () =>
    api.get('/labs/cart'),

getLabDetails: labId => {
  return api.get(`/labs/${labId}/details`);
},
searchLabTests: (labId, text) => {
  return api.get(`/labs/${labId}/tests/search`, {
    params: { query: text },
  });
},
filterPackages: (labId, params) =>
  api.get(`/labs/${labId}/packages/filter`, { params }),


};

