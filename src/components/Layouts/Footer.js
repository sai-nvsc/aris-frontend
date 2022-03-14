import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        backgroundColor: "#FFFFFF",
        mt: "auto",
        left: "0",
        bottom: "0",
        right: "0",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          Anti-Rabies Immunoinformatics System (A.R.I.S)
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
