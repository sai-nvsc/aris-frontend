import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Delete from "../../components/Layouts/Dialogs/Delete";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    Chip,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Popover,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableFooter,
    TablePagination,
    TableRow,
    TextField,
    Typography,
    FormControlLabel,
  } from "@mui/material";
  import {
    StyledTextField,
    StyledTableCell,
    StyledTableRow,
    StyledButton,
    StyledLink,
  } from "../../assets/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
    clearError,
    clearSuccess,
    GetAllUserThunk,
  } from "../../redux/slices/UserSlices";


const moment = require("moment");
const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

const Px = () => {
const { loading, user, errors, success } = useSelector((state) => state.user);
const params = useParams();

const dispatch = useDispatch();
  
 //modals
 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);
 const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

 function refreshPage() {
    window.location.reload(false);
  }

  const columns = [
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "sex", headerName: "Sex", flex: 1 },
    { field: "birthday", headerName: "Birthday", flex: 1,
      renderCell: (cellValues) => {
        return moment(cellValues.row.birthday).format(
          "MMMM DD, YYYY"
        );
      },
    },
    { field: "address", headerName: "Add.", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone_number", headerName: "Contact", flex: 1 },
    { field: "Edit", headerName: "Edit", flex: 1,
      renderCell: (cellValues) => {
        //return <EditPetVaxxDetail id={params.id} data={cellValues.row} />;
      },
      sortable: false,
    },
    { field: "Delete", headerName: "Delete", flex: 1,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Delete
            //id={params.id}
            //name={"this entry"}
            collection="users"
            data={cellValues.row}
          />
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(GetAllUserThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

return (
<Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <PersistentDrawerLeft />
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
              Patients
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Search Here..."
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <StyledButton onClick={handleOpen} margin="10">
              Add Record
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>

        <Grid item xs container flexDirection={"column"}>
    <Box
    sx={{
      bgcolor: "background.paper",
      pt: 8,
      pb: 6,
    }}>
    <div style={{ height: 525, width: "auto" }}>
        {!loading && user && (
        <DataGrid
            rows={user}
            columns={columns}
            getRowId={(row) => row._id}
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
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
export default Px;
