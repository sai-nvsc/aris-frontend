import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";

import Footer from "../../components/Layouts/Footer";
import { StyledButton } from "../../assets/styles";
import {
  clearError,
  clearSuccess,
  LogoutUserThunk,
  ResendVerificationThunk,
} from "../../redux/slices/UserSlices";
import { useEffect } from "react";
const VerificationPage = () => {
  const { user, loading, isAuthenticated, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const onLogOutClick = () => {
    dispatch(LogoutUserThunk());
  };
  const onResend = () => {
    dispatch(ResendVerificationThunk());
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.assign("/login");
    }
    if (!loading && isAuthenticated && user) {
      if (user.verified_at === null) {
        dispatch(ResendVerificationThunk());
      }
    }
    return () => {};
  }, [dispatch, isAuthenticated]);

  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  return (
    <>
      {!loading &&
        isAuthenticated &&
        user.role !== "user" &&
        user.verified_at !== null &&
        window.location.assign("/login")}

      {!loading &&
        isAuthenticated &&
        user.role !== "user" &&
        user.verified_at === null &&
        window.location.assign("/login")}

      {!loading &&
        isAuthenticated &&
        user.role === "user" &&
        user.verified_at === null && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundColor: "#ff8a80",
            }}
          >
            <CssBaseline />

            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",

                  backgroundRepeat: "no-repeat",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 5,
                  boxShadow: 3,
                }}
              >
                {success && (
                  <Snackbar
                    open={true}
                    autoHideDuration={3000}
                    name="success"
                    onClose={onClose}
                  >
                    <Alert severity="success" variant="filled">
                      <AlertTitle>Success</AlertTitle>
                      {success}
                    </Alert>
                  </Snackbar>
                )}
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Verify your Email Address
                </Typography>

                <Typography>
                  To continue using ARIS and its services, the system requires
                  you to verify your account by clicking the link sent to your
                  email address <b>{user.email}</b>
                </Typography>
                <Typography component="span">
                  Didn't received code? Click Resend button.
                </Typography>

                <Grid container>
                  <Grid item xs>
                    <StyledButton variant="text" onClick={onLogOutClick}>
                      Logout
                    </StyledButton>
                  </Grid>
                  <Grid item xs>
                    <StyledButton variant="text" onClick={onResend}>
                      Resend Code
                    </StyledButton>
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Footer />
          </Box>
        )}
    </>
  );
};

export default VerificationPage;
