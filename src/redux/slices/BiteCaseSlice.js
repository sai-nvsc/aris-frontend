import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;
export const GetAllCasesThunk = createAsyncThunk(
  "bitecase/cases",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/all/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GetCatPerClinicThunk = createAsyncThunk(
  "bitecase/cat-clinic",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/bitecase/catperclinic/", obj);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const ClinicCasesPerGenderThunk = createAsyncThunk(
  "bitecase/gendercase",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/bitecase/cases-per-gender/", obj);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AllCasesPerGenderThunk = createAsyncThunk(
  "bitecase/allgendercase",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/bitecase/all-cases-per-gender/",
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GetAllCaseThunk = createAsyncThunk(
  "bitecase/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/`,
        obj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const GetCaseDetailsThunk = createAsyncThunk(
  "bitecase/details",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/get/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const AddCaseThunk = createAsyncThunk(
  "bitecase/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/add`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const EditCaseThunk = createAsyncThunk(
  "bitecase/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/bitecase/update/${obj.id}`,
        obj.data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const DeleteCaseThunk = createAsyncThunk(
  "bitecase/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/bitecase/delete/${obj.id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getActiveBiteCase = createAsyncThunk(
  "bitecase/get-active",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/user/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
const initialState = {
  bitecase: null,
  loading: false,
  errors: null,
  success: null,
  gettingappointment_loading: false,
};

const BiteCaseSlice = createSlice({
  name: "bitecase",
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
    //analytics
    [GetAllCasesThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetAllCasesThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.cases = action.payload.cases;
    },
    [GetAllCasesThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    [GetCatPerClinicThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetCatPerClinicThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.category1 = action.payload.category.category1;
      state.category2 = action.payload.category.category2;
      state.category3 = action.payload.category.category3;
      state.category = action.payload.category;
    },
    [GetCatPerClinicThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [ClinicCasesPerGenderThunk.pending]: (state) => {
      state.loading = true;
    },
    [ClinicCasesPerGenderThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.male = action.payload.gender.male;
      state.female = action.payload.gender.female;
      state.gender = action.payload.gender;
    },
    [ClinicCasesPerGenderThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    [AllCasesPerGenderThunk.pending]: (state) => {
      state.loading = true;
    },
    [AllCasesPerGenderThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.m = action.payload.allgender.m;
      state.f = action.payload.allgender.f;
      state.allgender = action.payload.allgender;
    },
    [AllCasesPerGenderThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },

    [GetAllCaseThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetAllCaseThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.bitecase = action.payload.bitecase;
    },
    [GetAllCaseThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [AddCaseThunk.pending]: (state) => {
      state.loading = true;
    },
    [AddCaseThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.errors = null;
      state.bitecase = [...state.bitecase, action.payload.bitecase];
    },
    [AddCaseThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;
    },
    [EditCaseThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditCaseThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.succes = action.payload.message;
      state.errors = null;
      state.bitecase = [...state.bitecase, action.payload.bitecase];
      //window.location.reload();
    },
    [DeleteCaseThunk.fulfilled]: (state, action) => {
      const new_case = state.bitecase;
      new_case.splice(
        new_case.findIndex((p) => p._id === action.payload.id),
        1
      );
      state.loading = false;
      state.success = action.payload.success;
      state.bitecase = new_case;
      state.errors = null;
    },
    [DeleteCaseThunk.rejected]: (state, action) => {
      state.loading = false;
      state.succes = null;
      state.errors = action.payload;
    },

    [getActiveBiteCase.pending]: (state) => {
      state.gettingappointment_loading = true;
    },

    [getActiveBiteCase.fulfilled]: (state, action) => {
      state.gettingappointment_loading = false;
      if (action.payload.eligibility) {
        state.eligibility = true;
      } else {
        state.eligibility = false;
        state.message =
          "You are not Eligible to create an appointment because you do not have any rabies vaccination on-going";
      }
    },
    [getActiveBiteCase.rejected]: (state, action) => {
      state.gettingappointment_loading = false;
      state.errors = action.payload;
    },

    [GetCaseDetailsThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetCaseDetailsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.bitecase = action.payload.bitecase;
      //state.errors = null;
    },
    [GetCaseDetailsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});
export const { clearError, clearSuccess } = BiteCaseSlice.actions;
export default BiteCaseSlice.reducer;
