import React, { useEffect, useState } from "react";
import wave from "../../assets/wave.svg";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import Footer from "../../components/Layouts/Footer";
import { StyledButton, StyledTextField } from "../../assets/styles";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  clearError,
  clearSuccess,
  ForgotPasswordThunk,
} from "../../redux/slices/UserSlices";

const ForgotPasswordUser = () => {
  const { user, loading, isAuthenticated, success, errors } = useSelector(
    (state) => state.user
  );
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      user.role === "user" ? navigate("/user") : navigate("/admin");
    }
    return () => {};
  });

  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(ForgotPasswordThunk(formData));
  };
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
            <AlertTitle>Error</AlertTitle>
            {errors}
          </Alert>
        </Snackbar>
      )}
      <Container component="main" sx={{ mt: 14, mb: 2 }} maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              backgroundImage: `url(${wave})`,
              backgroundRepeat: "no-repeat",
              alignItems: "center",
              p: 2,
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Forgot Password
            </Typography>
            <Typography sx={{ mt: 4 }}>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </Typography>
            <FormControl fullWidth>
              <StyledTextField
                margin="normal"
                size="small"
                fullWidth
                value={email}
                label="Username or Email"
                autoFocus
                onChange={(e) => setemail(e.target.value)}
              />

              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={submitHandler}
              >
                Reset Password
              </StyledButton>
            </FormControl>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Remember your password?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ForgotPasswordUser;
