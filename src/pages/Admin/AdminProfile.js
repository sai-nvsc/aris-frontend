import React, { useEffect, useState } from "react";
import {
  Box,
  CardContent,
  Container,
  CssBaseline,
  CardHeader,
  Grid,
  FormControl,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  LinearProgress,
} from "@mui/material";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Footer from "../../components/Layouts/Footer";
import {
  StyledButton,
  StyledTextField,
  Subheader,
  AdminHeading,
  AdminProfileCard,
} from "../../assets/styles";
import { useDispatch, useSelector } from "react-redux";
import { EditAccountThunk, clearError, clearSuccess, UpdatePasswordThunk, } from "../../redux/slices/AdminSlices";

export const AdminProfile = () => {
  const {
    user
  } = useSelector((state) => state.user);

  const { loading, errors, success } = useSelector(
    (state) => state.admin
  );
  const [passwordmatcherror, setpasswordmatcherror] = useState(false);

  const dispatch = useDispatch();
  const [values, setvalues] = useState({
    admin_name: user.admin_name,
    username: user.username,
    email: user.email,
    password: "",
    password_2: "",
    current_password: "",
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const UpdateProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("admin_name", values.admin_name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    dispatch(EditAccountThunk({ data: formData, id: user._id }));
  };
  const UpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (values.password_2 !== values.password) {
      return setpasswordmatcherror(true);
    }
    formData.append("current_password", values.current_password);
    formData.append("new_password", values.password);
    dispatch(UpdatePasswordThunk({ data: formData, id: user._id }));
    if (!passwordmatcherror && !loading) {
      setvalues({
        ...values,
        password: "",
        password_2: "",
        current_password: "",
      });
    }
  };

  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
    setpasswordmatcherror(false);
  };

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper"
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="My Profile" />
      <Snackbar
        open={passwordmatcherror}
        autoHideDuration={3000}
        onClose={onClose}
        name="error"
      >
        <Alert severity="error" variant="filled">
          <AlertTitle>Error</AlertTitle>
          Passwords do not match
        </Alert>
      </Snackbar>

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

      {errors && typeof errors === "string" && (
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

      <Grid item xs={12} sm={12} md={12} >
        <Container component="main" sx={{ mt: 12, mb: 2 }} >
          {!loading && user && (
            <AdminProfileCard >
              <CardContent>
                <AdminHeading>
                  {user.admin_name}
                </AdminHeading>
                <Subheader>{user.role}</Subheader>
                <Subheader>{user.email}</Subheader>
              </CardContent>                           
            </AdminProfileCard>
          )}
        </Container>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Container component="main" sx={{ mt: 4 }}>
          <AdminProfileCard>
            <CardContent>
              {loading && <LinearProgress color="primary" />}
              <CardHeader />
              <Typography variant="h5" marginBottom={3}>
                Edit Your Profile Here
              </Typography>
              {!loading && (
                <Grid container spacing={3}>
                  <Grid item sm={12} md={6}>
                    <StyledTextField
                      required
                      fullWidth
                      id="name"
                      label="Admin Name"
                      name="admin_name"
                      size="small"
                      value={values.admin_name}
                        onChange={handleChange}
                    />
                  </Grid>
                  
                  <Grid item sm={12} md={6}>
                    <StyledTextField
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="Email Address"
                      required
                      name="email"
                      value={values.email}
                      error={errors && errors.email ? true : false}
                      helperText={errors ? errors.email : ""}
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <StyledTextField
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="Username"
                      required
                      name="username"
                      value={values.username}
                      error={errors && errors.username ? true : false}
                      helperText={errors ? errors.username : ""}
                      fullWidth
                      onChange={handleChange}
                    />
                  </Grid>
                  
                </Grid>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  alignItems: "center",
                  mt:3
                }}
              >
                <StyledButton
                  type="submit"
                  variant="contained"
                  onClick={UpdateProfileSubmit}
                >
                  SAVE CHANGES
                </StyledButton>
              </Box>
            </CardContent>
          </AdminProfileCard>
        </Container>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          <AdminProfileCard>
            {loading && <LinearProgress color="primary" />}
            <CardContent>
              <CardHeader />
              <Typography variant="h5" marginBottom={3}>
                Update your password
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                component="form"
              >
                <FormControl fullWidth>
                  <StyledTextField
                    margin="normal"
                    size="small"
                    fullWidth
                    type="password"
                    value={values.current_password}
                    onChange={handleChange}
                    id="current_pass"
                    label="Current Password"
                    name="current_password"
                    autoComplete="current_password"
                  />
                  <StyledTextField
                    margin="normal"
                    size="small"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    label="New Password"
                    name="password"
                    autoComplete="password"
                  />
                  <StyledTextField
                    margin="normal"
                    size="small"
                    type="password"
                    fullWidth
                    value={values.password_2}
                    onChange={handleChange}
                    id="confirm_pass"
                    label="Confirm Password"
                    name="password_2"
                    autoComplete="password_2"
                  />
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <StyledButton
                  type="submit"
                  variant="contained"
                  onClick={UpdatePasswordSubmit}
                >
                  SAVE CHANGES
                </StyledButton>
              </Box>
            </CardContent>
          </AdminProfileCard>
        </Container>
      </Grid>
      <Footer />
    </Box>
  );
};

export default AdminProfile;
