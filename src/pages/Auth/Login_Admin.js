import { useEffect, useState } from "react";
import pawwave2 from "../../assets/pawwave2.svg";
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import Footer from "../../components/Layouts/Footer";
import { LogButton, StyledTextField, StyledLink, BackBtn } from "../../assets/styles";
import { useDispatch, useSelector } from "react-redux";

import {
  clearError,
  clearSuccess,
  LoginAdminThunk,
} from "../../redux/slices/UserSlices";

import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const { loading, isAuthenticated, errors, role, success } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      role === "user" ? navigate("/user") : navigate("/admin");
    }
    return () => {};
  }, [isAuthenticated, role, navigate]);
  const onChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const onClose = () => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    dispatch(LoginAdminThunk(formData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#ff8a80",
      }}
    >
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
            <AlertTitle>Error Login</AlertTitle>
            {errors}
          </Alert>
        </Snackbar>
      )}
<BackBtn component={StyledLink} to="/">Back to Homepage</BackBtn>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            //backgroundColor: "white",
            backgroundImage: `url(${pawwave2})`,
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            ADMIN LOG IN
          </Typography>

          <FormControl fullWidth>
            <form onSubmit={onSubmit}>
              <StyledTextField
                margin="normal"
                size="small"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onChange}
                autoComplete="email"
                autoFocus
              />
              <StyledTextField
                margin="normal"
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                onChange={onChange}
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />
              <LogButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                Log In
              </LogButton>
              <Divider sx={{ m: 2 }}>or</Divider>
              <LogButton
                type="submit"
                fullWidth
                variant="contained"
                href="/login"
              >
                Log In as User
              </LogButton>
            </form>
          </FormControl>

          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LoginAdmin;
