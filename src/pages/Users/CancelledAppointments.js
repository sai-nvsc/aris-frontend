import { Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
const CancelledAppoinment = ({ cancelled }) => {
  return (
    <>
      <Grid container spacing={4}>
        {cancelled === "loading" ? (
          <Grid item sm={12}>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </Grid>
        ) : (
          cancelled.map((appointment) => (
            <Grid item sm={12} key={appointment._id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  backgroundColor: "white",
                }}
              >
                <Typography component="div" variant="h4" sx={{ margin: 2 }}>
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
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default CancelledAppoinment;
