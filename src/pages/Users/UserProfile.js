import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  CardHeader,
  Grid,
  Select,
  InputLabel,
  Divider,
  MenuItem,
  FormControl,
  Avatar,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  FormHelperText,
  LinearProgress,
} from "@mui/material";

import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import Footer from "../../components/Layouts/Footer";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import {
  StyledButton,
  StyledTextField,
  PetProfileLabel,
  PetProfileValue,
  Subheader,
  ProfileHeading,
  ProfileCard,
} from "../../assets/styles";
import { taguig_baarangay } from "../../helpers/barangays";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  UpdateAvatarThunk,
  UpdatePasswordThunk,
  UpdateProfileThunk,
} from "../../redux/slices/UserSlices";

export const UserProfile = () => {
  const {
    user,
    loading,
    errors,
    success,
    update_profile_loading,
    update_password_loading,
    avatar_loading,
  } = useSelector((state) => state.user);
  const [passwordmatcherror, setpasswordmatcherror] = useState(false);

  const dispatch = useDispatch();
  const [values, setvalues] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    birthday: new Date(user.birthday),
    sex: user.sex,
    address: user.address,
    username: user.username,
    email: user.email,
    password: "",
    password_2: "",
    current_password: "",
    phone_number: user.phone_number,
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const UpdateProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("birthday", values.birthday);
    formData.append("sex", values.sex);
    formData.append("address", values.address);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    dispatch(UpdateProfileThunk({ data: formData, id: user._id }));
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
    if (!passwordmatcherror && !update_password_loading) {
      setvalues({
        ...values,
        password: "",
        password_2: "",
        current_password: "",
      });
    }
  };

  const UpdateAvatar = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const formData = new FormData();

    reader.onload = () => {
      if (reader.readyState === 2) {
        formData.append("avatar", reader.result);
        dispatch(UpdateAvatarThunk({ id: user._id, data: formData }));
      }
    };

    reader.readAsDataURL(e.target.files[0]);
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
        minHeight: "100vh",
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

      <Grid item xs={12} sm={12} md={12}>
        <Container component="main" sx={{ mt: 12, mb: 2 }}>
          {!loading && (
            <ProfileCard>
              {avatar_loading && <LinearProgress color="primary" />}
              <CardContent>
                <Avatar
                  sx={{
                    margin: "auto",
                    height: "180px",
                    width: "180px",
                    size: 200,
                    gap: 3,
                    thickness: 3,
                    gapColor: "#f4f7fa",
                    color:
                      "linear-gradient(to bottom right, #feac5e, #c779d0, #4bc0c8)",
                  }}
                  src={user.avatar.url}
                />
                <StyledButton variant="contained" component="label">
                  <input
                    type="file"
                    name="avatar"
                    accept="images/*"
                    onChange={UpdateAvatar}
                    hidden
                  />
                  Choose New Profile Picture
                </StyledButton>

                <ProfileHeading>
                  {user.first_name + " " + user.last_name}
                </ProfileHeading>
                <Subheader>{user.username}</Subheader>
                <Subheader>{user.phone_number}</Subheader>
                <Subheader>Barangay {user.address}</Subheader>
              </CardContent>
              <Divider light />
              <Box
                component="img"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user._id}`}
                alt="ARIS QR CODE"
              />
              <Box display={"flex"} justifyContent="center">
                <Box
                  p={2}
                  flex={"auto"}
                  borderColor={"rgba(0, 0, 0, 0.08)"}
                  height={"50%"}
                  alignItems="center"
                >
                  <PetProfileLabel>Bite Cases</PetProfileLabel>
                  <PetProfileValue>1</PetProfileValue>
                  <PetProfileLabel>Reports</PetProfileLabel>
                  <PetProfileValue>1</PetProfileValue>
                </Box>
              </Box>
            </ProfileCard>
          )}
        </Container>
      </Grid>

      <Divider light />

      <Grid item xs={12} sm={12} md={12}>
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          <ProfileCard>
            <CardContent>
              {update_profile_loading && <LinearProgress color="primary" />}

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
                      id="f_name"
                      label="First Name"
                      name="first_name"
                      size="small"
                      autoComplete="f_name"
                      value={values.first_name}
                      error={errors && errors.first_name ? true : false}
                      helperText={errors ? errors.first_name : ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <StyledTextField
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="l_name"
                      value={values.last_name}
                      size="small"
                      error={errors && errors.last_name ? true : false}
                      helperText={errors ? errors.last_name : ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={DateAdapterMoment}>
                      <DatePicker
                        disableFuture
                        label="Birthday"
                        openTo="year"
                        views={["year", "month", "day"]}
                        name="birthday"
                        value={moment(values.birthday)}
                        InputProps={{ readOnly: true }}
                        onChange={(newDate) =>
                          setvalues({
                            ...values,
                            birthday: newDate.toDate().toISOString(),
                          })
                        }
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            fullWidth
                            required
                            size="small"
                            error={errors && errors.birthday ? true : false}
                            helperText={
                              errors && errors.birthday ? errors.birthday : ""
                            }
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      error={errors && errors.address ? true : false}
                    >
                      <InputLabel>Barangay</InputLabel>
                      <Select
                        label="Barangay"
                        onChange={handleChange}
                        name="address"
                        value={values.address}
                      >
                        {taguig_baarangay.map((barangay) => (
                          <MenuItem value={barangay} key={barangay}>
                            {barangay}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors && errors.address ? (
                        <FormHelperText>{errors.address}</FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
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
                  <Grid item sm={12} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      error={errors && errors.sex ? true : false}
                    >
                      <InputLabel>Sex</InputLabel>
                      <Select
                        label="Sex"
                        onChange={handleChange}
                        name="sex"
                        value={values.sex}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                      {errors && errors.sex ? (
                        <FormHelperText>{errors.sex}</FormHelperText>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <StyledTextField
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="Phone Number"
                      type="text"
                      name="phone_number"
                      value={values.phone_number}
                      fullWidth
                      error={errors && errors.phone_number ? true : false}
                      helperText={errors ? errors.phone_number : ""}
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
          </ProfileCard>
        </Container>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Container component="main" sx={{ mt: 8, mb: 2 }}>
          <Card>
            {update_password_loading && <LinearProgress color="primary" />}
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
          </Card>
        </Container>
      </Grid>
      <Footer />
    </Box>
  );
};

export default UserProfile;
