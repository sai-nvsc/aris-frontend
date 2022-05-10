import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../../components/Layouts/AdminSidebar";
import AdminDelete from "../../../components/Layouts/Dialogs/AdminDelete";
import EditVaxx from "../../Admin/AdminCRUD/EditVaxx";
import { Edit } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Divider,
  Typography,
} from "@mui/material";
import {
  ProfileCard,
  StyledTextField,
  StyledButton,
  StyledTableRow,
  StyledTableCell,
  StyledLink,
} from "../../../assets/styles";
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  GetVaxxPerBiteCasThunk,
  AddVaxxThunk,
  clearError,
  clearSuccess,
} from "../../../redux/slices/VaccineSlice";
import { GetAllInvThunk } from "../../../redux/slices/InventorySlice";
import { Comments } from "../../Users/Comments";
import EditBiteStatus from "../../Admin/AdminCRUD/EditBiteStatus";
import CaseNotFound from "../../extra/CaseNotFound";

const ViewBiteCase = () => {
  const { bites, loading, reports, vaxx, errors, success } = useSelector(
    (state) => state.vaccine
  );
  const { inventory } = useSelector((state) => state.inventory);
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();

  //AddVax
  const [values, setvalues] = useState({
    bitecase: "",
    date_injected: moment().startOf("day").toDate().toISOString(),
    day: "",
    vaccine: "",
    lot: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
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
    dispatch(AddVaxxThunk({ data: formData }));
    setOpen(false);
  };

  //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  useEffect(() => {
    dispatch(GetVaxxPerBiteCasThunk({ id: params.id }));
    return () => {};
  }, [dispatch, params]);

  useEffect(() => {
    //console.log(user._id);
    dispatch(GetAllInvThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

  return (
    <Box
      sx={{
        pt: 8,
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="View Bite Case" />
      <Container maxWidth="xl">
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={3000}
            onClose={onClose}
            name="success"
          >
            <Alert severity="success" variant="filled">
              <AlertTitle>Success</AlertTitle>
              {success}
            </Alert>
          </Snackbar>
        )}
        {errors && (
          <Snackbar
            open={errors}
            autoHideDuration={3000}
            onClose={onClose}
            name="error"
          >
            <Alert severity="error" variant="filled">
              <AlertTitle>Error</AlertTitle>
              {errors}
            </Alert>
          </Snackbar>
        )}

        {!loading && bites && bites.length > 0 ? (
          <Grid container spacing={2}>
            <IconButton
              component={StyledLink}
              to="/admin/bitecases"
              size="large"
              sx={{ mt: 2 }}
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography variant="h4" marginTop={2}>
              Exposure Case# {bites[0].bite_case_no}
            </Typography>
            <Grid item xs={12} sm={12} md={12}>
              <ProfileCard>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        textAlign: "left",
                        paddingBottom: 2,
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: 3,
                      }}
                    >
                      <Box component="div">
                        <Typography variant="subtitle1" color="text.secondary">
                          Name:
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{ textTransform: "capitalize" }}
                        >
                          <b>
                            {bites[0].user[0].first_name}{" "}
                            {bites[0].user[0].last_name}{" "}
                          </b>
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                          Sex:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{bites[0].user[0].sex} </b>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Barangay:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{bites[0].user[0].address} </b>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Birthday:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>
                            {moment(bites[0].user[0].birthday).format(
                              "MMMM DD, YYYY"
                            )}{" "}
                          </b>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Contact No.:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{bites[0].user[0].phone_number}</b>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Email:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{bites[0].user[0].email}</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      component="img"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${params.id}`}
                      alt="ARIS QR CODE"
                      sx={{ height: "85%" }}
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                      Bite Case ID
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Divider>Exposure Details</Divider>

                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      Date of Exposure:
                    </Typography>
                    <Typography variant="h5">
                      <b>
                        {moment(bites[0].history_of_exposure.date).format(
                          "MMMM D, YYYY"
                        )}{" "}
                      </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Place of Incident:
                    </Typography>
                    <Typography variant="h5">
                      <b>Barangay {bites[0].history_of_exposure.place} </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Type of Exposure:
                    </Typography>
                    <Typography variant="h5">
                      <b>
                        {bites[0].history_of_exposure.source_of_exposure}{" "}
                        {bites[0].history_of_exposure.type_of_exposure} on{" "}
                        {bites[0].history_of_exposure.bodypart}
                      </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Exposure Category:
                    </Typography>
                    <Typography variant="h5">
                      <b>{bites[0].exposure_category} </b>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Vaccination Status:
                    </Typography>
                    <Typography variant="h5">
                      <b>{bites[0].status_of_vaccination}</b>
                      <EditBiteStatus
                        edit={bites[0]}
                        startIcon={<Edit style={{ color: "#ff8a80" }} />}
                      />
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Animal Status:
                    </Typography>
                    <Typography variant="h5">
                      <b>{bites[0].animal_status} </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Patient Status:
                    </Typography>
                    <Typography variant="h5">
                      <b>{bites[0].patient_status} </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Classification:
                    </Typography>
                    <Typography variant="h5">
                      <b>{bites[0].classification} </b>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <br />
                </Grid>
              </ProfileCard>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                sx={{
                  float: "right",
                  size: "small",
                }}
                startIcon={<AddIcon />}
                disabled={bites[0].status_of_vaccination === "Cleared"}
                onClick={handleOpen}
              >
                Add Vaccination
              </Button>
              <br />
              <ProfileCard>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 625, alignContent: "center" }}
                    size="small"
                  >
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Day</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Brand</StyledTableCell>
                        <StyledTableCell>Lot#</StyledTableCell>
                        <StyledTableCell>Vaccinator</StyledTableCell>
                        <StyledTableCell>Remarks</StyledTableCell>
                        <StyledTableCell colSpan={2}>Actions</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {!loading &&
                        vaxx &&
                        vaxx.map((vaccine) => (
                          <StyledTableRow key={vaccine._id}>
                            <StyledTableCell>{vaccine.day}</StyledTableCell>
                            <StyledTableCell>
                              {moment(vaccine.date_injected).format(
                                "MMM. D, YYYY"
                              )}
                            </StyledTableCell>
                            <StyledTableCell>{vaccine.vaccine}</StyledTableCell>
                            <StyledTableCell>{vaccine.lot}</StyledTableCell>
                            <StyledTableCell>
                              {vaccine.admin[0]
                                ? vaccine.admin[0].admin_name
                                : "NULL"}
                            </StyledTableCell>
                            <StyledTableCell>{vaccine.remarks}</StyledTableCell>
                            <StyledTableCell>
                              <EditVaxx
                                eVax={vaccine}
                                startIcon={
                                  <Edit
                                    style={{
                                      color: "#ff8a80",
                                      fontSize: "large",
                                    }}
                                  />
                                }
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <AdminDelete
                                id={vaccine._id}
                                name={vaccine.day}
                                collection="vaxx"
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ProfileCard>

              <Grid item sm={12}></Grid>
              <Divider sx={{ mt: 5 }}>Health Status Reports</Divider>
              <Box
                component="main"
                sx={{ display: "flex", justifyContent: "end" }}
              ></Box>
              <Comments reports={reports} />
            </Grid>
          </Grid>
        ) : !loading ? (
          <CaseNotFound />
        ) : (
          <></>
        )}
        <div>
          <br />
        </div>

        {/* Add Vaxx Modal */}
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
                      disablePast
                      label="Date Injected"
                      openTo="year"
                      views={["year", "month", "day"]}
                      value={moment(values.date_injected)}
                      name="date_injected"
                      InputProps={{ readOnly: true }}
                      onChange={(newDate) =>
                        setvalues({
                          ...values,
                          date_injected: newDate
                            .startOf("day")
                            .toDate()
                            .toISOString(),
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
                  <FormControl
                    required
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white" }}
                  >
                    <InputLabel>Vaccine</InputLabel>
                    <Select
                      label="Vaccine"
                      name="vaccine"
                      id="vaccine"
                      onChange={handleChange}
                    >
                      {!loading &&
                        inventory &&
                        inventory.map((vax) => (
                          <MenuItem value={vax.brand_name} key={vax}>
                            {vax.brand_name + ` (L#` + vax.batch_no + `)`}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="lot"
                    label="Lot #"
                    name="lot"
                    size="small"
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
                    onChange={handleChange}
                  />
                </Grid>

                {/*<Grid item xs={12} sm={12} md={6}>
                  <StyledTextField
                    required
                    fullWidth
                    id="clinic"
                    label="Clinic"
                    name="clinic"
                    size="small"
                    value={user.clinic}
                    readOnly
                  />
                </Grid>

                 <Grid item xs={12} sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="admin"
                  label="Physician"
                  name="admin"
                  size="small"
                  value={user._id}
                  onChange={handleChange}
                />
              </Grid> */}
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
        </Modal>
      </Container>
      <Footer />
    </Box>
  );
};

export default ViewBiteCase;
