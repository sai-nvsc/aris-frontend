import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {EditButton, StyledTextField, StyledButton } from "../../assets/styles";
import { Edit } from "@mui/icons-material";
import {
  UpdateClinic
} from "../../redux/slices/Clinic";

const Clinic = ({data}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [timeSlot, setTimeSlot] = useState([]);
  const handleTime = (e) => {
    const {
      target: { value },
    } = e;
    setTimeSlot(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const time = [
  '6am-7am',
  '7am-8am',
  '8am-9am',
  '9am-10am',
  '10am-11am',
  '11am-12nn',
  '12nn-1pm',
  '1pm-2pm',
  '2pm-3pm',
  '3pm-4pm',
  '4pm-5pm',
  '5pm-6pm',
  '6pm-7pm',
  '7pm-8pm',
  ];

  const [values, setvalues,] = useState({
    code: data.code,
    name: data.name,
    type: "Point",
    lat: data.lat,
    long: data.long,
    coordinates: [],
    street: data.address.street,
    barangay: data.address.barangay,
    city: data.address.city,
    email: data.email,
    contact: data.contact,
    class: data.class,
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("name", values.name);
    formData.append("location.coordinates[]", values.long);
    formData.append("location.coordinates[]", values.lat);
    formData.append("address.street", values.street);
    formData.append("address.barangay", values.barangay);
    formData.append("address.city", values.city);
    formData.append("time_slot", timeSlot);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("class", values.class);
    dispatch(UpdateClinic({data: formData, id: data._id}));
    //console.log(formData);
    setOpen(false);
    setvalues({
        code: data.code,
        name: data.name,
        type: "Point",
        lat: data.lat,
        long: data.long,
        coordinates: [],
        street: data.street,
        barangay: data.barangay,
        city: data.city,
        email: data.email,
        contact: data.contact,
        class: data.class,
    });
  };

  return (   
    <><EditButton onClick={handleOpen} startIcon={<Edit />}></EditButton>
        <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
          <DialogTitle>Update Clinic</DialogTitle>
          <form encType="multipart/form-data" noValidate onSubmit={handleSubmit}>
              <DialogContent>
                  <Grid container spacing={2} xs={12} sm={12} md={12}>
                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="code"
                              label="Code"
                              name="code"
                              size="small"
                              onChange={handleChange}
                              value={values.code} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="name"
                              label="Clinic Name"
                              name="name"
                              size="small"
                              onChange={handleChange}
                              value={values.name} />
                      </Grid>

                      {/* <Grid item xs={12} sm={6} md={6}>
      <StyledTextField
        required
        fullWidth
        id="coordinate"
        label="Coordinates"
        name="coordinates"
        size="small"
        inputProps={{inputMode: "numeric"}}
        onChange={handleChange}
      />
      </Grid> */}

                    {/*   <Grid item xs={12} sm={6} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="lat"
                              label="Latitude"
                              name="lat"
                              size="small"
                              onChange={handleChange}
                              values={data.lat} />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="long"
                              label="Longitude"
                              name="long"
                              size="small"
                              onChange={handleChange}
                              values={data.long} />
                      </Grid> */}

                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="street"
                              label="Street"
                              name="street"
                              size="small"
                              onChange={handleChange}
                              value={values.street} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="barangay"
                              label="Barangay"
                              name="barangay"
                              size="small"
                              onChange={handleChange}
                              value={values.barangay} />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="city"
                              label="City"
                              name="city"
                              size="small"
                              onChange={handleChange}
                              value={values.city} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              size="small"
                              inputProps={{ inputMode: "email" }}
                              onChange={handleChange}
                              value={values.email} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                          <StyledTextField
                              required
                              fullWidth
                              id="contact"
                              label="Contact No."
                              name="contact"
                              size="small"
                              onChange={handleChange}
                              value={values.contact} />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                          <FormControl
                              required
                              fullWidth
                              size="small"
                              sx={{ backgroundColor: "white" }}
                          >
                              <InputLabel>Class</InputLabel>
                              <Select
                                  label="Class"
                                  name="class"
                                  id="class"
                                  onChange={handleChange}
                                  value={values.class}
                              >
                                  <MenuItem value="ABCTC">ABCTC</MenuItem>
                                  <MenuItem value="Health Center">Health Center</MenuItem>
                              </Select>
                          </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                           Current Time Slots:<br/>
                           <Typography>{data.time_slot}</Typography>
                          <FormControl fullWidth>
                              <InputLabel>Time Slots</InputLabel>
                              <Select
                                  multiple
                                  onChange={handleTime}
                                  value={timeSlot}
                                  renderValue={(selected) => selected.join(', ')}
                              >
                                  {time.map((timeslot) => (
                                      <MenuItem key={timeslot} value={timeslot}>
                                          <Checkbox checked={timeSlot.indexOf(timeslot) > -1} />
                                          <ListItemText primary={timeslot} />
                                      </MenuItem>
                                  ))}
                              </Select>
                          </FormControl>
                      </Grid> 
                  </Grid>

                  <DialogActions>
                      <StyledButton
                          type="submit"
                          variant="contained"
                          onClick={handleSubmit}
                      >
                          Update
                      </StyledButton>
                      <Button
                          variant="outlined"
                          sx={{ mt: 3, mb: 2 }}
                          onClick={handleClose}
                      >
                          Cancel
                      </Button>
                  </DialogActions>
              </DialogContent>
          </form>
      </Dialog>
      </>
  );
};

export default Clinic;
