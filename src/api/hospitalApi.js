import api from './client';

/* ================= HELPERS ================= */
const mergeUniqueById = (offline = [], online = []) => [
  ...offline,
  ...online.filter(
    o => !offline.some(f => f.id === o.id)
  ),
];

export const hospitalApi = {
  /* ================= OFFLINE (NEARBY) ================= */
  getOfflineHospitals: ({ latitude, longitude, radius = 15 }) => {
    return api.get('/hospital/user/hospitals/nearby', {
      params: {
        latitude,
        longitude,
        radius,
        mode: 'OFFLINE',
      },
    });
  },

  /* ================= ONLINE ================= */
  getOnlineHospitals: ({ latitude, longitude, radius = 15 }) => {
    return api.get('/hospital/user/hospitals/nearby', {
      params: {
        latitude,
        longitude,
        radius,
        mode: 'ONLINE',
      },
    });
  },

  /* ================= OFFLINE / ONLINE / BOTH ================= */
  getHospitalsByMode: async ({
    mode = 'BOTH',
    latitude,
    longitude,
    radius = 15,
  }) => {
    const m = mode.toUpperCase();

    if (m === 'OFFLINE') {
      return hospitalApi.getOfflineHospitals({
        latitude,
        longitude,
        radius,
      });
    }

    if (m === 'ONLINE') {
      return hospitalApi.getOnlineHospitals({
        latitude,
        longitude,
        radius,
      });
    }

    // BOTH
    const [offlineRes, onlineRes] = await Promise.all([
      hospitalApi.getOfflineHospitals({
        latitude,
        longitude,
        radius,
      }),
      hospitalApi.getOnlineHospitals({
        latitude,
        longitude,
        radius,
      }),
    ]);

    const offline = offlineRes?.data?.data || [];
    const online = onlineRes?.data?.data || [];

    return {
      data: {
        data: mergeUniqueById(offline, online),
      },
    };
  },

  /* ================= FILTER ================= */
  getFilteredNearbyHospitals: params => {
    return api.get('/hospital/user/hospitals/nearby', {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        radius: params.radius,
        categoryIds: params.categoryIds,
        mode: (params.mode || 'BOTH').toUpperCase(),
        openNow: params.openNow,
        open24x7: params.open24x7,
        page: params.page || 1,
        limit: params.limit || 20,
      },
    });
  },

/* ================= SEARCH ================= */
searchHospitals: ({ query, mode, page = 1, limit = 20 }) => {
  return api.get('/hospital/user/modeSearch', {
    params: {
      q: query,
      type: 'hospital',
      mode: mode || undefined, // ONLINE / OFFLINE / BOTH
      page,
      limit,
    },
  });
},

  /* ================= CATEGORIES ================= */
  getCategories: ({ mode }) => {
    return api.get('/hospital/user/categories', {
      params: {
        mode: (mode || 'BOTH').toUpperCase(),
        limit: 50,
      },
    });
  },
};

export default hospitalApi;
