import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
export const GetAuthDetails = createAsyncThunk(
  "admin/auth",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/auth/me`,
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

export const LogoutAdminThunk = createAsyncThunk(
  "admin/logout",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/logout`,
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
export const GetAllAccountsThunk = createAsyncThunk(
  "admin/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/`,
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

export const CreateAdminThunk = createAsyncThunk(
  "admin/admin_create",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/register`,
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

export const DeleteAccThunk = createAsyncThunk(
  "admin/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/delAcc/${obj.id}`,
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

export const EditAccountThunk = createAsyncThunk(
  "admin/editaccount",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/update_account/${obj.id}`,
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
export const EditAccountSuperAdminThunk = createAsyncThunk(
  "admin/editaccount/superadmin",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/super-admin/edit-acc/${obj.id}`,
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

export const UpdatePasswordThunk = createAsyncThunk(
  "admin/updatepassword",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/update_password/${obj.id}`,
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
      localStorage.removeItem("token");
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
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
      localStorage.setItem("token", action.payload.token);
      state.loading = false;
      state.success = action.payload.success;
      //state.role = action.payload.role;
      state.admin = [...state.admin, action.payload.admin];
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
    [EditAccountThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditAccountThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.admin = action.payload.admin;
      state.errors = null;
    },
    [EditAccountThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = JSON.parse(action.payload);
    },
    [EditAccountSuperAdminThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditAccountSuperAdminThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.admin = action.payload.admin;
      state.errors = null;
    },
    [EditAccountSuperAdminThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      try {
        state.errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [UpdatePasswordThunk.pending]: (state) => {
      state.loading = true;
    },
    [UpdatePasswordThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.admin = action.payload.admin;
      state.errors = null;
    },
    [UpdatePasswordThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess } = adminSlice.actions;
export default adminSlice.reducer;
