import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { EditButton, StyledButton } from "../../../assets/styles";
import { EditCaseStatusThunk } from "../../../redux/slices/VaccineSlice";

const EditBiteStatus = ({ edit, id }) => {
  const dispatch = useDispatch();
  const params = useParams();

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [values, setvalues] = useState({
    status_of_vaccination: edit.status_of_vaccination,
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_of_vaccination", values.status_of_vaccination);
    dispatch(EditCaseStatusThunk({ data: formData, id: params.id }));
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <EditButton
        onClick={handleOpen}
        startIcon={<Edit style={{ color: "#ff8a80" }} />}
      ></EditButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        justifyContent="center"
        transform="translate(-50%, -50%)"
        top="50%"
        position="absolute"
      >
        <form encType="multipart/form-data" noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              alignItems: "center",
              p: 2,
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h4"
                color="text.primary"
                marginBottom={3}
              >
                Update Vaccination Status
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="status_of_vaccination"
                      onChange={handleChange}
                      name="status_of_vaccination"
                      value={values.status_of_vaccination}
                    >
                      <MenuItem value="On-going">On-going</MenuItem>
                      <MenuItem value="Cleared">Cleared</MenuItem>
                      <MenuItem value="Untracked">Untracked</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StyledButton type="submit" variant="contained">
                  Update
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  //sx={{ mt: 3, mb: 2 }}
                  onClick={handleClose}
                >
                  Cancel
                </StyledButton>
              </Box>
            </Container>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default EditBiteStatus;
