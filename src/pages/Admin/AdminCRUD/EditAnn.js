import React, { useState } from "react";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  StyledTextField,
  StyledButton,
  EditButton,
} from "../../../assets/styles";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { EditAnnThunk } from "../../../redux/slices/AnnouncementSlice";

const EditAnn = ({ annEdit }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const [values, setvalues] = useState({
    title: annEdit.title,
    desc: annEdit.desc,
    date: new Date(),
  });

  const onInputChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("date", values.date);
    formData.append("clinic", user.clinic);

    dispatch(EditAnnThunk({ data: formData, id: annEdit._id }));

    setOpen(false);
    setvalues({
      title: annEdit.title,
      desc: annEdit.desc,
      date: new Date(),
    });
  };

  const handleClose = () => {
    setOpen(false);
    setvalues({
      title: annEdit.title,
      desc: annEdit.desc,
      date: new Date(),
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
<>
    <EditButton onClick={handleOpen} startIcon={<Edit />}>
      </EditButton>

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
        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
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
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h4"
                color="text.primary"
                marginBottom={3}
              >
                Edit Announcement
              </Typography>

              <Grid container spacing={3}>
                <Grid item sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    size="small"
                    value={values.title}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item sm={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    id="desc"
                    label="Description"
                    name="desc"
                    multiline
                    maxRows={10}
                    size="small"
                    value={values.desc}
                    onChange={onInputChange}
                  />
                </Grid>

                <Grid item sm={12} md={6}>
                  <LocalizationProvider dateAdapter={DateAdapterMoment}>
                    <DatePicker
                      readOnly
                      label="Date"
                      openTo="year"
                      views={["year", "month", "day"]}
                      //value={moment(values.date)}
                      name="exp_date"
                      InputProps={{ readOnly: true }}
                      onChange={(newDate) =>
                        setvalues({
                          ...values,
                          date: newDate.toDate().toISOString(),
                        })
                      }
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          fullWidth
                          required
                          size="small"
                        />
                      )}
                    />
                  </LocalizationProvider>
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
                  Edit
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

export default EditAnn;
