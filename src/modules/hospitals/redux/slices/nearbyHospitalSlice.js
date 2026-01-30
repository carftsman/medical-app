import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hospitalApi } from '../../api/hospitalApi';

export const fetchNearbyHospitals = createAsyncThunk(
  'nearbyHospitals/fetchNearbyHospitals',
  async (
    { latitude, longitude },
    { getState, rejectWithValue }
  ) => {
    try {
      const {
        nearbyHospitals: { mode },
      } = getState();

      const res = await hospitalApi.getHospitalsByMode({
        mode,
        latitude,
        longitude,
      });

      const hospitals =
        res?.data?.data ||
        res?.data?.hospitals ||
        [];

      return {
        hospitals: Array.isArray(hospitals) ? hospitals : [],
        mode,
      };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          'Failed to fetch nearby hospitals'
      );
    }
  }
);

const nearbyHospitalSlice = createSlice({
  name: 'nearbyHospitals',
  initialState: {
    hospitals: [],          
    originalHospitals: [], 
    loading: false,
    error: null,
    mode: 'BOTH',
  },

  reducers: {
    setHospitalMode: (state, action) => {
      state.mode = action.payload.toUpperCase();
    },

    setFilteredHospitals: (state, action) => {
      state.hospitals = action.payload;
    },

    resetHospitals: state => {
      state.hospitals = state.originalHospitals;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchNearbyHospitals.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNearbyHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload.hospitals;
        state.originalHospitals = action.payload.hospitals;
        state.mode = action.payload.mode;
      })

      .addCase(fetchNearbyHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      });
  },
});

export const {
  setHospitalMode,
  setFilteredHospitals,
  resetHospitals,
} = nearbyHospitalSlice.actions;

export default nearbyHospitalSlice.reducer;
