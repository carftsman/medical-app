import api from './client';

const mergeUniqueById = (offline = [], online = []) => [
  ...offline,
  ...online.filter(o => !offline.some(f => f.id === o.id)),
];

const cleanParams = obj =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  );

/* ===================== API ===================== */
export const hospitalApi = {
  /* ---------- OFFLINE ---------- */
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

  /* ---------- ONLINE ---------- */
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

  /* ---------- BOTH ---------- */
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

    const [offlineRes, onlineRes] = await Promise.all([
      hospitalApi.getOfflineHospitals({ latitude, longitude, radius }),
      hospitalApi.getOnlineHospitals({ latitude, longitude, radius }),
    ]);

    const offline = offlineRes?.data?.data || [];
    const online = onlineRes?.data?.data || [];

    return {
      data: {
        data: mergeUniqueById(offline, online),
      },
    };
  },

  /* ---------- FILTER ---------- */
  getFilteredNearbyHospitals: params => {
    const cleanedParams = cleanParams({
      latitude: params.latitude,
      longitude: params.longitude,
      radius: params.radius,
      categoryIds:
        params.categoryIds?.length > 0
          ? params.categoryIds.join(',')
          : undefined,
      mode: (params.mode || 'BOTH').toUpperCase(),
      openNow: params.openNow,
      open24x7: params.open24x7,
      page: params.page || 1,
      limit: params.limit || 20,
    });

    return api.get('/hospital/user/hospitals/nearby', {
      params: cleanedParams,
    });
  },

  searchHospitals: async ({
    query,
    mode = 'BOTH',
    page = 1,
    limit = 20,
  }) => {
    if (!query || query.trim().length === 0) {
      return { data: { data: [] } };
    }

    const res = await api.get('/hospital/user/modeSearch', {
      params: cleanParams({
        q: query,
        type: 'hospital',
        mode: mode.toUpperCase(),
        page,
        limit,
      }),
    });

    const hospitals =
      res?.data?.data ||
      res?.data?.hospitals ||
      res?.data?.results ||
      [];

    return {
      data: {
        data: Array.isArray(hospitals) ? hospitals : [],
      },
    };
  },

  /* ---------- CATEGORIES ---------- */
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
