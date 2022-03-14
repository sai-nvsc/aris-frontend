import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
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
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="Home" />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Grid container spacing={1}>
          {user_services.map((service) => (
            <Grid item sm={12} md={4} key={service.title}>
              <Button
                sx={{ height: 200, p: 0 }}
                fullWidth
                component={Link}
                to={service.path}
              >
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "white",
                    height: 200,
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {service.icon}
                  {service.title}
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
