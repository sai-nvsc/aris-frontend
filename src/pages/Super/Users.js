import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/SuperSidebar";
import {
  GetAllUserThunk,
  clearError,
  clearSuccess,
} from "../../redux/slices/UserSlices";
import { CustomBiteCaseGrid } from "../../helpers/GridExport";

const Users = () => {
  const { users, loading, errors, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  useEffect(() => {
    dispatch(GetAllUserThunk());
    return () => {};
  });

  //Datagrid
  const columns = [
    {
      field: "first_name",
      headerName: "Fname",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "last_name",
      headerName: "Lname",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      field: "sex",
      headerName: "Gender",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.birthday).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "address",
      headerName: "Add.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 160,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 60,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "phone_number",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "verified_at",
      headerName: "Verified",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.verified_at).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
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
        pb: 5,
      }}
    >
      <PersistentDrawerLeft title="Users" />
      <CssBaseline />
      <Container maxWidth="xl">
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="success"
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
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
            >
              Registered Users
            </Typography>
          </Grid>
        </Grid>
        <Grid item md flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 2,
              pb: 6,
            }}
          >
            <div style={{ height: 520, width: "100%" }}>
              {!loading && users && (
                <DataGrid
                  rows={users}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: CustomBiteCaseGrid }}
                  {...users}
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

export default Users;
