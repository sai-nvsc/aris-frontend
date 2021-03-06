import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import CreateAppointment from "./CRUD/CreateAppointment";
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
          <Grid item sm={12}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Grid>
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
                  {Array.isArray(appointment.clinicId)
                    ? appointment.clinicId[0].name
                    : null}
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
                <Box sx={{ justifyContent: "flex-end", display: "flex", m: 2 }}>
                  <Cancellation
                    name={
                      Array.isArray(appointment.clinicId)
                        ? appointment.clinicId[0].name
                        : null
                    }
                    date={moment(appointment.date).format("MMMM DD, YYYY")}
                    id={appointment._id}
                  />
                  <Button
                    href={`https://www.google.com/maps/search/?api=1&query=${appointment.clinicId[0].location.coordinates[1]},${appointment.clinicId[0].location.coordinates[0]}`}
                    target="_blank"
                  >
                    View in Map
                  </Button>
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
