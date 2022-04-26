import { useEffect, useState } from "react";
import pawwave2 from "../../assets/pawwave2.svg";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import Footer from "../../components/Layouts/Footer";
import {
  LogButton,
  StyledTextField,
  StyledLink,
  BackBtn,
  LogLink,
} from "../../assets/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  LoginUserThunk,
} from "../../redux/slices/UserSlices";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const { loading, login_loading, isAuthenticated, errors, role, success } =
    useSelector((state) => state.user);

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
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    dispatch(LoginUserThunk(formData));
    //dispatch(LoginAdminThunk(formData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ff8a80",
      }}
    >
      <CssBaseline />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={login_loading}
      >
        <img src={require("../../assets/paw.gif")} alt="loading" />
      </Backdrop>
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
      <BackBtn component={StyledLink} to="/">
        Back to Homepage
      </BackBtn>
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            backgroundImage: `url(${pawwave2})`,
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", }}>
            LOG IN
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
                href="/login-admin"
              >
                Log In as Admin
              </LogButton>
            </form>
          </FormControl>

          <Grid container>
            <Grid item xs>
              <LogLink to="/forgot-password">Forgot password?</LogLink>
            </Grid>
            <Grid item>
              <LogLink to="/register">
                {"Don't have an account? Sign Up"}
              </LogLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export { LoginUser };

export default LoginUser;
