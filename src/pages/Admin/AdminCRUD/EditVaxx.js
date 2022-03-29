import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { EditVaxxThunk } from "../../../redux/slices/VaccineSlice";
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
import {
  StyledTextField,
  StyledButton,
  EditButton,
} from "../../../assets/styles";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const EditVaxx = ({eVax}) => {
const { user } = useSelector((state) => state.user);
const dispatch = useDispatch();
const params = useParams();
const [open, setOpen] = React.useState(false);

const [values, setvalues] = useState({
    bitecase: eVax.bitecase,
    date_injected: eVax.date_injected,
    day: eVax.day,
    vaccine: eVax.vaccine,
    lot: eVax.lot,
    remarks: eVax.remarks,
    });
const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
};
const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bitecase", params.id);
    formData.append("day", values.day);
    formData.append("vaccine", values.vaccine);
    formData.append("lot", values.lot);
    formData.append("remarks", values.remarks);
    formData.append("date_injected", values.date_injected);
    formData.append("clinic", user.clinic);
    formData.append("admin", user._id);
    dispatch(EditVaxxThunk({ data: formData, id: eVax._id }));
    //refreshPage();
setOpen(false);
};

const handleClose = () => {
setOpen(false);
setvalues({
    bitecase: eVax.bitecase,
    date_injected: eVax.date_injected,
    day: eVax.day,
    vaccine: eVax.vaccine,
    lot: eVax.lot,
    remarks: eVax.remarks,
});
};
const handleOpen = () => {
    setOpen(true);
  };

return (
<>
<EditButton onClick={handleOpen} startIcon={<Edit style={{ color: "#ff8a80", fontSize:"large" }} />}></EditButton>

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
          <Container maxWidth="lg">      
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={2}
            >
              Post Exposure Vaccination
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="bitecase"
                  label="Bite Case"
                  name="bitecase"
                  size="small"
                  value={params.id}
                  disabled="true"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    label="Date Injected"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={moment(values.date_injected)}
                    name="date_injected"
                    InputProps={{ readOnly: true }}
                    onChange={(newDate) =>
                      setvalues({
                        ...values,
                        date_injected: newDate.toDate().toISOString(),
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

              <Grid item xs={12} sm={12} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                >
                  <InputLabel>Day</InputLabel>
                  <Select
                    label="Day"
                    name="day"
                    id="day"
                    value={values.day}

                    onChange={handleChange}
                  >
                    <MenuItem value="D0">D0</MenuItem>
                    <MenuItem value="D03">D03</MenuItem>
                    <MenuItem value="D07">D07</MenuItem>
                    <MenuItem value="D14">D14</MenuItem>
                    <MenuItem value="D28/30">D28/30</MenuItem>

                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="vaccine"
                  label="Vaccine"
                  name="vaccine"
                  size="small"
                  value={values.vaccine}
                  onChange={handleChange}
                />
              </Grid>

            <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="lot"
                  label="Lot #"
                  name="lot"
                  size="small"
                  value={values.lot}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    fullWidth
                    id="remarks"
                    label="Remarks"
                    name="remarks"
                    size="small"
                    value={values.remarks}
                    onChange={handleChange}
                  />
                </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="clinic"
                  label="Clinic"
                  name="clinic"
                  size="small"
                  value={user.clinic}
                  disabled="true"
                />
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
              <StyledButton
                type="submit"
                variant="contained"
              >
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

export default EditVaxx;