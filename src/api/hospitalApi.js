import api from './client';
const cleanParams = obj =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    )
  );

/* API */

export const hospitalApi = {

  /* NEARBY HOSPITALS */
  getNearbyHospitals: ({
    latitude,
    longitude,
    radius = 15,
    page = 1,
    limit = 20,
  }) => {
    return api.get('/hospital/user/hospitals/nearby', {
      params: cleanParams({
        latitude,
        longitude,
        radius,
        page,
        limit,
      }),
    });
  },

  /*  GET HOSPITALS  */
  getHospitalsByMode: async ({
    latitude,
    longitude,
    radius = 15,
    page = 1,
    limit = 20,
  }) => {
    const res = await hospitalApi.getNearbyHospitals({
      latitude,
      longitude,
      radius,
      page,
      limit,
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

  /* FILTER  */
  getFilteredNearbyHospitals: params => {
    const cleanedParams = cleanParams({
      latitude: params.latitude,
      longitude: params.longitude,
      radius: params.radius,
      categoryIds:
        params.categoryIds?.length > 0
          ? params.categoryIds.join(',')
          : undefined,
      openNow: params.openNow,
      open24x7: params.open24x7,
      page: params.page || 1,
      limit: params.limit || 20,
    });

    return api.get('/hospital/user/hospitals/nearby', {
      params: cleanedParams,
    });
  },

  /* SEARCH  */
  searchHospitals: async ({
    query,
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

  /* CATEGORIES */
  getCategories: () => {
    return api.get('/hospital/user/categories', {
      params: {
        limit: 50,
      },
    });
  },
};

export default hospitalApi;
