import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Divider,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  StyledTextField,
  EditButton,
  StyledButton,
} from "../../../assets/styles";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { taguig_baarangay } from "../../../helpers/barangays";
import moment from "moment";
import { EditCaseThunk } from "../../../redux/slices/BiteCaseSlice";

const EditBiteCase = ({ data, id }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [values, setvalues] = useState({
    user: data.user[0]._id,
    exposure_category: data.exposure_category,
    date: data.history_of_exposure.date,
    place: data.history_of_exposure.place,
    type_of_exposure: data.history_of_exposure.type_of_exposure,
    route: data.history_of_exposure.route,
    source_of_exposure: data.history_of_exposure.source_of_exposure,
    bodypart: data.history_of_exposure.bodypart,
    anti_tetanus: data.anti_tetanus,
    vaccine: data.vaccine,
    status_of_vaccination: data.status_of_vaccination,
    classification: data.classification,
    clinic: user.clinic,
    animal_status: data.animal_status,
    patient_status: data.patient_status,
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("user", values.user);
    formData.append("exposure_category", values.exposure_category);
    formData.append("history_of_exposure.date", values.date);
    formData.append("history_of_exposure.place", values.place);
    formData.append(
      "history_of_exposure.type_of_exposure",
      values.type_of_exposure
    );
    formData.append("history_of_exposure.route", values.route);
    formData.append(
      "history_of_exposure.source_of_exposure",
      values.source_of_exposure
    );
    formData.append("anti_tetanus", values.anti_tetanus);
    formData.append("vaccine", values.vaccine);
    formData.append("status_of_vaccination", values.status_of_vaccination);
    formData.append("classification", values.classification);
    formData.append("clinic", user.clinic);
    formData.append("animal_status", values.animal_status);
    formData.append("patient_status", values.patient_status);
    dispatch(EditCaseThunk({ data: formData, id: data._id }));
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <EditButton onClick={handleOpen} startIcon={<Edit />}></EditButton>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle>Edit Exposure Case</DialogTitle>
        <DialogContent>
          <form
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
                p: 2,
              }}
            >
              <Container maxWidth="lg">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <StyledTextField
                      required
                      fullWidth
                      id="user"
                      label="Patient"
                      name="user"
                      size="small"
                      //autoComplete="user"
                      autoFocus
                      disabled
                      onChange={handleChange}
                      value={values.user}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Category</InputLabel>
                      <Select
                        label="Sex"
                        onChange={handleChange}
                        name="exposure_category"
                        value={values.exposure_category}
                      >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <br />
                  <br />
                  <br />
                  <Divider variant="middle" style={{ width: "100%" }}>
                    <Chip label="History of Exposure" color="primary"></Chip>
                  </Divider>

                  <Grid item xs={12} sm={6} md={6}>
                    <LocalizationProvider dateAdapter={DateAdapterMoment}>
                      <DatePicker
                        disableFuture
                        label="Date of Exposure"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={moment(values.date)}
                        name="date"
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

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Barangay</InputLabel>
                      <Select
                        label="Barangay"
                        onChange={handleChange}
                        name="place"
                        value={values.place}
                      >
                        {taguig_baarangay.map((barangay) => (
                          <MenuItem value={barangay} key={barangay}>
                            {barangay}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Type</InputLabel>
                      <Select
                        label="type_of_exposure"
                        onChange={handleChange}
                        name="type_of_exposure"
                        value={values.type_of_exposure}
                      >
                        <MenuItem value="Bite">Bite</MenuItem>
                        <MenuItem value="Saliva">Saliva</MenuItem>
                        <MenuItem value="Scratch">Scratch</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <StyledTextField
                      required
                      fullWidth
                      id="bodypart"
                      label="Body Part Affected"
                      name="bodypart"
                      size="small"
                      autoFocus
                      onChange={handleChange}
                      value={values.bodypart}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Route</InputLabel>
                      <Select
                        label="Route"
                        onChange={handleChange}
                        name="route"
                        value={values.route}
                      >
                        <MenuItem value="IM">IM</MenuItem>
                        <MenuItem value="ID">ID</MenuItem>
                        <MenuItem value="NA">Not Applicable</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Source</InputLabel>
                      <Select
                        label="Source"
                        onChange={handleChange}
                        name="source_of_exposure"
                        value={values.source_of_exposure}
                      >
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl>
                      <FormLabel>ERIG/HRIG Administered?</FormLabel>
                      <RadioGroup
                        row
                        name="anti_tetanus"
                        onChange={handleChange}
                        value={values.anti_tetanus}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <StyledTextField
                      required
                      fullWidth
                      id="vaccine"
                      aria-readonly
                      label="Vaccine"
                      name="vaccine"
                      size="small"
                      autoFocus
                      disabled
                      onChange={handleChange}
                      value={values.vaccine}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Vaccination Status</InputLabel>
                      <Select
                        label="Source"
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

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Classification</InputLabel>
                      <Select
                        label="Patient Classification"
                        onChange={handleChange}
                        name="classification"
                        value={values.classification}
                      >
                        <MenuItem value="Healthy">Healthy</MenuItem>
                        <MenuItem value="Non-Traceable">Non-Traceable</MenuItem>
                        <MenuItem value="Rabies Suspect">
                          Rabies Suspect
                        </MenuItem>
                        <MenuItem value="Rabies Probable">
                          Rabies Probable
                        </MenuItem>
                        <MenuItem value="Rabies Confirmed">
                          Rabies Confirmed
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl
                      required
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                    >
                      <InputLabel>Animal Status</InputLabel>
                      <Select
                        label="Animal Status"
                        onChange={handleChange}
                        name="animal_status"
                        value={values.animal_status}
                      >
                        <MenuItem value="Dead">Dead</MenuItem>
                        <MenuItem value="Alive">Alive</MenuItem>
                        <MenuItem value="Killed">Killed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <StyledTextField
                      required
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="Patient Status"
                      name="patient_status"
                      fullWidth
                      onChange={handleChange}
                      value={values.patient_status}
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
                    mt: 3,
                  }}
                >
                  <StyledButton type="submit" variant="contained">
                    Edit
                  </StyledButton>
                  <StyledButton variant="outlined" onClick={handleClose}>
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

export default EditBiteCase;
