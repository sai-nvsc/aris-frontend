import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsCalendarPlusFill } from "react-icons/bs";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton, StyledTextField } from "../../../assets/styles";
import {
  EligibilityCheck,
  getClinics,
  requestAppointment,
} from "../../../redux/slices/AppointmentSlice";
import { getActiveBiteCase } from "../../../redux/slices/BiteCaseSlice";
import { setCurrentLocation } from "../../../redux/slices/UserSlices";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
const CreateAppointment = () => {
  const [open, setopen] = useState(false);
  const [clinic_choice, setclinic_choice] = useState("Nearby");
  const dispatch = useDispatch();

  const { loadingClinics, clinics, ...rest } = useSelector(
    (state) => state.appointments
  );
  const { latitude, longitude, location_loading } = useSelector(
    (state) => state.user
  );
  const [value, setvalue] = useState({
    purpose: "",
    time_slot: "",
    date: moment(),
  });
  const [selected_clinic, setselected_clinic] = useState({});

  const handleRadoChange = (e) => {
    setclinic_choice(e.target.value);

    if (e.target.value === "Nearby") {
    } else {
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "clinic") {
      setselected_clinic(e.target.value);
      console.log(selected_clinic);
    } else {
      setvalue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    console.log("nagsubmit");
    const formData = new FormData();
    formData.append("clinicId", selected_clinic._id);
    formData.append("time_slot", value.time_slot);
    formData.append("date", moment(value.date).toISOString());
    formData.append("purpose", value.purpose);
    formData.append("status", "Pending");

    dispatch(requestAppointment({ data: formData }));
  };

  const handleErrorClose = () => {
    setopen(false);
  };

  const handleClose = () => {
    setopen(false);
    setselected_clinic({});
    setvalue({ purpose: "", time_slot: "" });
  };

  const handleModal = () => {
    dispatch(EligibilityCheck());
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        dispatch(
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
    } else {
      dispatch(
        setCurrentLocation({
          latitude: "",
          longitude: "",
        })
      );
    }
    dispatch(getClinics({ lat: latitude, lng: longitude }));
    setopen(true);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Button
        variant="contained"
        startIcon={<BsCalendarPlusFill />}
        onClick={handleModal}
      >
        Set an Appointment
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Set an Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <FormControl>
                <FormLabel>Clinic</FormLabel>
                <RadioGroup
                  row
                  value={clinic_choice}
                  onChange={handleRadoChange}
                  name="clinic_choice"
                >
                  <FormControlLabel
                    control={<Radio />}
                    value="Nearby"
                    label="Nearby"
                  />
                  <FormControlLabel
                    control={<Radio />}
                    value="All"
                    label="All"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {!loadingClinics && (
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <InputLabel>Vaccination Facility</InputLabel>
                  <Select
                    name="clinic"
                    value={
                      Object.keys(selected_clinic).length === 0
                        ? ""
                        : selected_clinic
                    }
                    label="Vaccination Facility"
                    size="small"
                    onChange={handleChange}
                  >
                    {clinic_choice === "Nearby"
                      ? clinics &&
                        clinics.nearby.map((clinic) => {
                          return (
                            <MenuItem key={clinic._id} value={clinic}>
                              {clinic.name} ({clinic.calcDistance} meters)
                            </MenuItem>
                          );
                        })
                      : clinics &&
                        clinics.all.map((clinic) => {
                          return (
                            <MenuItem key={clinic._id} value={clinic}>
                              {clinic.name}
                            </MenuItem>
                          );
                        })}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item sm={12}>
              <LocalizationProvider dateAdapter={DateAdapterMoment}>
                <DatePicker
                  disablePast
                  label="Date"
                  openTo="month"
                  views={["year", "month", "day"]}
                  value={moment(value.date)}
                  name="birthday"
                  InputProps={{ readOnly: true }}
                  onChange={(newDate) =>
                    setvalue({
                      ...value,
                      date: newDate.toDate().toISOString(),
                    })
                  }
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      required
                      size="small"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                disabled={Object.keys(selected_clinic).length === 0}
              >
                <InputLabel>Time Slot</InputLabel>
                <Select
                  name="time_slot"
                  value={value.time_slot}
                  label="TimeSlot"
                  size="small"
                  onChange={handleChange}
                >
                  {Object.keys(selected_clinic).length > 0 &&
                    selected_clinic.time_slot.map((time) => {
                      return (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={12}>
              <StyledTextField
                size="small"
                fullWidth
                label="Purpose"
                name="purpose"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Backdrop
            sx={{ color: "#fff", zindex: (theme) => theme.zIndex.drawer + 1 }}
            open={rest.eligibility_loading}
          >
            {rest.eligibility_loading && (
              <img src={require("../../../assets/paw.gif")} alt="loading" />
            )}
            {!rest.eligibility && !rest.eligibility_loading && (
              <Dialog open={true} fullWidth onClose={handleErrorClose}>
                <DialogTitle>Invalid</DialogTitle>
                <DialogContent>
                  <DialogContentText>{rest.message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <StyledButton onClick={handleErrorClose}> Close</StyledButton>
                </DialogActions>
              </Dialog>
            )}
          </Backdrop>
        </DialogContent>
        <DialogActions>
          <StyledButton variant="contained" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateAppointment;
