import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
const AppointmentsCompleted = ({ completed }) => {
  return (
    <>
      <Grid container spacing={4}>
        {completed === "loading" ? (
          <Skeleton animation="wave" />
        ) : (
          completed.map((appointment) => (
            <Grid item sm={12} key={appointment._id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              >
                <Typography variant="h4" sx={{ margin: 2 }}>
                  {appointment.user[0].first_name}{" "}
                  {appointment.user[0].last_name}
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
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default AppointmentsCompleted;
