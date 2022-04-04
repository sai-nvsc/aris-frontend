import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  IconButton,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProfileCard, StyledLink } from "../../assets/styles";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import { GetVaxxPerBiteCasThunk } from "../../redux/slices/VaccineSlice";
import moment from "moment";
import Footer from "../../components/Layouts/Footer";
import SendHealthReport from "./CRUD/SendHealthReport";
import { Comments } from "./Comments";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const MyVaccineDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const { loading, bites, vaxx, reports } = useSelector(
    (state) => state.vaccine
  );
  useEffect(() => {
    dispatch(GetVaxxPerBiteCasThunk({ id: params.id }));
    return () => {};
  }, [dispatch, params]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="Vaccine History" />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        {!loading && (
          <Grid container spacing={2}>
            <IconButton
            component={StyledLink}
            to="/user/myvaxx"
            size="large"
            sx={{ mt: 2 }}
          >
              <ArrowBackIosRoundedIcon />
            </IconButton>
        <Typography variant="h4" marginTop={2}>Vaccination Details</Typography>
        
            <Grid item sm={12}>
              <ProfileCard>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    sx={{
                      borderRadius: 3,
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        textAlign: "left",
                        paddingLeft: 2,
                        paddingBottom: 2,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Box component="div">
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          First Name:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{user.first_name} </b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          Last Name:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{user.last_name} </b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          Sex:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{user.sex} </b>
                        </Typography>
                      </Box>
                      <Box component="div" sx={{ marginLeft: 10 }}>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          Barangay:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{user.address} </b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          Birthday:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>
                            {moment(user.birthday).format("MMMM DD, YYYY")}{" "}
                          </b>
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          color="text.secondary"
                        >
                          Contact No.:
                        </Typography>
                        <Typography variant="h5" component="div">
                          <b>{user.phone_number} </b>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <Box
                      component="img"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${params.id}`}
                      alt="ARIS QR CODE"
                    />
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Bite Case ID
                    </Typography>
                  </Grid>
                </Grid>
                <Divider>Exposure Detail</Divider>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={12}
                    md={6}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Date of Exposure:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>
                        {moment(bites[0].history_of_exposure.date).format(
                          "MMMM DD, YYYY"
                        )}{" "}
                      </b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Place of Incident:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>Barangay {bites[0].history_of_exposure.place} </b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Type of Exposure:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>
                        {bites[0].history_of_exposure.type_of_exposure} -{" "}
                        {bites[0].history_of_exposure.source_of_exposure}{" "}
                      </b>
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Body Part affected:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>{bites[0].history_of_exposure.bodypart} </b>
                    </Typography>
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Exposure Category:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>{bites[0].exposure_category} </b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Vaccination Status:
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>{bites[0].status_of_vaccination}</b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Animal Status
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>{bites[0].animal_status} </b>
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      color="text.secondary"
                    >
                      Patient Status
                    </Typography>
                    <Typography variant="h5" component="div">
                      <b>{bites[0].patient_status} </b>
                    </Typography>
                  </Grid>
                </Grid>
              </ProfileCard>
            </Grid>
            <Grid item sm={12}>
              <ProfileCard>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Lot#</TableCell>
                        <TableCell>Vaccinator</TableCell>
                        <TableCell>Remarks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!loading &&
                        vaxx &&
                        vaxx.map((vaccine) => (
                          <TableRow key={vaccine._id}>
                            <TableCell component="th" scope="row">
                              {vaccine.day}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {moment(vaccine.date_injected).format(
                                "MMMM DD, YYYY"
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {vaccine.vaccine}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {vaccine.lot}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {vaccine.admin[0].admin_name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {vaccine.remarks}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ProfileCard>
              <Grid item sm={12}></Grid>
              <Divider sx={{ mt: 5 }}>Health Status Repors</Divider>
              <Box
                component="main"
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <SendHealthReport />
              </Box>

              <Comments reports={reports} />
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default MyVaccineDetails;
