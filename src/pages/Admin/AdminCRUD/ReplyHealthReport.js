import { ReplyThunk } from "../../../redux/slices/VaccineSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { StyledTextField } from "../../../assets/styles";

const ReplyHealthReport = ({ reports, id }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();

  console.log(reports);

  //Reply
  const [dialog, setValues] = useState({
    //bite_case: params.id,
    user: reports.user[0]._id,
    clinic: reports.clinic,
    type: reports.type,
    description: reports.description,
    text: reports.text,
    admin: user._id,
  });
  const onInputChange = (e) => {
    setValues({ ...dialog, [e.target.name]: e.target.value });
  };
  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    /*  formData.append("user", dialog.user); //
   formData.append("clinic", dialog.clinic); //
   formData.append("bitecase", params.id); //
   formData.append("type", dialog.type); // 
   formData.append("description", dialog.description); //*/
    formData.set("admin", user._id);
    formData.set("text", dialog.text);
    formData.set("report", reports._id);
    formData.set("id", id);
    dispatch(ReplyThunk(formData));

    setOpenn(false);
    setValues({
      user: reports.user[0]._id,
      clinic: reports.clinic,
      type: reports.type,
      description: reports.description,
      text: reports.text,
      admin: reports.admin,
    });
  };

  const dialogClose = () => {
    setOpenn(false);
    setValues({
      user: reports.user[0]._id,
      clinic: reports.clinic,
      type: reports.type,
      description: reports.description,
      text: reports.text,
      //admin: user._id,
    });
  };

  const [open, setOpenn] = React.useState(false);
  const dialogOpen = () => setOpenn(true);
  const handleClose = () => setOpenn(false);

  return (
    <>
      <Button
        sx={{
          color: "red",
        }}
        onClick={dialogOpen}
        disabled={reports.clinic !== user.clinic}
      >
        Reply
      </Button>

      <Dialog fullWidth open={open} onClose={dialogClose} maxWidth="lg">
        <DialogTitle>Reply to Health Report</DialogTitle>

        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <DialogContent>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="bitecase"
                  label="Bite Case"
                  name="bitecase"
                  size="small"
                  value={params.id}
                  readOnly
                />
              </Grid>

              <Grid item xs={12}>
                <Typography>Report Type: {dialog.type}</Typography>
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  multiline
                  rows={4}
                  label="Short Description"
                  size="small"
                  id="outlined-multiline-static"
                  fullWidth
                  name="desc"
                  value={dialog.description}
                  readOnly
                ></StyledTextField>
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  multiline
                  rows={4}
                  label="Reply"
                  size="small"
                  id="outlined-multiline-static"
                  fullWidth
                  name="text"
                  //value={dialog.text}
                  onChange={onInputChange}
                ></StyledTextField>
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  label="report id"
                  size="small"
                  fullWidth
                  name="text"
                  value={reports._id}
                  onChange={onInputChange}
                  readOnly
                ></StyledTextField>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reply
            </Button>
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ReplyHealthReport;
