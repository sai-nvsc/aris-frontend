import { Typography } from "@mui/material";
import React from "react";

const Copyright = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © Bachelor of Science in Information Technology - TUP Taguig " +
          new Date().getFullYear()}
      </Typography>
    </>
  );
};

export default Copyright;
