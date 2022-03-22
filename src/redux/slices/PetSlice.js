import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
export const GetAllPetsThunk = createAsyncThunk(
  "pets/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/pet/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const GetPetDetailsThunk = createAsyncThunk(
  "pets/detail",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/pet/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const DeletePetThunk = createAsyncThunk(
  "pets/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/pet/delete/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddPetsThunk = createAsyncThunk(
  "pets/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/pet/add`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const EditPetsThunk = createAsyncThunk(
  "pets/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/pet/update/${obj.id}`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddVaxxDetailThunk = createAsyncThunk(
  "pets/add/vaxxdetail",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/pet/add/vaxx-detail`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const DeletePetVaccineThunk = createAsyncThunk(
  "pets/delete/vaxxdetail",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/pet/delete/vaxx-detail`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const EditPetVaccineThunk = createAsyncThunk(
  "pet/edit/vaxxdetail",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/pet/update/vaxx-detail`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  pets: null,
  loading: false,
  errors: null,
  success: null,
};
const PetSlice = createSlice({
  name: "pets",
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
    [GetAllPetsThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllPetsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.pets = action.payload.pets;
    },
    [GetAllPetsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [AddPetsThunk.pending]: (state) => {
      state.loading = true;
    },
    [AddPetsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.errors = null;
      state.pets = [...state.pets, action.payload.pet];
    },
    [AddPetsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [EditPetsThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditPetsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      window.location.reload();
    },
    [GetPetDetailsThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetPetDetailsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.pets = action.payload.pets;
      state.errors = null;
    },
    [GetPetDetailsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [DeletePetThunk.pending]: (state) => {
      state.loading = true;
    },
    [DeletePetThunk.fulfilled]: (state, action) => {
      const new_pets = state.pets;
      new_pets.splice(
        new_pets.findIndex((p) => p._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.pets = new_pets;
      state.errors = null;
    },
    [DeletePetThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },
    [AddVaxxDetailThunk.pending]: (state) => {
      state.vaxx_loading = true;
    },
    [AddVaxxDetailThunk.fulfilled]: (state, action) => {
      state.vaxx_loading = false;
      state.pets = action.payload.pet_vaxx;
      state.success = action.payload.message;
    },
    [AddVaxxDetailThunk.rejected]: (state, action) => {
      state.vaxx_loading = false;
      state.errors = action.payload;
    },
    [DeletePetVaccineThunk.pending]: (state) => {
      state.delete_vaccine_loading = true;
    },
    [DeletePetVaccineThunk.fulfilled]: (state, action) => {
      state.delete_vaccine_loading = false;
      state.success = action.payload.message;
      state.pets = action.payload.pet_vaxx;
    },
    [DeletePetVaccineThunk.rejected]: (state, action) => {
      state.delete_vaccine_loading = false;
      state.error = action.payload;
    },
    [EditPetVaccineThunk.pending]: (state) => {
      state.update_vaccine_loading = true;
    },
    [EditPetVaccineThunk.fulfilled]: (state, action) => {
      state.update_vaccine_loading = false;
      state.success = action.payload.message;
      state.pets = action.payload.pet_vaxx;
    },
    [EditPetVaccineThunk.rejected]: (state, action) => {
      state.update_vaccine_loading = false;
      state.error = action.payload;
    },
  },
});
export const { clearError, clearSuccess } = PetSlice.actions;
export default PetSlice.reducer;
