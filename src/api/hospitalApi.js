import api from "./client";

/* REMOVE EMPTY PARAMS */

const cleanParams = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  );

export const hospitalApi = {

  /* GET ALL / NEARBY HOSPITALS */

  getNearbyHospitals: async ({
    latitude,
    longitude,
    radius = 15,
    sort = "distance",
    mode = "BOTH",
    state,
    city,
    openNow,
    open24x7,
    women = false,
    page = 1,
    limit = 100   
  }) => {

    try {

      const res = await api.get("/hospital/user/hospitals/nearby", {
        params: cleanParams({
          latitude,
          longitude,
          radius,
          sort,
          mode,
          state,
          city,
          openNow,
          open24x7,
          women,
          page,
          limit
        })
      });

      return res;

    } catch (error) {

      console.log("Nearby hospitals error:", error);

      return {
        data: {
          data: []
        }
      };

    }

  },


  /* FILTER HOSPITALS */

  filterHospitals: async ({
    latitude,
    longitude,
    radius,
    sort = "distance",
    mode = "BOTH",
    state,
    city,
    openNow,
    open24x7,
    
  }) => {

    try {

      const res = await api.get("/hospital/user/hospitals/nearby", {
        params: cleanParams({
          latitude,
          longitude,
          radius,
          sort,
          mode,
          state,
          city,
          openNow,
          open24x7,
         
        })
      });

      return res;

    } catch (error) {

      console.log("Filter hospitals error:", error);

      return {
        data: {
          data: []
        }
      };

    }

  },


  /* SEARCH HOSPITAL */

  searchHospitals: async ({
    query,
    page = 1,
    limit = 100
  }) => {

    try {

      const searchText = query?.trim();

      if (!searchText) {

        return {
          data: {
            data: []
          }
        };

      }

      const res = await api.get("/hospital/user/modeSearch", {
        params: cleanParams({
          q: searchText,
          type: "hospital",
          page,
          limit
        })
      });

      const hospitals =
        res?.data?.data ||
        res?.data?.hospitals ||
        res?.data?.results ||
        [];

      return {
        data: {
          data: Array.isArray(hospitals) ? hospitals : []
        }
      };

    } catch (error) {

      console.log("Search hospitals error:", error);

      return {
        data: {
          data: []
        }
      };

    }

  }

};

export default hospitalApi;