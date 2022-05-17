import { useState } from "react";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Container,
  Dialog,
  Grid,
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
import moment from "moment";

const EditAnn = ({ annEdit }) => {
  const { user } = useSelector((state) => state.user);
  const { input_errors } = useSelector((state) => state.announcement);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [values, setvalues] = useState({
    title: annEdit.title,
    desc: annEdit.desc,
    date: moment().startOf("day").toDate().toISOString(),
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
    // setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setvalues({
      title: annEdit.title,
      desc: annEdit.desc,
      date: moment().startOf("day").toDate().toISOString(),
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <EditButton onClick={handleOpen} startIcon={<Edit />}></EditButton>

      <Dialog open={open} onClose={handleClose}>
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
                    error={input_errors && input_errors.title ? true : false}
                    helperText={
                      input_errors && input_errors.title
                        ? input_errors.title
                        : ""
                    }
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
                    error={input_errors && input_errors.desc ? true : false}
                    helperText={
                      input_errors && input_errors.desc ? input_errors.desc : ""
                    }
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
                          date: newDate.startOf("day").toDate().toISOString(),
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
      </Dialog>
    </>
  );
};

export default EditAnn;
