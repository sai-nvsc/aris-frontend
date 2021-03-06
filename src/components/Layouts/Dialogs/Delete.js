import { DeleteForever } from "@mui/icons-material";
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
import { useNavigate } from "react-router-dom";
import {
  DeletePetThunk,
  DeletePetVaccineThunk,
} from "../../../redux/slices/PetSlice";

import { DeleteVaxxThunk } from "../../../redux/slices/VaccineSlice";
// import { deletePerson } from "../../redux/action/PersonActions";
// import { deleteShow } from "../../redux/action/ShowActions";

const Delete = ({ id, name, collection, ...rest }) => {
  const [OpemModal, setOpemModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dialogOpen = () => {
    setOpemModal(true);
  };
  const handleClose = () => {
    setOpemModal(false);
  };

  const handleYes = () => {
    switch (collection) {
      case "pets":
        dispatch(DeletePetThunk({ id: id }));
        navigate("/user/mypets");
        break;
      case "pet_vaccine":
        dispatch(DeletePetVaccineThunk({ id: id, data: rest.data }));
        break;
      case "vaxx":
        dispatch(DeleteVaxxThunk({ id: id }));
        navigate("/admin/bitecases");
        break;

      default:
        break;
    }
    setOpemModal(false);
  };
  return (
    <>
      <Button
        startIcon={<DeleteForever color="error" />}
        variant="outlined"
        color="error"
        onClick={dialogOpen}
      >
        Delete
      </Button>
      <Dialog onClose={handleClose} open={OpemModal}>
        <DialogTitle>Delete {name} ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete {name}? This cannot be
            undone.
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

export default Delete;
