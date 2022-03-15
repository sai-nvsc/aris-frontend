import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
export const GetAllInvThunk = createAsyncThunk(
  "inventory/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/inventory/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GetInvDetailsThunk = createAsyncThunk(
  "inventory/detail",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/inventory/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddInvThunk = createAsyncThunk(
  "inventory/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/inventory/add`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const EditInvThunk = createAsyncThunk(
  "inventory/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/inventory/update/${obj.id}`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const DeleteInvThunk = createAsyncThunk(
  "inventory/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/inventory/delete/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  inventory: null,
  loading: false,
  errors: null,
  success: null,
};
const InventorySlice = createSlice({
  name: "inventory",
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
    [GetAllInvThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllInvThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventory = action.payload.inventory;
    },
    [GetAllInvThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [AddInvThunk.pending]: (state) => {
      state.loading = true;
    },
    [AddInvThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.errors = null;
      state.inventory = [...state.inventory, action.payload.inventory];
    },
    [AddInvThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [EditInvThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditInvThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      state.inventory = [...state.inventory, action.payload.inventory];
    },
    [GetInvDetailsThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetInvDetailsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.inventory = action.payload.inventory;
      state.errors = null;
    },
    [GetInvDetailsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [DeleteInvThunk.pending]: (state) => {
      state.loading = true;
    },
    [DeleteInvThunk.fulfilled]: (state, action) => {
      const new_inv = state.inventory;
      new_inv.splice(
        new_inv.findIndex((p) => p._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.inventory = new_inv;
      state.errors = null;
    },
    [DeleteInvThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess } = InventorySlice.actions;
export default InventorySlice.reducer;
