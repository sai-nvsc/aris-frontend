import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyledTextField } from "../../../assets/styles";
import { DeleteClinic } from "../../../redux/slices/Clinic";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Delete = ({ id, name, body }) => {
  const [OpenModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const dialogOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickShowPassword = () => {
    setvalues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setvalues] = useState({ password: "" });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleYes = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", values.password);
    dispatch(DeleteClinic({ data: formData, id: id }));
  };

  return (
    <>
      <Button
        startIcon={<DeleteForever color="error" />}
        color="error"
        onClick={dialogOpen}
      ></Button>
      <Dialog onClose={handleClose} open={OpenModal}>
        <DialogTitle>Delete {name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete {name}? This cannot be
            undone.
            <br />
            Confirm password before deleting:
          </DialogContentText>

          <FormControl fullWidth>
            <StyledTextField
              required
              fullWidth
              onChange={handleChange}
              size="small"
              id="password"
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              endadornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></StyledTextField>
          </FormControl>

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
