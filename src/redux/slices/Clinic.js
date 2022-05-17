import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

export const RequestPartnershipThunk = createAsyncThunk(
  "clinic/send_request_for_partnership",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/clinic/send-partnership-request`,
        obj,
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

export const MyClinicThunk = createAsyncThunk(
  "clinic/myclinic",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/clinic/`,
        obj,
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

export const CreateClinic = createAsyncThunk(
  "clinic/add_clinic",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/clinic/add`,
        formdata,
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

export const getAllClinics = createAsyncThunk(
  "clinic/all-clinic",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/clinic/`,
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

export const DeleteClinic = createAsyncThunk(
  "clinic/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/clinic/delete/${obj.id}`,
        obj.data,
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
  loading: false,
  success: null,
  error: null,
  myclinic: null,
  clinic_loading: false,
  clinic_error: null,
};
const ClinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: {
    [RequestPartnershipThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [RequestPartnershipThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = null;
    },
    [RequestPartnershipThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.error = action.payload;
    },
    [MyClinicThunk.pending]: (state, action) => {
      state.clinic_loading = true;
    },
    [MyClinicThunk.fulfilled]: (state, action) => {
      state.clinic_loading = false;
      state.myclinic = action.payload.myclinic;
      state.clinic_error = null;
    },
    [MyClinicThunk.rejected]: (state, action) => {
      state.clinic_loading = false;
      state.myclinic = null;
      state.clinic_error = action.payload;
    },
    [CreateClinic.pending]: (state) => {
      state.loading = true;
    },
    [CreateClinic.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.success = action.payload.message;
      state.clinic = [...state.clinic, action.payload.clinic];
    },
    [CreateClinic.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.role = null;
      state.errors = JSON.parse(action.payload);
    },
    [getAllClinics.pending]: (state) => {
      state.loading = true;
    },
    [getAllClinics.fulfilled]: (state, action) => {
      state.loading = false;
      state.clinic = action.payload.clinics;
    },
    [getAllClinics.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    [DeleteClinic.pending]: (state) => {
      state.loading = true;
    },
    [DeleteClinic.fulfilled]: (state, action) => {
      const del_c = state.clinic;
      del_c.splice(
        del_c.findIndex((a) => a._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.clinic = del_c;
      state.errors = null;
    },
    [DeleteClinic.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
      state.isAuthenticated = false;
    },
  },
});
export const { clearError, clearSuccess } = ClinicSlice.actions;
export default ClinicSlice.reducer;
