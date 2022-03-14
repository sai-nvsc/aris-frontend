import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        `${process.env.REACT_APP_API_HOST}api/auth/me`
      );
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
        `${process.env.REACT_APP_API_HOST}api/user/auth/logout`
      );
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
        obj.data
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
        obj.data
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
        obj.data
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
        `${process.env.REACT_APP_API_HOST}api/user/auth/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  errors: null,
  success: null,
  isAuthenticated: null,
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
      state.loading = true;
    },
    [LoginUserThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    [LoginUserThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
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
    },
    [LoginAdminThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.errors = action.payload;
    },

    [SignUpUserThunk.pending]: (state) => {
      state.loading = true;
    },
    [SignUpUserThunk.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    [SignUpUserThunk.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.role = null;
      state.errors = JSON.parse(action.payload);
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
      state.errors = JSON.parse(action.payload);
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
      state.loading = true;
    },
    [GetAllUserThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    [GetAllUserThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess, setCurrentLocation } =
  userSlice.actions;
export default userSlice.reducer;
