import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { StyledTextField, StyledButton } from "../../assets/styles";
import { Edit } from "@mui/icons-material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EditAdmin from "./EditAdmin";
import AdminDelete from "../../components/Layouts/Dialogs/AdminDelete";
import PersistentDrawerLeft from "../../components/Layouts/SuperSidebar";
import Footer from "../../components/Layouts/Footer";
import {
    CreateAdminThunk,
    clearError,
    clearSuccess,
    GetAllAdmin,
  } from "../../redux/slices/AdminSlices";

const SuperAdmin = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, admin, errors, success } = useSelector(
    (state) => state.admin
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
      field: "admin_name",
      headerName: "Admin Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 110,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 120,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 85,
    },
     {
      field: "Edit",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      renderCell: (cellValues) => {
        return (
          <>
            <EditAdmin
              id={admin.id}
              data={cellValues.row}
              startIcon={<Edit style={{ color: "#ff8a80" }} />}
            />
            <AdminDelete
              id={cellValues.row._id}
              name={admin.admin_name}
              collection="admins"
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

  const [values, setvalues] = useState({
    admin_name: "",
    role: "admin",
    clinic: "",
    email: "",
    username: "",
    password: "ARIS1234!",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("admin_name", values.admin_name);
    formData.append("role", values.role);
    formData.append("clinic", values.clinic);
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    dispatch(CreateAdminThunk(formData));
    refreshPage();
  };

   useEffect(() => {
    dispatch(GetAllAdmin());
    return () => {};
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",
      }}
    >
      <PersistentDrawerLeft title="Accounts" />
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
              Admins
            </Typography>
          </Grid>

          <Grid item>
            <StyledButton
              onClick={handleOpen}
              margin="10"
              startIcon={<GroupAddIcon />}
            >
              Add Admin
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
              {!loading && admin && (
                <DataGrid
                  rows={admin}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  {...admin}
                />
              )}
            </div>
          </Box>
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
              Add Admin
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

             {/*  <Grid item xs={12} sm={12} md={6}>
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
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="clinic"
                  label="Clinic"
                  name="clinic"
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
                  defaultValue={"Admin_"}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  disabled={true}
                  inputProps={{readOnly: true}}
                  id="password"
                  label="Password"
                  name="password"
                  size="small"
                  defaultValue={"Default password set to: ARIS1234!"}
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

export default SuperAdmin;
