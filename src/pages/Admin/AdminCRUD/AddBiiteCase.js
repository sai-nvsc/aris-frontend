import { StyledButton, StyledTextField } from "../../../assets/styles";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  Chip,
  Container,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AddCaseThunk } from "../../../redux/slices/BiteCaseSlice";
import DatePicker from "@mui/lab/DatePicker";
import { taguig_baarangay } from "../../../helpers/barangays";
const AddBiiteCase = () => {
  const { add_case_errors } = useSelector((state) => state.bitecase);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function refreshPage() {
    window.location.reload(false);
  }
  const [values, setvalues] = useState({
    user: "",
    exposure_category: "",
    date: moment().startOf("day").toDate(),
    place: "",
    type_of_exposure: "",
    route: "",
    source_of_exposure: "",
    bodypart: "",
    anti_tetanus: "",
    vaccine: "",
    status_of_vaccination: "",
    classification: "",
    animal_status: "",
    patient_status: "",
    clinic: "",
    search: "",
  });
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
    formData.append("history_of_exposure.bodypart", values.bodypart);
    formData.append("anti_tetanus", values.anti_tetanus);
    formData.append("vaccine", values.vaccine);
    formData.append("status_of_vaccination", values.status_of_vaccination);
    formData.append("classification", values.classification);
    formData.append("animal_status", values.animal_status);
    formData.append("patient_status", values.patient_status);
    formData.append("clinic", user.clinic);

    dispatch(AddCaseThunk({ data: formData }));
  };
  //Popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <StyledButton onClick={handleOpen} margin="10" startIcon={<AddIcon />}>
        Add Record
      </StyledButton>
      <StyledButton onClick={refreshPage}>⟳</StyledButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            p: 2,
            borderRadius: 5,
            boxShadow: 3,
            maxHeight: "100vh",
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h4"
              color="text.primary"
              marginBottom={2}
            >
              New Bite Case Record
            </Typography>

            <Grid container spacing={0.5}>
              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="user"
                  label="Patient(Scan ARIS QR Code)"
                  name="user"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors && add_case_errors.exposure_category
                      ? true
                      : false
                  }
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    onChange={handleChange}
                    name="exposure_category"
                    value={values.exposure_category}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                  {add_case_errors && add_case_errors.exposure_category ? (
                    <FormHelperText>
                      {add_case_errors.exposure_category}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
                {/* </Grid>

              <Grid item xs={6} sm={6} md={6}> */}
                <Typography
                  aria-owns={openPop ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  color="text.secondary"
                >
                  *Bite Categories?
                </Typography>

                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={openPop}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 1, display: "inline-block" }}>
                    {" "}
                    Cat. I - touching or feeding animals, animal licks on intact
                    skin (no exposure)
                  </Typography>
                  <Typography sx={{ p: 1, display: "inline-block" }}>
                    {" "}
                    Cat. II - nibbling of uncovered skin, minor scratches or
                    abrasions without bleeding (exposure), or licks on broken
                    skin
                  </Typography>
                  <Typography sx={{ p: 1, display: "inline-block" }}>
                    {" "}
                    Cat. III - single or multiple transdermal bites or
                    scratches, contamination of mucous membrane or broken skin
                    with saliva from animal licks, exposures due to direct
                    contact with bats (severe exposure)
                  </Typography>
                  <Typography
                    sx={{ p: 1, display: "inline-block", color: "red" }}
                  >
                    Categories II and III require treatment with immunoglobulin.
                    All animal bites in forest or in the wild should be treated
                    as Category III exposures.
                  </Typography>
                </Popover>
              </Grid>
              <br />
              <br />
              <Divider
                variant="middle"
                style={{ width: "100%", marginBottom: 5 }}
              >
                <Chip label="History of Exposure" color="primary"></Chip>
              </Divider>

              <Grid item xs={6} sm={6} md={6}>
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
                        date: newDate.startOf("day").toDate(),
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

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.place"]
                      ? true
                      : false
                  }
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
                  {add_case_errors &&
                  add_case_errors["history_of_exposure.place"] ? (
                    <FormHelperText>
                      {add_case_errors["history_of_exposure.place"]}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.type_of_exposure"]
                      ? true
                      : false
                  }
                >
                  <InputLabel>Exposure Type</InputLabel>
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
                  {add_case_errors &&
                  add_case_errors["history_of_exposure.type_of_exposure"] ? (
                    <FormHelperText>
                      {add_case_errors["history_of_exposure.type_of_exposure"]}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.source_of_exposure"]
                      ? true
                      : false
                  }
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
                  {add_case_errors &&
                  add_case_errors["history_of_exposure.source_of_exposure"] ? (
                    <FormHelperText>
                      {
                        add_case_errors[
                          "history_of_exposure.source_of_exposure"
                        ]
                      }
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="bodypart"
                  label="Site"
                  name="bodypart"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                  error={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.bodypart"]
                      ? true
                      : false
                  }
                  helperText={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.bodypart"]
                      ? add_case_errors["history_of_exposure.bodypart"]
                      : ""
                  }
                />
              </Grid>

              {/* <Divider><Chip variant="filled">PEP</Chip></Divider> */}
              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors &&
                    add_case_errors["history_of_exposure.route"]
                      ? true
                      : false
                  }
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
                  </Select>
                  {add_case_errors &&
                  add_case_errors["history_of_exposure.route"] ? (
                    <FormHelperText>
                      {add_case_errors["history_of_exposure.route"]}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  error={
                    add_case_errors && add_case_errors.anti_tetanus
                      ? true
                      : false
                  }
                >
                  <FormLabel>ERIG/HRIG Administered?</FormLabel>
                  <RadioGroup row name="anti_tetanus" onChange={handleChange}>
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
                  {add_case_errors && add_case_errors.anti_tetanus ? (
                    <FormHelperText>
                      Please Provide data on this field
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="vaccine"
                  label="Vaccine"
                  name="vaccine"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                  error={
                    add_case_errors && add_case_errors.vaccine ? true : false
                  }
                  helperText={
                    add_case_errors && add_case_errors.vaccine
                      ? add_case_errors.vaccine
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors && add_case_errors.status_of_vaccination
                      ? true
                      : false
                  }
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
                  {add_case_errors && add_case_errors.status_of_vaccination ? (
                    <FormHelperText>
                      {add_case_errors.status_of_vaccination}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  fullWidth
                  id="classification"
                  label="Classification"
                  name="classification"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  error={
                    add_case_errors && add_case_errors.animal_status
                      ? true
                      : false
                  }
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
                  {add_case_errors && add_case_errors.animal_status ? (
                    <FormHelperText>
                      {add_case_errors.animal_status}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Patient Status"
                  name="patient_status"
                  fullWidth
                  onChange={handleChange}
                  error={
                    add_case_errors && add_case_errors.patient_status
                      ? true
                      : false
                  }
                  helperText={
                    add_case_errors && add_case_errors.patient_status
                      ? add_case_errors.patient_status
                      : ""
                  }
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <StyledButton
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                Add
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default AddBiiteCase;
