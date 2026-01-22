import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/services/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch services');
    }
  }
);

export const fetchServiceDetail = createAsyncThunk(
  'services/fetchServiceDetail',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/service/${serviceId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch service detail');
    }
  }
);

const initialState = {
  services: [],
  serviceDetail: null,
  loading: false,
  error: null
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchServiceDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceDetail = action.payload;
      })
      .addCase(fetchServiceDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = servicesSlice.actions;
export default servicesSlice.reducer;
