import { Edit } from "@mui/icons-material";
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
import { useDispatch } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { EditPetVaccineThunk } from "../../../redux/slices/PetSlice";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";

const EditPetVaxxDetail = ({ data, id }) => {
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  const [values, setvalues] = useState({
    vaccine_name: data.vaccine_name,
    date_of_vaccination: new Date(data.date_of_vaccination),
  });

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("vaccine_name", values.vaccine_name);
    formData.set(
      "date_of_vaccination",
      new Date(values.date_of_vaccination).toISOString()
    );
    formData.set("pet", data._id);
    formData.set("id", id);
    dispatch(EditPetVaccineThunk(formData));

    setopen(false);
    setvalues({
      vaccine_name: data.vaccine_name,
      date_of_vaccination: new Date(data.date_of_vaccination),
    });
  };

  const handleClose = () => {
    setopen(false);
    setvalues({
      vaccine_name: data.vaccine_name,
      date_of_vaccination: new Date(data.date_of_vaccination),
    });
  };
  const handleOpen = () => {
    setopen(true);
  };
  return (
    //   Render Block
    <>
      <Button variant="outlined" onClick={handleOpen} startIcon={<Edit />}>
        Edit
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Pet Vaccination Details</DialogTitle>

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

export default EditPetVaxxDetail;
