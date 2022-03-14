import { Add } from "@mui/icons-material";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { AddVaxxDetailThunk } from "../../../redux/slices/PetSlice";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";

// import { addPerson, getAllPerson } from "../../redux/action/PersonActions";

const AddPetVaxxDetail = () => {
  const { user } = useSelector((state) => state.user);
  const { pets, loading } = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [values, setvalues] = useState({
    vaccine_name: "",
    date_of_vaccination: new Date(),
  });

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();

    formData.append("name", values.vaccine_name);
    formData.append(
      "date_of_vaccination",
      new Date(values.date_of_vaccination).toISOString()
    );
    formData.append("pet", pets[0]._id);
    dispatch(AddVaxxDetailThunk(formData));
    setopen(false);
    setvalues({
      vaccine_name: "",
      date_of_vaccination: new Date(),
    });
  };

  const handleClose = () => {
    setopen(false);
    setvalues({
      vaccine_name: "",
      date_of_vaccination: new Date(),
    });
  };
  const handleOpen = () => {
    setopen(true);
  };
  return (
    //   Render Block
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<Add />}>
        Add Vaccination Detail
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Pet Vaccination Details</DialogTitle>

        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={6}>
                <StyledTextField
                  name="vaccine_name"
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  label="Vaccine Name"
                  value={values.vaccine_name}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    disableFuture
                    label="Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    value={moment(values.date_of_vaccination)}
                    name="date_of_vaccination"
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        date_of_vaccination: newDate.toDate().toISOString(),
                      })
                    }
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        fullWidth
                        required
                        margin="normal"
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddPetVaxxDetail;
