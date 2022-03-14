import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import moment from "moment";
import CreateAppointment from "./CRUD/CreateAppointment";
import { StyledButton } from "../../assets/styles";
import Cancellation from "../../components/Layouts/Dialogs/Cancellation";

const AppointmentsPending = ({ pending }) => {
  return (
    <>
      <Box
        component="main"
        sx={{ display: "flex", justifyContent: "end", m: 2 }}
      >
        <CreateAppointment />
      </Box>

      <Grid container spacing={4}>
        {pending === "loading" ? (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        ) : pending && pending.length > 0 ? (
          pending.map((appointment) => (
            <Grid item sm={12} key={appointment._id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              >
                <Typography sx={{ margin: 2 }} variant="h4">
                  {appointment.clinicId[0].name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ marginLeft: 2 }}
                >
                  Date: {moment(appointment.date).format("MMMM DD, YYYY")}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ marginLeft: 2 }}
                >
                  Time: {appointment.time_slot}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ marginLeft: 2 }}
                >
                  Purpose: {appointment.purpose}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ marginLeft: 2 }}
                >
                  Status: {appointment.status}
                </Typography>
                <Box
                  sx={{ justifyContent: "flex-end", display: "flex", m: 2 }}
                >
                  <Cancellation
                    name={appointment.clinicId[0].name}
                    date={moment(appointment.date).format("MMMM DD, YYYY")}
                    id={appointment._id}
                  />
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item sm={12}>
            <Typography>No Pending or Ongoing Appointment</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AppointmentsPending;
