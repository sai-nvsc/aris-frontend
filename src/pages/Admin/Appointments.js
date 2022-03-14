import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, AlertTitle,Box, Container, Grid, Snackbar, Typography } from "@mui/material";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Footer from "../../components/Layouts/Footer";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { clearError, clearSuccess, getAdminApts } from "../../redux/slices/AppointmentSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Cancel } from "@mui/icons-material";
import AcceptAppointment from "../Admin/AdminCRUD/AcceptAppointment"
import CancelApt from "../Admin/Admin_CancelApt";
import moment from "moment";

const Appointments = () => {
   const { success, errors, appointments, loading } = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
 /*  useEffect(() => {
    dispatch(getAdminAppointments({ id: user.clinic }));
    return () => {};
  }, [dispatch, user]);
 */
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
    valueGetter: (cellValues) => {
      return (
        cellValues.row.user[0].first_name +
        " " +
        cellValues.row.user[0].last_name
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
 { field: "date", headerName: "Date", flex: 1, headerAlign: 'center', align:'center',
    renderCell: (cellValues) => {
      return moment(cellValues.row.date).format(
        "MMM. DD, YYYY"
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  { field: "time_slot", headerName: "Time Slot", flex: 1, headerAlign: 'center', align:'center'},
  { field: "purpose", headerName: "Pursose", flex: 1, headerAlign: 'center', align:'center' },
  { field: "status", headerName: "Status", flex: 1, headerAlign: 'center', align:'center'},
 
  { field: "accept", headerName: "Accept", flex: 1, headerAlign: 'center', align:'center',
    renderCell: (cellValues) => {
      return <AcceptAppointment id={appointments.id} data={cellValues.row} startIcon={<CheckCircleIcon style={{ color: "#ff8a80" }}/>} />;
    },
    sortable: false,
  },

  { field: "Cancel", headerName: "Cancel", flex: 1, headerAlign: 'center', align:'center',
    sortable: false,
    renderCell: (cellValues) => {
      return <CancelApt id={appointments.id} data={cellValues.row} startIcon={<Cancel style={{ color: "#ff8a80" }}/>} />;

    },
  },
];
const handleCellClick = (param, e) => {
  e.stopPropagation();
};
const handleRowClick = (param, e) => {
  e.stopPropagation();
};
  
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
      }}
    >
      <PersistentDrawerLeft />
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
        <Typography
          component="h1"
          variant="h2"
          align="left"
          color="text.primary"
          gutterBottom
        >
          Appointments
        </Typography>

  <Grid item xs container flexDirection={"column"}>
    <Box
    sx={{
      bgcolor: "background.paper",
      pb: 6,

      '& .ongoing': {
        backgroundColor: '#ff8a80',
        color: '#000',
      },
      '& .pending': {
        backgroundColor: '#fff',
        color: '#000',
      },
    }}>
    <div style={{ height: 525, width: "100%" }}>
      {!loading && appointments && (
        <DataGrid
            rows={appointments}             
            columns={columns}
            getRowId={(row) => row._id}
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
            components={ {Toolbar: GridToolbar}}
          
            getCellClassName={(params) => {
              if (params.field.status === 'status') {
                return '';
              }
              return params.value === "Pending" ?  'ongoing' : 'pending';
            }}
          />
        )}
        </div>
        </Box>
        </Grid>

      </Container>
      <Footer />
    </Box>
  );
};

export default Appointments;
