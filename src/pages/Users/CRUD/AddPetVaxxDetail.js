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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { AddVaxxDetailThunk } from "../../../redux/slices/PetSlice";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";

// import { addPerson, getAllPerson } from "../../redux/action/PersonActions";

const AddPetVaxxDetail = () => {
  const { pets } = useSelector((state) => state.pets);
  const [errors, seterrors] = useState({ vaxx: "" });
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
    if (values.vaccine_name !== "") {
      formData.append("pet", pets[0]._id);
      dispatch(AddVaxxDetailThunk(formData));
      setopen(false);
      setvalues({
        vaccine_name: "",
        date_of_vaccination: new Date(),
      });
    } else {
      seterrors({ ...errors, vaxx: "Please Provide Vaccine Name" });
    }
  };

  const handleClose = () => {
    setopen(false);
    setvalues({
      vaccine_name: "",
      date_of_vaccination: new Date(),
    });
    seterrors({ ...errors, vaxx: "" });
  };
  const handleOpen = () => {
    setopen(true);
  };
  return (
    //   Render Block
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<Add />} sx={{mb:2}}>
        Add Vaccination
      </Button>

      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add {pets ? pets[0].name +`'s` : "Loading..."} vaccination</DialogTitle>

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
                  error={errors.vaxx !== "" ? true : false}
                  label="Vaccine Name"
                  helperText={errors.vaxx}
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
