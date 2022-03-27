import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;
export const AddVaxxThunk = createAsyncThunk(
  "vaxx/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/post-vaxx/add`,
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

export const EditVaxxThunk = createAsyncThunk(
  "vaxx/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/bitecase/post-vaxx/updateVaxx/${obj.id}`,
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

export const DeleteVaxxThunk = createAsyncThunk(
  "vaxx/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/bitecase/post-vaxx/delete/${obj.id}`,
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

export const GetBiteCasesThunk = createAsyncThunk(
  "vaxx/bites",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/get/${obj.id}`,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const GetVaxxPerBiteCasThunk = createAsyncThunk(
  "vaxx/bites/id",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/post-vaxx/get/bitecase/${obj.id}`,
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

export const GetBiteCaseDetailThunk = createAsyncThunk(
  "vaxx/bite-info",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/get/bite/${obj.id}`,
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

export const SendHealthReportThunk = createAsyncThunk(
  "vaxx/add/report",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/file/report`,
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

export const ReplyThunk = createAsyncThunk(
  "vaxx/reply",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/file/report/reply`,
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
  loading: true,
  bites: null,
  vaxx: null,
  reports: null,
};
const VaccineSlices = createSlice({
  name: "vaxx",
  initialState,
  reducers: {},
  extraReducers: {
    [GetBiteCasesThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetBiteCasesThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.bites = action.payload.bitecase;
    },
    [GetBiteCasesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [GetVaxxPerBiteCasThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetVaxxPerBiteCasThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.vaxx = action.payload.details.vaxx;
      state.bites = action.payload.details.bite;
      state.reports = action.payload.details.report;
    },
    [GetVaxxPerBiteCasThunk.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [GetBiteCaseDetailThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetBiteCaseDetailThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.bites = action.payload.bite;
    },
    [GetBiteCaseDetailThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [SendHealthReportThunk.pending]: (state) => {
      state.loading = true;
    },
    [SendHealthReportThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.errors = null;
      state.reports = action.payload.report;
    },
    [SendHealthReportThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = false;
      state.errors = action.payload;
    },

    [AddVaxxThunk.pending]: (state) => {
      state.loading = true;
    },
    [AddVaxxThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.errors = null;
      state.vaxx = [...state.vaxx, action.payload.vaxx];
    },
    [AddVaxxThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [EditVaxxThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditVaxxThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      state.vaxx = [...state.vaxx, action.payload.vaxx];
    },
    [DeleteVaxxThunk.pending]: (state) => {
      state.loading = true;
    },
    [DeleteVaxxThunk.fulfilled]: (state, action) => {
      const new_vaxx = state.vaxx;
      new_vaxx.splice(
        new_vaxx.findIndex((v) => v._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.vaxx = new_vaxx;
      state.errors = null;
    },
    [DeleteVaxxThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },
    [ReplyThunk.pending]: (state) => {
      state.loading = true;
    },
    [ReplyThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      window.location.reload();
    },
    [ReplyThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default VaccineSlices.reducer;
