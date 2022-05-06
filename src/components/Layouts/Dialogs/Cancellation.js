import { Cancel } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelAppointment } from "../../../redux/slices/AppointmentSlice";

const Cancellation = ({ id, name, collection, ...rest }) => {
  const [OpemModal, setOpemModal] = useState(false);
  const dispatch = useDispatch();

  const dialogOpen = () => {
    setOpemModal(true);
  };
  const handleClose = () => {
    setOpemModal(false);
  };

  const handleYes = () => {
    dispatch(cancelAppointment({ id: id }));
    setOpemModal(false);
  };

  return (
    <>
      <Button
        startIcon={<Cancel color="error" />}
        variant="outlined"
        color="error"
        onClick={dialogOpen}
        disabled={rest.status === "Ongoing"}
        sx={{ marginRight: 3 }}
      >
        Cancel
      </Button>
      <Dialog onClose={handleClose} open={OpemModal}>
        <DialogTitle>Delete {name} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your appointment to {name} on{" "}
            {rest.date}? This cannot be undone.
          </DialogContentText>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleYes}>Yes</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cancellation;
