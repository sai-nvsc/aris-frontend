import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Footer from "../../components/Layouts/Footer";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { StyledButton, StyledTextField } from "../../assets/styles";
import {
  clearError,
  clearSuccess,
  getAdminApts,
  createAppointment,
} from "../../redux/slices/AppointmentSlice";
import { Cancel } from "@mui/icons-material";
import { BsCalendarPlusFill } from "react-icons/bs";
import DatePicker from "@mui/lab/DatePicker";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AcceptAppointment from "../Admin/AdminCRUD/AcceptAppointment";
import CompleteAppointment from "../Admin/AdminCRUD/CompleteAppointment";
import CancelApt from "../Admin/Admin_CancelApt";

const Appointments = () => {
  const { success, errors, appointments, loading } = useSelector(
    (state) => state.appointments
  );
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  useEffect(() => {
    dispatch(getAdminApts({ id: user.clinic }));
    return () => {};
  }, [dispatch, user]);

  //Datagrid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 200,
      valueGetter: (cellValues) => {
        return (
          cellValues.row.user[0].first_name +
          " " +
          cellValues.row.user[0].last_name
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      renderCell: (cellValues) => {
        return moment(cellValues.row.date).format("MMM. DD, YYYY");
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "time_slot",
      headerName: "Time Slot",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 190,
    },
    {
      field: "purpose",
      headerName: "Purpose",
      flex: "auto",
      headerAlign: "center",
      align: "center",
      minWidth: 110,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 120,
      renderCell: (cellValues) => {
        if (cellValues.row.status === "Ongoing") {
          return <Chip color="secondary" label={cellValues.row.status}></Chip>;
        } else if (cellValues.row.status === "Completed") {
          return <Chip color="success" label={cellValues.row.status}></Chip>;
        } else if (cellValues.row.status === "Cancelled") {
          return <Chip label={cellValues.row.status}></Chip>;
        } else if (cellValues.row.status === "Pending") {
          return <Chip color="warning" label={cellValues.row.status}></Chip>;
        }
      },
    },

    {
      field: "accept",
      headerName: "Accept",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 93,
      renderCell: (cellValues) => {
        return (
          <AcceptAppointment
            id={appointments.id}
            data={cellValues.row}
            startIcon={<CheckCircleIcon style={{ color: "#ff8a80" }} />}
          />
        );
      },
      sortable: false,
    },
    {
      field: "done",
      headerName: "Done",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 80,
      renderCell: (cellValues) => {
        return (
          <CompleteAppointment
            id={appointments.id}
            data={cellValues.row}
            startIcon={<CheckCircleIcon style={{ color: "#ff8a80" }} />}
          />
        );
      },
      sortable: false,
    },
    {
      field: "Cancel",
      headerName: "Cancel",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <CancelApt
            id={appointments.id}
            data={cellValues.row}
            startIcon={<Cancel style={{ color: "#ff8a80" }} />}
          />
        );
      },
    },
  ];
  const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

  //Create Apt
  const [values, setValues] = useState({
    user: "",
    time_slot: "",
    date: moment(),
    purpose: "",
    status: "Ongoing",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("clinicId", user.clinic);
    formData.append("user", values.user);
    formData.append("time_slot", values.time_slot);
    formData.append("date", moment(values.date).toISOString());
    formData.append("purpose", values.purpose);
    formData.append("status", values.status);
    dispatch(createAppointment({ data: formData }));

    setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "110vh",
      }}
    >
      <PersistentDrawerLeft title="Appointments" />
      <CssBaseline />
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

      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Appointments
            </Typography>
          </Grid>

          <Grid item>
            <StyledButton
              startIcon={<BsCalendarPlusFill />}
              onClick={handleOpen}
            >
              Create Appointment
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 5 }} maxWidth="xl">
        <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pb: 6,

              "& .ongoing": {
                backgroundColor: "#ff8a80",
                color: "#000",
              },
              "& .pending": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            <div style={{ height: 525, width: "100%" }}>
              {!loading && appointments && (
                <DataGrid
                  rows={appointments}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  getCellClassName={(params) => {
                    if (params.field.status === "status") {
                      return "";
                    }
                    return params.value === "Pending" ? "ongoing" : "pending";
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Container>

      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Create Appointment</DialogTitle>
        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="user"
                  label="Patient"
                  name="user"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Date"
                    openTo="month"
                    views={["year", "month", "day"]}
                    value={moment(values.date)}
                    name="date"
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setValues({
                        ...values,
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

              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Time Slot</InputLabel>
                  <Select
                    name="time_slot"
                    value={values.time_slot}
                    label="TimeSlot"
                    size="small"
                    onChange={handleChange}
                  >
                    {appointments &&
                      appointments.map((time) => {
                        return (
                          <MenuItem key={time} value={time.time_slot}>
                            {time.time_slot}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  size="small"
                  fullWidth
                  label="Purpose"
                  name="purpose"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Set
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

      <Footer />
    </Box>
  );
};

export default Appointments;
