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
  },
});
export const { clearError, clearSuccess } = ClinicSlice.actions;
export default ClinicSlice.reducer;
