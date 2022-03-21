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
import { DeletePetVaccineThunk } from "../../../redux/slices/PetSlice";
import { DeleteInvThunk } from "../../../redux/slices/InventorySlice";
import { DeleteCaseThunk } from "../../../redux/slices/BiteCaseSlice";
import { DeleteAccThunk } from "../../../redux/slices/AdminSlices";
import { DeleteAnnThunk } from "../../../redux/slices/AnnouncementSlice";
import { DeleteVaxxThunk } from "../../../redux/slices/VaccineSlice";
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
      case "inventory":
        dispatch(DeleteInvThunk({ id: id }));
        navigate("/admin/inventory");
        break;
      case "bitecases":
        dispatch(DeleteCaseThunk({ id: id }));
        navigate("/admin/bitecases");
        break;
      case "admins":
        dispatch(DeleteAccThunk({ id: id }));
        navigate("/admin/auth");
        break;
      case "pet_vaccine":
        dispatch(DeletePetVaccineThunk({ id: id, data: rest.data }));
        break;
      case "announcements":
        dispatch(DeleteAnnThunk({ id: id }));
        navigate("/admin/announcements");
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
        color="error"
        onClick={dialogOpen}
      ></Button>
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
