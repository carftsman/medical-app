import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hospitalApi } from '../../api/hospitalApi';

export const fetchNearbyHospitals = createAsyncThunk(
  'nearbyHospitals/fetchNearbyHospitals',
  async (
    { mode = 'BOTH', latitude, longitude },
    { rejectWithValue }
  ) => {
    try {
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
        mode: mode.toUpperCase(),
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
    loading: false,
    error: null,
    mode: 'BOTH',
  },

  reducers: {
    clearHospitals: state => {
      state.hospitals = [];
    },

    setHospitalMode: (state, action) => {
      state.mode = action.payload.toUpperCase();
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
        state.mode = action.payload.mode;
      })
      .addCase(fetchNearbyHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hospitals = [];
      });
  },
});


export const { clearHospitals, setHospitalMode } =
  nearbyHospitalSlice.actions;

export default nearbyHospitalSlice.reducer;
