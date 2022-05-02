import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { EditVaxxThunk } from "../../../redux/slices/VaccineSlice";
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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

const EditVaxx = ({ eVax }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [open, setOpen] = useState(false);

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
      <EditButton
        onClick={handleOpen}
        startIcon={<Edit style={{ color: "#ff8a80", fontSize: "large" }} />}
      ></EditButton>

    <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Edit Post Exposure Vaccination</DialogTitle>
        <DialogContent>
        <form encType="multipart/form-data" noValidate onSubmit={formHandler}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              alignItems: "center",
              p: 2,
             
            }}
          >
            <Container maxWidth="md">          

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
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  mt:3
                }}
              >
                <StyledButton type="submit" variant="contained">
                  Edit
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  onClick={handleClose}
                >
                  Cancel
                </StyledButton>
              </Box>
            </Container>
          </Box>
        </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditVaxx;
