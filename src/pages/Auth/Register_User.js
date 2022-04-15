import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import Footer from "../../components/Layouts/Footer";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import wave from "../../assets/wave.svg";
import { StyledButton, StyledTextField } from "../../assets/styles";
import { SignUpUserThunk } from "../../redux/slices/UserSlices";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { taguig_baarangay } from "../../helpers/barangays";
import { useNavigate } from "react-router-dom";
const RegisterUser = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "assets/images/default_avatar.jpg"
  );
  const { isAuthenticated, errors, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    first_name: "",
    last_name: "",
    birthday: new Date(),
    sex: "",
    address: "",
    username: "",
    email: "",
    password: "",
    c_password: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const formData = new FormData();
    formData.set("avatar", avatar);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("birthday", values.birthday);
    formData.append("sex", values.sex);
    formData.append("address", values.address);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone_number", values.phone_number);
    dispatch(SignUpUserThunk(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      role === "user" ? navigate("/user") : navigate("/admin");
    }
    return () => {};
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />

      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            backgroundImage: `url(${wave})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
          }}
          component="form"
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            SIGN UP
          </Typography>
          <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
          <StyledButton variant="contained" component="label">
            <input
              type="file"
              name="avatar"
              accept="images/*"
              onChange={onChange}
              hidden
            />
            Upload Avatar
          </StyledButton>
          <Divider sx={{ m: 2, width: "100%" }}>PERSONAL INFORMATION</Divider>
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
                autoFocus
                onChange={handleChange}
                error={errors ? true : false}
                helperText={errors ? errors.first_name : ""}
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
                size="small"
                onChange={handleChange}
                error={errors ? true : false}
                helperText={errors ? errors.last_name : ""}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <LocalizationProvider dateAdapter={DateAdapterMoment}>
                <DatePicker
                  disableFuture
                  label="Birthday"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={moment(values.birthday)}
                  name="birthday"
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
          </Grid>
          <Divider sx={{ m: 2, width: "100%" }}>ACCOUNT INFORMATION</Divider>
          <FormControl fullWidth>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Email Address"
                  required
                  name="email"
                  fullWidth
                  onChange={handleChange}
                  error={errors && errors.email ? true : false}
                  helperText={errors ? errors.email : ""}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Username"
                  required
                  name="username"
                  fullWidth
                  onChange={handleChange}
                  error={errors && errors.username ? true : false}
                  helperText={errors ? errors.username : ""}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Password"
                  type="password"
                  required
                  name="password"
                  fullWidth
                  onChange={handleChange}
                  error={errors && errors.password ? true : false}
                  helperText={errors ? errors.password : ""}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Cofirm Password"
                  type="password"
                  required
                  name="c_password"
                  fullWidth
                  onChange={handleChange}
                  error={errors && errors.password ? true : false}
                  helperText={errors ? errors.password : ""}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Phone Number"
                  type="text"
                  name="phone_number"
                  fullWidth
                  onChange={handleChange}
                  error={errors && errors.phone_number ? true : false}
                  helperText={errors ? errors.phone_number : ""}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox value="agree" color="primary" size="small" />
                  }
                  label="By Signing up, You agree on ARIS' Terms and Conditions"
                />
              </Grid>
            </Grid>
          </FormControl>
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
              onClick={handleSubmit}
            >
              Register
            </StyledButton>
          </Box>

          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an Account? Sign-in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default RegisterUser;
