import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
/* export const getAdminAppointments = createAsyncThunk(
  "appointments/admin-appointment",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/appointments/get/appointments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
); */

export const getAdminApts = createAsyncThunk(
  "appointments/admin-appointment",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/appointments/get/appointments`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AcceptAptThunk = createAsyncThunk(
  "appointments/accept",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/appointments/accept/${obj.id}`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyAppointments = createAsyncThunk(
  "appointments/my-appointment",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/appointments/get/my-appointments`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getClinics = createAsyncThunk(
  "appointment/get-clinic",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/clinic/get/clinic?latitude=${obj.lat}&longitude=${obj.lng}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const requestAppointment = createAsyncThunk(
  "appointment/new/request",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/appointments/add/request`,
        obj.data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointment/cancel",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/appointments/cancel/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const cancelApt = createAsyncThunk(
  "appointment/admin-cancel",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/appointments/cancel/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const EligibilityCheck = createAsyncThunk(
  "appointment/eligibility",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}/api/appointments/check/eligibility`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  completed: null,
  pending: null,
  cancelled: null,
  errors: null,
  success: null,
  loadingClinics: true,
  eligibility_loading: false,
};

const AppointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
    },
    clearSucces: (state) => {
      state.success = null;
    },
  },
  extraReducers: {
    /*   [getAdminAppointments.pending]: (state) => {
      state.loading = true;
    },
    [getAdminAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.pending = action.payload.appointments.pending;
      state.completed = action.payload.appointments.completed;
      //state.cancelled = action.payload.appointments.cancelled;
      //state.appointments = action.payload.appointments;
    },
    [getAdminAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    }, */
    [getAdminApts.pending]: (state) => {
      state.loading = true;
    },
    [getAdminApts.fulfilled]: (state, action) => {
      state.loading = false;
      state.pending = action.payload.appointments.pending;
      state.completed = action.payload.appointments.completed;
      state.cancelled = action.payload.appointments.cancelled;
      state.appointments = action.payload.appointments;
    },
    [getAdminApts.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [AcceptAptThunk.pending]: (state) => {
      state.loading = true;
    },
    [AcceptAptThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      state.appointments = [...state.appointments, action.payload.appointments];
      //state.appointments = action.payload.appointments;
    },
    [cancelApt.pending]: (state) => {
      state.loading = true;
    },
    [cancelApt.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.appointments = [...state.appointments, action.payload.appointments];
      //state.appointments = action.payload.appointments;
    },
    [cancelApt.rejected]: (state, action) => {
      state.appointment_cancellation_loading = false;
      state.errors = action.payload;
    },

    //users
    [getMyAppointments.pending]: (state) => {
      state.loading = true;
    },
    [getMyAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.pending = action.payload.appointments.pending;
      state.completed = action.payload.appointments.completed;
      state.cancelled = action.payload.appointments.cancelled;
    },
    [getMyAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getClinics.pending]: (state) => {
      state.loadingClinics = true;
    },
    [getClinics.fulfilled]: (state, action) => {
      state.loadingClinics = false;
      state.clinics = action.payload.clinics;
    },
    [getClinics.rejected]: (state, action) => {
      state.loadingClinics = false;
      state.errors = action.payload;
    },
    [requestAppointment.pending]: (state) => {
      state.appointment_request_loading = true;
    },
    [requestAppointment.fulfilled]: (state, action) => {
      state.appointment_request_loading = false;
      state.pending = action.payload.appointment;
    },
    [requestAppointment.rejected]: (state, action) => {
      state.appointment_request_loading = false;
      state.errors = action.payload;
    },
    [cancelAppointment.pending]: (state) => {
      state.appointment_cancellation_loading = true;
    },
    [cancelAppointment.fulfilled]: (state, action) => {
      state.appointment_cancellation_loading = false;
      state.success = action.payload.message;
      state.pending = action.payload.appointments.pending;
      state.completed = action.payload.appointments.completed;
      state.cancelled = action.payload.appointments.cancelled;
    },
    [cancelAppointment.rejected]: (state, action) => {
      state.appointment_cancellation_loading = false;
      state.errors = action.payload;
    },
    [EligibilityCheck.pending]: (state) => {
      state.eligibility_loading = true;
    },
    [EligibilityCheck.fulfilled]: (state, action) => {
      state.eligibility_loading = false;
      if (action.payload.eligibility === false) {
        state.eligibility = false;
        state.message = action.payload.message;
      } else {
        state.eligibility = true;
      }
    },
    [EligibilityCheck.rejected]: (state, action) => {
      state.eligibility_loading = false;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess } = AppointmentSlice.actions;
export default AppointmentSlice.reducer;
