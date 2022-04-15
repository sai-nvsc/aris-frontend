import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import { user_services } from "../../helpers/users_index_square_navs";
const UserIndex = () => {
  useEffect(() => {
    document.title = "A.R.I.S | User";

    return () => {};
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.paper",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="Home" />
      <Container component="main" sx={{ mt: 10, mb: 2 }} maxWidth="xl">
        <Grid container spacing={1}>
          {user_services.map((service) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={4} key={service.title}>
              <Button
                sx={{ height: 250, p: 0 }}
                fullWidth
                component={Link}
                to={service.path}
              >
                <Paper
                  elevation={12}
                  sx={{
                    backgroundColor: "white",
                    height: 240,
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {service.icon}
                  {service.title}
                  <Typography
                    sx={{
                      display: "inline",
                      fontSize: "16px",
                      alignItems: "center",
                    }}
                    component="span"
                    color="text.secondary"
                  >
                    {service.sub}
                  </Typography>
                </Paper>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default UserIndex;
