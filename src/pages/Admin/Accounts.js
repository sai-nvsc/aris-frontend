import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableFooter,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import {
  StyledTextField,
  StyledTableCell,
  StyledTableRow,
  StyledButton,
} from "../../assets/styles";
import Delete from "../../components/Layouts/Dialogs/Delete";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Footer from "../../components/Layouts/Footer";
import {
  CreateAdminThunk,
  GetAllAccountsThunk,
  clearError,
  clearSuccess,
} from "../../redux/slices/AdminSlices";

const Accounts = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, admin, errors, success } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

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

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admin.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [values, setvalues] = React.useState({
    admin_name: "",
    role: "",
    clinic: user.clinic,
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("admin_name", values.admin_name);
    formData.append("role", values.role);
    formData.append("clinic", user.clinic);
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    dispatch(CreateAdminThunk(formData));
    refreshPage();
  };

  useEffect(() => {
    dispatch(GetAllAccountsThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

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
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Accounts
            </Typography>
          </Grid>
          <Grid item>
            <StyledTextField
              id="outlined-basic"
              label="Search Here..."
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <StyledButton onClick={handleOpen} margin="10">
              Add Account
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ py: 7 }} maxWidth="xl">
        <Grid container spacing={3}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  {/* <StyledTableCell>ID</StyledTableCell> */}
                  <StyledTableCell>Admin Name</StyledTableCell>
                  <StyledTableCell>Role</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {!loading &&
                  admin &&
                  admin.map((acc) => (
                    <StyledTableRow>
                      <StyledTableCell>{acc.admin_name}</StyledTableCell>
                      <StyledTableCell>{acc.role}</StyledTableCell>
                      <StyledTableCell>{acc.email}</StyledTableCell>
                      <StyledTableCell>{acc.username}</StyledTableCell>
                      <StyledTableCell>
                        {/* <EditAccount accEdit={us} startIcon={<Edit />}/> */}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Delete
                          id={acc._id}
                          name={acc.admin_name}
                          collection="admins"
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>

              <TableFooter>
                {!loading && admin && (
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50, 100]}
                      colSpan={10}
                      count={admin.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                )}
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        justifyContent="center"
        transform="translate(-50%, -50%)"
        top="50%"
        position="absolute"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={4}
            >
              Add Account
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="admin_name"
                  label="Admin Name"
                  name="admin_name"
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
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="role"
                    name="role"
                    id="role"
                    onChange={handleChange}
                  >
                    <MenuItem value="superadmin" disabled="true">
                      superadmin
                    </MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                    <MenuItem value="vaccinator">vaccinator</MenuItem>
                    <MenuItem value="inventory">inventory</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="clinic"
                  label="Clinic"
                  name="clinic"
                  size="small"
                  value={user.clinic}
                  disabled="true"
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <br />
              <StyledButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Modal>
      <Footer />
    </Box>
  );
};

export default Accounts;
