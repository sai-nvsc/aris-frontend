import {
  Box,
  Grid, 
  Skeleton, 
  Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cancellation from "../../components/Layouts/Dialogs/Cancellation";
import AcceptAppointment from "../Admin/AdminCRUD/AcceptAppointment"

const AptPending = ({ pending }) => {
  return (
    <>
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
                {<Typography variant="h4" sx={{ margin: 2 }}>
                  {appointment.user[0].first_name} {appointment.user[0].last_name}
                </Typography>}
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
                  component="div"
                  sx={{
                    justifyContent: "flex-end",
                    display: "flex",
                    //flexDirection:"row",
                    flexWrap: "wrap",
                    m: 2
                  }}
                >

                <AcceptAppointment accept={appointment} startIcon={<CheckCircleIcon/>}/>
             <div></div>
                <Cancellation
                  name={appointment.user[0].last_name}
                  date={moment(appointment.date).format("MMMM DD, YYYY")}
                  id={appointment._id} />
                </Box>
  
              </Box>
            </Grid>   
          ))
        ) : (
          <Grid item sm={12}>
            <Typography>No Pending or Ongoing Appointments</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AptPending;
