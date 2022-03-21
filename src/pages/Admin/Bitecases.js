import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDelete from "../../components/Layouts/Dialogs/AdminDelete";
import CssBaseline from "@mui/material/CssBaseline";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Edit, PreviewOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { StyledTextField, StyledButton, StyledLink } from "../../assets/styles";
//import MaterialTable from 'material-table'
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { taguig_baarangay } from "../../helpers/barangays";
import moment from "moment";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import {
  AddCaseThunk,
  GetAllCaseThunk,
} from "../../redux/slices/BiteCaseSlice";
import EditBiteCase from "./AdminCRUD/EditBiteCase";
import { clearError, clearSuccess } from "../../redux/slices/BiteCaseSlice";

const Bitecases = () => {
  const { bitecase, loading, errors, success } = useSelector(
    (state) => state.bitecase
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCaseThunk({ id: user.clinic }));
    return () => {};
  }, [dispatch, user]);

  const [values, setvalues] = useState({
    user: "",
    exposure_category: "",
    date: "",
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

  //modals
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  function refreshPage() {
    window.location.reload(false);
  }

  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);

  //Datagrid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      valueGetter: (cellValues) => {
        return (
          cellValues.row.user[0].first_name +
          " " +
          cellValues.row.user[0].last_name
        );
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "exposure_category",
      headerName: "Cat.",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 60,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 140,
      type: "date",
      valueGetter: (cellValues) =>
        moment(cellValues.row.history_of_exposure.date).format("MMM. DD, YYYY"),
      sortComparator: (v1, v2) => new Date(v1) - new Date(v2),
    },
    {
      field: "source_of_exposure",
      headerName: "Source",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      valueGetter: (cellValues) => {
        return cellValues.row.history_of_exposure.source_of_exposure;
      },
      sortComparator: (v1, v2) => v1.localeCompare(v2),
    },
    {
      field: "type_of_exposure",
      headerName: "Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      renderCell: (cellValues) => {
        return cellValues.row.history_of_exposure.type_of_exposure;
      },
    },
    {
      field: "vaccine",
      headerName: "Vaccine",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 100,
    },
    {
      field: "status_of_vaccination",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
    },
    {
      field: "View",
      headerName: "View",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              component={StyledLink}
              to={`/admin/bitecase/get/${cellValues.row._id}`}
            >
              <PreviewOutlined style={{ color: "#ff8a80" }} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <EditBiteCase
            id={bitecase.id}
            data={cellValues.row}
            startIcon={<Edit style={{ color: "#ff8a80" }} />}
          />
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 90,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <AdminDelete
            id={cellValues.id}
            collection="bitecases"
            data={cellValues.row}
          />
        );
      },
    },
  ];
  const handleCellClick = (param, e) => {
    e.stopPropagation();
  };
  const handleRowClick = (param, e) => {
    e.stopPropagation();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "110vh",
      }}
    >
      <PersistentDrawerLeft />
      <CssBaseline />
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
        <Grid
          container
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item>
            <Typography
              component="h1"
              variant="h2"
              color="text.primary"
              gutterBottom
            >
              Bite Cases
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Search Here..."
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <StyledButton onClick={handleOpen} margin="10">
              Add Record
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>
        <br />
        <Grid item sm flexDirection={"column"}>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,

              "& .On-going": {
                backgroundColor: "#ff8a80",
                color: "#000",
              },
              "& .Cleared": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            <div style={{ height: 520, width: "100%" }}>
              {!loading && bitecase && (
                <DataGrid
                  rows={bitecase}
                  columns={columns}
                  getRowId={(row) => row._id}
                  onCellClick={handleCellClick}
                  onRowClick={handleRowClick}
                  components={{ Toolbar: GridToolbar }}
                  getCellClassName={(params) => {
                    if (
                      params.field.status_of_vaccination ===
                      "status_of_vaccination"
                    ) {
                      return "";
                    }
                    return params.value === "On-going" ? "On-going" : "Cleared";
                  }}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Container>

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
                  label="Patient"
                  name="user"
                  size="small"
                  //autoComplete="user"
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
                    abrasions without bleeding (exposure)
                  </Typography>
                  <Typography sx={{ p: 1, display: "inline-block" }}>
                    {" "}
                    Cat. III - single or multiple transdermal bites or
                    scratches, contamination of mucous membrane or broken skin
                    with saliva from animal licks, exposures due to direct
                    contact with bats (severe exposure)
                  </Typography>
                </Popover>
              </Grid>
              <br />
              <br />
              <Divider variant="middle" style={{ width: "100%" }}>
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

              <Grid item xs={6} sm={6} md={6}>
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

              <Grid item xs={6} sm={6} md={6}>
                <FormControl
                  required
                  fullWidth
                  size="small"
                  sx={{ backgroundColor: "white" }}
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
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
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

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="bodypart"
                  label="Body Part Affected"
                  name="bodypart"
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
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
                <FormControl>
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
                />
              </Grid>

              <Grid item xs={6} sm={6} md={6}>
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

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="classification"
                  label="Classification"
                  name="classification"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>

              {/* <Grid item sm={6} md={6}>
                <StyledTextField
                  required                 
                  fullWidth
                  id="clinic"
                  label="Clinic"
                  name="clinic"
                  size="small"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid> */}

              <Grid item xs={6} sm={6} md={6}>
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

              <Grid item xs={6} sm={6} md={6}>
                <StyledTextField
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Patient Status"
                  name="patient_status"
                  fullWidth
                  onChange={handleChange}
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
      </Modal>

      <Footer />
    </Box>
  );
};

export default Bitecases;
