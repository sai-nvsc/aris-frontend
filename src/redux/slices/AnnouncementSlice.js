import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
export const GetAllAnnThunk = createAsyncThunk(
  "announcement/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/announcement/`,
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

export const AddAnnThunk = createAsyncThunk(
  "announcement/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/announcement/add`,
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

export const EditAnnThunk = createAsyncThunk(
  "announcement/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/announcement/update/${obj.id}`,
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

export const DeleteAnnThunk = createAsyncThunk(
  "announcement/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/announcement/delete/${obj.id}`,
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

export const ViewAllAnnouncement = createAsyncThunk(
  "announcement/view/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/announcement/view/announcements`,
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
  announcement: null,
  loading: false,
  cud_loading: false,
  input_errors: null,
  errors: null,
  success: null,
};
const AnnouncementSlice = createSlice({
  name: "announcement",
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
    [GetAllAnnThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllAnnThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.announcement = action.payload.announcement;
    },
    [GetAllAnnThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [AddAnnThunk.pending]: (state) => {
      state.cud_loading = true;
    },
    [AddAnnThunk.fulfilled]: (state, action) => {
      state.cud_loading = false;
      state.success = action.payload.success;
      state.input_errors = null;
      state.errors = null;
      state.announcement = [action.payload.announcement, ...state.announcement];
    },
    [AddAnnThunk.rejected]: (state, action) => {
      state.cud_loading = false;
      state.success = null;
      try {
        state.input_errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [EditAnnThunk.pending]: (state) => {
      state.cud_loading = true;
    },
    [EditAnnThunk.fulfilled]: (state, action) => {
      state.cud_loading = false;
      state.success = action.payload.message;
      state.errors = null;
      state.input_errors = null;
      state.announcement = action.payload.announcement;
    },
    [EditAnnThunk.rejected]: (state, action) => {
      state.cud_loading = false;
      state.success = null;
      try {
        state.input_errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [DeleteAnnThunk.pending]: (state) => {
      state.loading = true;
    },
    [DeleteAnnThunk.fulfilled]: (state, action) => {
      const new_ann = state.announcement;
      new_ann.splice(
        new_ann.findIndex((a) => a._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.announcement = new_ann;
      state.errors = null;
    },
    [DeleteAnnThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },
    [ViewAllAnnouncement.pending]: (state) => {
      state.loading = true;
    },
    [ViewAllAnnouncement.fulfilled]: (state, action) => {
      state.loading = false;
      state.announcement = action.payload.announcement;
    },
    [ViewAllAnnouncement.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const { clearError, clearSuccess } = AnnouncementSlice.actions;
export default AnnouncementSlice.reducer;
