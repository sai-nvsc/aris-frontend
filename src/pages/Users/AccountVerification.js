import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledButton } from "../../assets/styles";
import Footer from "../../components/Layouts/Footer";
import {
  LogoutUserThunk,
  VerificationThunk,
} from "../../redux/slices/UserSlices";

const AccountVerification = () => {
  const { loading, verification_loading, success, errors, user, role } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (!loading && role === "admin") {
      window.location.assign("/login");
    }

    dispatch(VerificationThunk({ verificationToken: params.token }));

    return () => {};
  }, [dispatch, loading, params.token, role]);
  const onLogInClick = () => {
    if (user) {
      dispatch(LogoutUserThunk());
    }
    window.location.assign("/login");
  };
  return (
    <div>
      {!loading && (
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
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {verification_loading
                  ? " Verifying your Account"
                  : success
                  ? success
                  : "Account Verification Failed"}
              </Typography>

              <Typography>
                {verification_loading
                  ? "Please Wait while the system verifies your account..."
                  : success
                  ? `Welcome to A.R.I.S, ${user.username}`
                  : errors}
              </Typography>
              {verification_loading && <CircularProgress color="primary" />}
              <Grid container>
                {!verification_loading && (
                  <Grid item xs>
                    <StyledButton variant="text" onClick={onLogInClick}>
                      Login
                    </StyledButton>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Container>
          <Footer />
        </Box>
      )}
    </div>
  );
};

export default AccountVerification;
