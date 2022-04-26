import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  Box,
  Container,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ProfileCard,
  StyledButton,
  StyledTableCell,
  StyledTableRow,
} from "../../assets/styles";
import moment from "moment";
import { GetVaxxPerBiteCasThunk } from "../../redux/slices/VaccineSlice";

const VaxCertificate = () => {
  const { bites, loading, vaxx } = useSelector((state) => state.vaccine);
  const params = useParams();
  const dispatch = useDispatch();

  function print() {
    window.print();
  }
  function onBackClick() {
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }
  useEffect(() => {
    dispatch(GetVaxxPerBiteCasThunk({ id: params.id }));
    return () => {};
  }, [dispatch, params]);
  return (
    <Box
      sx={{
        pb: 2,
      }}
    >
      <CssBaseline />
      <Container maxWidth="md">
        <div>
          <IconButton id="backbtn" onClick={onBackClick}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
          <StyledButton
            id="printbtn"
            onClick={print}
            startIcon={
              <PrintIcon style={{ fontSize: "medium", color: "#fff" }} />
            }
          >
            Print or Download Certificate
          </StyledButton>
        </div>
        {!loading && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ProfileCard elevation={15}>
                <br />
                <Typography variant="h5">
                  <b>CERTIFICATE OF ANTI-RABIES VACCINATION</b>
                </Typography>
                <br />
                <Divider>Patient Information</Divider>
                <Grid container spacing={2}>
                  <Grid
                    item
                    sm={6}
                    md={6}
                    lg={6}
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
                        marginLeft: "auto",
                      }}
                    >
                      <Box component="div" sx={{ml:4, flexWrap:"nowrap"}}>
                        <Typography sx={{ textTransform: "capitalize" }}>
                          Name:{" "}
                          <b>
                            {bites[0].user[0].first_name}{" "}
                            {bites[0].user[0].last_name}{" "}
                          </b>
                        </Typography>
                        <Typography>
                          Sex: <b>{bites[0].user[0].sex}</b>
                        </Typography>
                        <Typography>
                          Address: <b>{bites[0].user[0].address}</b>
                        </Typography>
                        <Typography>
                          Birthday:{" "}
                          <b>
                            {moment(bites[0].user[0].birthday).format(
                              "MMMM DD, YYYY"
                            )}{" "}
                          </b>
                        </Typography>
                        <Typography>
                          Contact No.: <b>{bites[0].user[0].phone_number}</b>
                        </Typography>
                        <Typography>
                          Email: <b>{bites[0].user[0].email}</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
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
                <Divider>Exposure Details</Divider>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      Date of Exposure:
                    </Typography>
                    <Typography variant="h6">
                      <b>
                        {moment(bites[0].history_of_exposure.date).format(
                          "MMMM D, YYYY"
                        )}{" "}
                      </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Place of Incident:
                    </Typography>
                    <Typography variant="h6">
                      <b>Barangay {bites[0].history_of_exposure.place} </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Type of Exposure:
                    </Typography>
                    <Typography variant="h6">
                      <b>
                        {bites[0].history_of_exposure.source_of_exposure}{" "}
                        {bites[0].history_of_exposure.type_of_exposure} on{" "}
                        {bites[0].history_of_exposure.bodypart}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Exposure Category:
                    </Typography>
                    <Typography variant="h6">
                      <b>{bites[0].exposure_category} </b>
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary">
                      Animal Status:
                    </Typography>
                    <Typography variant="h6">
                      <b>{bites[0].animal_status} </b>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Classification:
                    </Typography>
                    <Typography variant="h6">
                      <b>{bites[0].classification} </b>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider>Exposure Vaccination Record</Divider>
                <TableContainer component={Paper}>
                  <Table sx={{ alignContent: "center" }} size="small">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>Day</StyledTableCell>
                        <StyledTableCell>Date Given</StyledTableCell>
                        <StyledTableCell>Brand</StyledTableCell>
                        <StyledTableCell>Lot#</StyledTableCell>
                        <StyledTableCell>Vaccinator</StyledTableCell>
                        <StyledTableCell>Remarks</StyledTableCell>
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
                              {vaccine.admin[0].admin_name}
                            </StyledTableCell>
                            <StyledTableCell>{vaccine.remarks}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <br />
              </ProfileCard>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default VaxCertificate;
