import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

export const getGenderCountPerClinicThunk = createAsyncThunk(
  "analytics/clinic/gender",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/ClinicGenderCount`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
        `${process.env.REACT_APP_API_HOST}api/analytics/get/ClinicCategoryCount`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
        `${process.env.REACT_APP_API_HOST}api/analytics/get/genderCount`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
        `${process.env.REACT_APP_API_HOST}api/analytics/get/BiteCountsPerClinic`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
        `${process.env.REACT_APP_API_HOST}api/analytics/get/barangayCount`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUsersAnalyticsCounts = createAsyncThunk(
  "analytics/useranalytics/counts",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/users_analytics_count`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getExposureCountPerClinicThunk = createAsyncThunk(
  "analytics/clinic/exposurecount",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/ExpoTypeCountsPerClinic`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSourceExposureCountPerClinicThunk = createAsyncThunk(
  "analytics/clinic/sourceexposurecount",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/analytics/get/SourceExpoCountsPerClinic`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
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
  clinic_exposureCount: null,
  clinic_counts: null,
  clinic_source_exposureCount: null,
  user_analytics: null,
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
    [getUsersAnalyticsCounts.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersAnalyticsCounts.fulfilled]: (state, action) => {
      state.loading = false;
      state.user_analytics = action.payload.userAnalyticsCount;
    },
    [getUsersAnalyticsCounts.pending]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getExposureCountPerClinicThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getExposureCountPerClinicThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic_exposureCount = action.payload.exposureTypeCount;
    },
    [getExposureCountPerClinicThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSourceExposureCountPerClinicThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getSourceExposureCountPerClinicThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic_source_exposureCount = action.payload.sourceExposureCount;
    },
    [getSourceExposureCountPerClinicThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default AnalyticsSlice.reducer;
