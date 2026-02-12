import api from '../../../api/client';

export const labApi = {
  getLabTests: labId => {
    return api.get(`/labs/${labId}/packages`);
  },


  getPackageDetails: packageId => {
    return api.get(`/labs/packages/${packageId}`);
  },

  addToLabCart: payload =>
    api.post('/labs/cart/add', payload),

  getLabDetails: labId => {
    return api.get(`/labs/${labId}/details`);
  },
  searchLabTests: (labId, text) => {
    return api.get(`/labs/${labId}/tests/search`, {
      params: { query: text },
    });
  },
  filterPackages: (labId, filters) => {
    return api.post(`/labs/${labId}/packages/filter`, filters);
  },

  getLabCart: (userId) => {
    return api.get("/labs/cart", {
      params: { userId }
    });
  },

  deleteCartItem: (cartItemId) => {
    return api.delete(`/labs/cart/${cartItemId}`);
  },



  getLabSlots: (labId, date) => {
    return api.get(`/labs/${labId}/slots`, {
      params: {
        date,
        labId
      }
    });
  },

};
