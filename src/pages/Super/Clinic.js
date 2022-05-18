import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Container,
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
  Snackbar,
  Typography,
} from "@mui/material";
import { StyledTextField, StyledButton } from "../../assets/styles";
import { Edit } from "@mui/icons-material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EditClinic from "./EditClinic";
import DeleteClinic from "../../components/Layouts/Dialogs/DeleteClinic";
import PersistentDrawerLeft from "../../components/Layouts/SuperSidebar";
import Footer from "../../components/Layouts/Footer";
import {
  CreateClinic,
  getAllClinics,
  clearError,
  clearSuccess,
} from "../../redux/slices/Clinic";

const Clinic = () => {
  const { loading, clinic, errors, success } = useSelector(
    (state) => state.clinic
  );
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
 
  function refreshPage() {
    window.location.reload(false);
  }

  //Datagrid
  const columns = [
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "name",
      headerName: "Clinic",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 300,
    },
    {
      field: "coordinates",
      headerName: "Coordinates",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 220,
      valueGetter: (cellValues) => {
        return cellValues.row.location.coordinates;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "street",
      headerName: "Street",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 120,
      valueGetter: (cellValues) => {
        return cellValues.row.address.street;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "barangay",
      headerName: "Brgy",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 120,
      valueGetter: (cellValues) => {
        return cellValues.row.address.barangay;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      valueGetter: (cellValues) => {
        return cellValues.row.address.city;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 200,
    },
    {
      field: "contact",
      headerName: "Contact.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "class",
      headerName: "Class",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 85,
    },
    {
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
     renderCell: (cellValues) => {
        return (
          <>
            <EditClinic
              id={clinic.id}
              data={cellValues.row}
              startIcon={<Edit style={{ color: "#ff8a80" }} />}
            /> 
            <DeleteClinic
              id={cellValues.row._id}
              name={clinic[0].name}
              collection="clinics"
              data={cellValues.row}
            />
          </>
        );
      },
      sortable: false,
    },
  ];
  const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

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
    code: "",
    name: "",
    type: "Point",
    lat: "",
    long: "",
    coordinates: [],
    street: "",
    barangay: "",
    city: "",
    // time_slot: [],
    email: "",
    contact: "",
    class: "",
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
    dispatch(CreateClinic(formData));
    //console.log(formData);
  };

  useEffect(() => {
    dispatch(getAllClinics());
    return () => {};
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <PersistentDrawerLeft title="Clinics" />
      <CssBaseline />
      <Container maxWidth="xl">
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="sucess"
          >
            <Alert severity="success" variant="filled">
              <AlertTitle>Success</AlertTitle>
              {success}
            </Alert>
          </Snackbar>
        )}
        {errors && (
          <Snackbar
            open={errors}
            autoHideDuration={3000}
            onClose={onClose}
            name="error"
          >
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              {errors}
            </Alert>
          </Snackbar>
        )}

        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Typography
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Clinics
            </Typography>
          </Grid>

          <Grid item>
            <StyledButton
              onClick={handleOpen}
              margin="10"
              startIcon={<MedicalServicesIcon />}
            >
              Add Clinic
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>

        <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 3,
              pb: 6,
            }}
          >
            <div style={{ height: 525, width: "auto" }}>
              {!loading && clinic && (
                <DataGrid
                  rows={clinic}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...clinic}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Container>

      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Add Clinic</DialogTitle>
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
                />
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
                />
              </Grid>

              {/** <Grid item xs={12} sm={6} md={6}>
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

              <Grid item xs={12} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="lat"
                  label="Latitude"
                  name="lat"
                  size="small"
                  onChange={handleChange}
                />
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
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
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
                      <Checkbox checked={timeSlot.indexOf(timeslot) > -1}/>
                      <ListItemText primary={timeslot} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  size="small"
                  onChange={handleChange}
                />
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
                />
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
                />
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
                />
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
                />
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
                  >
                    <MenuItem value="ABCTC">ABCTC</MenuItem>
                    <MenuItem value="Health Center">Health Center</MenuItem>
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
                Add
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

      <Footer />
    </Box>
  );
};

export default Clinic;
