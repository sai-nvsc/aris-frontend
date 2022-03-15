import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
export const GetAuthDetails = createAsyncThunk(
  "admin/auth",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/auth/me`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LogoutAdminThunk = createAsyncThunk(
  "admin/logout",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/logout`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const GetAllAccountsThunk = createAsyncThunk(
  "admin/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const CreateAdminThunk = createAsyncThunk(
  "admin/admin_create",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/register`,
        formdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const DeleteAccThunk = createAsyncThunk(
  "admin/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/delAcc/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  admin: null,
  isAuthenticated: null,
  loading: false,
  errors: null,
  success: null,
  role: null,
};

const adminSlice = createSlice({
  name: "admin",
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
    [LogoutAdminThunk.pending]: (state) => {
      state.loading = true;
    },
    [LogoutAdminThunk.fulfilled]: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token");
    },
    [LogoutAdminThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [GetAllAccountsThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllAccountsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.admin = action.payload.admin;
    },
    [GetAllAccountsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [CreateAdminThunk.pending]: (state) => {
      state.loading = true;
    },
    [CreateAdminThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.success = action.payload.success;
      //state.role = action.payload.role;
      state.admin = [...state.admin, action.payload.admin];
      localStorage.setItem("token", action.payload.token);
    },
    [CreateAdminThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.role = null;
      state.errors = JSON.parse(action.payload);
    },
    [DeleteAccThunk.pending]: (state) => {
      state.loading = true;
    },
    [DeleteAccThunk.fulfilled]: (state, action) => {
      const new_acc = state.admin;
      new_acc.splice(
        new_acc.findIndex((a) => a._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.admin = new_acc;
      state.errors = null;
    },
    [DeleteAccThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },
    /* [ResetPasswordThunk.pending]: (state) => {
        state.loading = true;
      },
      [ResetPasswordThunk.fulfilled]: (state, action) => {
        state.loading = false;
        state.errors = null;
        state.success = action.payload.data;
      },
      [ResetPasswordThunk.rejected]: (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      }, */
  },
});
export const { clearError, clearSuccess } = adminSlice.actions;
export default adminSlice.reducer;
