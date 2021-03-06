import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { AcceptAptThunk } from "../../../redux/slices/AppointmentSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Confirm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    status: "Completed",
  });

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("status", values.status);
    dispatch(AcceptAptThunk({ data: formData, id: data._id }));

    setOpen(false);
    setvalues({
      status: "Completed",
    });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        //variant={"contained"}
        startIcon={<CheckCircleIcon />}
        disabled={data.status === "Completed" || data.status === "Cancelled"}
        sx={{
          display: "flex",
        }}
      ></Button>
      <Dialog fullWidth open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Appointment Details</DialogTitle>
        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item>
                <Typography>
                  Appointment Schedule of Mx. {data.user[0].last_name} on{" "}
                  {moment(data.date).format("MMMM DD, YYYY")} at{" "}
                  {data.time_slot} is {values.status}?
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Confirm
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
              Back
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Confirm;
