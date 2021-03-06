import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

//All cases from all clinics
export const GetAllCasesThunk = createAsyncThunk(
  "bitecase/cases",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/all/`,
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

export const GetCatPerClinicThunk = createAsyncThunk(
  "bitecase/cat-clinic",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/bitecase/catperclinic/", obj, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
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
      const response = await axios.post(
        "/api/bitecase/cases-per-gender/",
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

export const AllCasesPerGenderThunk = createAsyncThunk(
  "bitecase/allgendercase",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/bitecase/all-cases-per-gender/",
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

export const GetAllCaseThunk = createAsyncThunk(
  "bitecase/all",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/`,
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

export const GetCaseDetailsThunk = createAsyncThunk(
  "bitecase/details",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/get/${obj.id}`,
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

export const AddCaseThunk = createAsyncThunk(
  "bitecase/add",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/add`,
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

export const EditCaseThunk = createAsyncThunk(
  "bitecase/edit",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_HOST}api/bitecase/update/${obj.id}`,
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

// export const EditCaseStatusThunk = createAsyncThunk(
//   "bitecase/editstatus",
//   async (obj, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(
//         `${process.env.REACT_APP_API_HOST}api/bitecase/update/${obj.id}`,
//         obj.data
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

export const DeleteCaseThunk = createAsyncThunk(
  "bitecase/delete",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_HOST}api/bitecase/delete/${obj.id}`,
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

export const getActiveBiteCase = createAsyncThunk(
  "bitecase/get-active",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/bitecase/user/get`,
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

export const ForceAddCaseThunk = createAsyncThunk(
  "bitecase/add-force",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/bitecase/add-force`,
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
  bitecase: null,
  loading: false,
  errors: null,
  success: null,
  gettingappointment_loading: false,
  existing_bites: null,
  existing_dialog_open: false,
  add_case_errors: null,
  add_case_loading: false,
};

const BiteCaseSlice = createSlice({
  name: "bitecase",
  initialState,
  reducers: {
    clearError: (state) => {
      state.errors = null;
      state.add_case_errors = null;
      state.existing_bites = null;
    },
    clearSuccess: (state) => {
      state.success = null;
      state.existing_bites = null;
    },
    closeDialog: (state) => {
      state.existing_dialog_open = false;
    },
  },
  extraReducers: {
    //analytics
    [GetAllCasesThunk.pending]: (state) => {
      state.loading = true;
    },
    [GetAllCasesThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.bitecase = action.payload.cases;
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
      state.add_case_loading = true;
    },
    [AddCaseThunk.fulfilled]: (state, action) => {
      state.add_case_loading = false;
      state.errors = null;
      if (action.payload.record_existing) {
        state.existing_bites = action.payload.bites;
        state.existing_dialog_open = true;
      } else {
        state.success = action.payload.success;
        state.bitecase = action.payload.bitecase;
      }
    },
    [AddCaseThunk.rejected]: (state, action) => {
      state.add_case_loading = false;
      state.success = null;
      try {
        state.add_case_errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [ForceAddCaseThunk.pending]: (state) => {
      state.add_case_loading = true;
    },
    [ForceAddCaseThunk.fulfilled]: (state, action) => {
      state.add_case_loading = false;
      state.errors = null;
      if (action.payload.record_existing) {
        state.existing_bites = action.payload.bites;
        state.existing_dialog_open = true;
      } else {
        state.success = action.payload.success;
        state.bitecase = action.payload.bitecase;
      }
    },
    [ForceAddCaseThunk.rejected]: (state, action) => {
      state.add_case_loading = false;
      state.success = null;
      try {
        state.add_case_errors = JSON.parse(action.payload);
      } catch (error) {
        state.errors = action.payload;
      }
    },
    [EditCaseThunk.pending]: (state) => {
      state.loading = true;
    },
    [EditCaseThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.errors = null;
      state.bitecase = action.payload.bitecase;
      //window.location.reload();
    },
    [EditCaseThunk.rejected]: (state, action) => {
      state.loading = false;
      state.success = null;
      state.errors = action.payload;

      //window.location.reload();
    },
    // [EditCaseStatusThunk.pending]: (state) => {
    //   state.loading = true;
    // },
    // [EditCaseStatusThunk.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.success = action.payload.message;
    //   state.errors = null;
    //   state.bites = action.payload.bitecase;
    //   //window.location.reload();
    // },
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
export const { clearError, clearSuccess, closeDialog } = BiteCaseSlice.actions;
export default BiteCaseSlice.reducer;
