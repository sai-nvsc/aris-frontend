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
  Snackbar,
  Typography,
} from "@mui/material";
import Footer from "../../components/Layouts/Footer";
import { StyledButton, StyledTextField } from "../../assets/styles";
import { useDispatch, useSelector } from "react-redux";
import { clearError, ResetPasswordThunk } from "../../redux/slices/UserSlices";

import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordUser = () => {
  const { loading, errors, success } = useSelector((state) => state.user);
  const params = useParams();
  const [password_error, setpassword_error] = useState("");
  const [values, setvalues] = useState({
    password: "",
    c_password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/login", { state: { message: success } });
    }
    return () => {};
  }, [navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.password !== values.c_password) {
      setvalues({ ...values, password: "", c_password: "" });
      setTimeout(() => {
        setpassword_error("");
      }, 5000);
      return setpassword_error("Passwords don't match");
    }
    console.log(values);
    const formData = new FormData();
    formData.append("password", values.password);
    dispatch(
      ResetPasswordThunk({ resetToken: params.resetToken, data: formData })
    );
  };
  const onClose = (e) => {
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

      <Container component="main" sx={{ mt: 14, mb: 2 }} maxWidth="sm">
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
              Reset Password
            </Typography>

            <FormControl fullWidth>
              <StyledTextField
                margin="normal"
                size="small"
                fullWidth
                label="New Password"
                name="password"
                type="password"
                autoFocus
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
              <StyledTextField
                margin="normal"
                size="small"
                required
                fullWidth
                name="c_password"
                type="password"
                label="Confirm New Password"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />

              <StyledButton
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={submitHandler}
              >
                Reset Password
              </StyledButton>
            </FormControl>

            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ResetPasswordUser;
