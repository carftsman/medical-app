import api from '../../../api/client';

export const labApi = {
  getLabTests: labId => {
    return api.get(`/labs/${labId}/packages`);
  },

  getPackageDetails: packageId => {
    return api.get(`/labs/packages/${packageId}`);
  },

  addToLabCart: payload => api.post('/labs/cart', payload),

  getLabCart: userId =>
    api.get('/labs/cart', {
      params: { userId },
    }),

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

  deleteCartItem: cartItemId => {
    return api.delete(`/labs/cart/${cartItemId}`);
  },

  addPatientToCart: (cartId, payload) =>
    api.post(`/labs/cart/${cartId}/add-patient`, payload, {
      params: {
        cartId,
      },
    }),

  getLabAvailability: labId => {
    return api.get(`/labs/${labId}/availability`);
  },

  getLabCartSummary: userId =>
    api.get('/labs/cart/summary', {
      params: { userId },
    }),

  getLabSlots: (labId, date, userId) => {
    return api.get(`/labs/${labId}/slots`, {
      params: { date, labId, userId },
    });
  },

  getAddresses: userId => {
    return api.get('/labs/address', {
      params: { userId },
    });
  },

  createAddress: payload => {
    return api.post('/labs/address', payload);
  },

  deleteAddress: id => {
    return api.delete(`/labs/address/${id}`);
  },
  getLabInvoice: (bookingId) => {
  return api.get(`/labs/bookings/${bookingId}/invoice`);
},

  setDefaultAddress: (id, userId) => {
    return api.patch(`/labs/address/default/${id}`, { userId });
  },

  getCartSummary: userId => {
    return api.get(`/labs/cart/summary`, {
      params: {
        userId,
      },
    });
    
  },
  getPackagesByAge: age => {
  return api.get(`/labs/packages/by-age`, {
    params: { age },
  });
},
};
