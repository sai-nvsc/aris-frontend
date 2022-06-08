import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
/* Ang AsyncThunk ay similar sa steState ni react context. Is is called kapag may gusto kang bag
 *
 *
 */
export const LoginUserThunk = createAsyncThunk(
  "users/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/auth/login`,
        formdata
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GetAuthDetails = createAsyncThunk(
  "user/auth",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/auth/me`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      // localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LoginAdminThunk = createAsyncThunk(
  "users/admin_login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/admin/auth/login`,
        formdata
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const SignUpUserThunk = createAsyncThunk(
  "user/signup",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/auth/register`,
        formdata
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const ForgotPasswordThunk = createAsyncThunk(
  "user/forgotpass",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/auth/forgot-password`,
        formdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const ResetPasswordThunk = createAsyncThunk(
  "user/reset-pass",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/auth/reset-password/${formdata.resetToken}`,
        formdata.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const LogoutUserThunk = createAsyncThunk(
  "user/logout",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/user/auth/logout`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const UpdateProfileThunk = createAsyncThunk(
  "user/editprofile",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/user/auth/update_profile/${obj.id}`,
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
  "user/updatepassword",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/user/auth/update_password/${obj.id}`,
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

export const UpdateAvatarThunk = createAsyncThunk(
  "user/updateavatar",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/user/auth/update_avatar/${obj.id}`,
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

export const GetAllUserThunk = createAsyncThunk(
  "user/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/auth/all`,
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

export const VerificationThunk = createAsyncThunk(
  "user/verification",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/user/auth/verify/${obj.verificationToken}`,
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
export const ResendVerificationThunk = createAsyncThunk(
  "user/resend/verification",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/user/auth/account/verify/resend`,
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

export const LoginSuperAdminThunk = createAsyncThunk(
  "users/admin_login",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/superadmin/auth/login`,
        formdata
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  user: null,
  users: null,
  loading_users: false,
  loading: false,
  errors: null,
  success: null,
  isAuthenticated: null,
  register_loading: false,
  login_loading: false,
  resend_loading: false,
  verification_loading: true,
  role: null,
  location_loading: true,
  latitude: "",
  longitude: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setCurrentLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.location_loading = false;
    },
  },
  extraReducers: {
    [LoginUserThunk.pending]: (state) => {
      state.login_loading = true;
    },
    [LoginUserThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.login_loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      // localStorage.setItem("token", action.payload.token);
    },
    [LoginUserThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.login_loading = false;
      state.errors = action.payload;
    },
    [LoginAdminThunk.pending]: (state) => {
      state.loading = true;
    },
    [LoginAdminThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      // localStorage.setItem("token", action.payload.token);
    },
    [LoginAdminThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },

    [SignUpUserThunk.pending]: (state) => {
      state.register_loading = true;
    },
    [SignUpUserThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.register_loading = false;
      state.role = action.payload.role;
      state.user = action.payload.user;
      // localStorage.setItem("token", action.payload.token);
    },
    [SignUpUserThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.register_loading = false;
      state.role = null;
      try {
        state.errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [GetAuthDetails.pending]: (state) => {
      state.loading = true;
    },
    [GetAuthDetails.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    [GetAuthDetails.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      // state.errors = action.payload;
    },
    [UpdateProfileThunk.pending]: (state) => {
      state.update_profile_loading = true;
    },
    [UpdateProfileThunk.fulfilled]: (state, action) => {
      state.update_profile_loading = false;
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.errors = null;
    },
    [UpdateProfileThunk.rejected]: (state, action) => {
      state.update_profile_loading = false;
      state.success = null;
      try {
        state.errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [UpdateAvatarThunk.pending]: (state) => {
      state.avatar_loading = true;
    },
    [UpdateAvatarThunk.fulfilled]: (state, action) => {
      state.avatar_loading = false;
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.errors = null;
    },
    [UpdateAvatarThunk.rejected]: (state, action) => {
      state.avatar_loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [UpdatePasswordThunk.pending]: (state) => {
      state.update_password_loading = true;
    },
    [UpdatePasswordThunk.fulfilled]: (state, action) => {
      state.update_password_loading = false;
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.errors = null;
    },
    [UpdatePasswordThunk.rejected]: (state, action) => {
      state.update_password_loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [LogoutUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [LogoutUserThunk.fulfilled]: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      // localStorage.removeItem("token");
    },
    [LogoutUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [ForgotPasswordThunk.pending]: (state) => {
      state.loading = true;
    },
    [ForgotPasswordThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.data;
    },
    [ForgotPasswordThunk.rejected]: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    [ResetPasswordThunk.pending]: (state) => {
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
    },

    [GetAllUserThunk.pending]: (state, action) => {
      state.loading_users = true;
    },
    [GetAllUserThunk.fulfilled]: (state, action) => {
      state.loading_users = false;
      state.users = action.payload.user;
    },
    [GetAllUserThunk.rejected]: (state, action) => {
      state.loading_users = false;
      state.errors = action.payload;
    },
    [ResendVerificationThunk.pending]: (state, action) => {
      state.resend_loading = true;
    },
    [ResendVerificationThunk.fulfilled]: (state, action) => {
      state.resend_loading = false;
      state.success = action.payload.data;
    },
    [ResendVerificationThunk.rejected]: (state, action) => {
      state.resend_loading = false;
      state.errors = action.payload;
    },
    [VerificationThunk.pending]: (state, action) => {
      state.verification_loading = true;
    },
    [VerificationThunk.fulfilled]: (state, action) => {
      state.verification_loading = false;
      state.success = action.payload.success;
    },
    [VerificationThunk.rejected]: (state, action) => {
      state.verification_loading = false;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess, setCurrentLocation } =
  userSlice.actions;
export default userSlice.reducer;
