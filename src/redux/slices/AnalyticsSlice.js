import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const getGenderCountPerClinicThunk = createAsyncThunk(
  "analytics/clinic/gender",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/ClinicGenderCount`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategoryCountPerClinicThunk = createAsyncThunk(
  "analytics/clinic/category",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/ClinicCategoryCount`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getGenderCountThunk = createAsyncThunk(
  "analytics/gender",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/genderCount`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getCountsClinic = createAsyncThunk(
  "analytics/clinic/counts",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/BiteCountsPerClinic`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getBarangayCount = createAsyncThunk(
  "analytics/barangay/counts",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/barangayCount`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  clinic_GenderCount: null,
  clinic_categoryCount: null,
  clinic_counts: null,
  genderCount: null,
  barangayCount: null,
  loading: false,
  error: null,
  success: null,
};

const AnalyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: {
    [getGenderCountPerClinicThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getGenderCountPerClinicThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic_GenderCount = action.payload.genderCount;
    },
    [getGenderCountPerClinicThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCategoryCountPerClinicThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoryCountPerClinicThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic_categoryCount = action.payload.categoryCount;
    },
    [getCategoryCountPerClinicThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getGenderCountThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getGenderCountThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.genderCount = action.payload.genderCount;
    },
    [getGenderCountThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getCountsClinic.pending]: (state, action) => {
      state.loading = true;
    },
    [getCountsClinic.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic_counts = action.payload.countsClinic;
    },
    [getCountsClinic.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getBarangayCount.pending]: (state, action) => {
      state.loading = true;
    },
    [getBarangayCount.fulfilled]: (state, action) => {
      state.loading = false;
      state.barangayCount = action.payload.barangayCount;
    },
    [getBarangayCount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default AnalyticsSlice.reducer;
