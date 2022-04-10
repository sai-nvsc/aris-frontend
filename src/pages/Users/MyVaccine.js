import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Link,
  Skeleton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import { GetBiteCasesThunk } from "../../redux/slices/VaccineSlice";
import moment from "moment";

const MyVaccine = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, bites } = useSelector((state) => state.vaccine);
  useEffect(() => {
    dispatch(GetBiteCasesThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user._id]);
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
        {!loading ? (
          bites &&
          Array.isArray(bites) &&
          bites.map((bite) => (
            <Grid container spacing={2} sx={{ mt: 2 }} key={bite._id}>
              <Grid item sm={12}>
                <Card sx={{ display: "flex" }}>
                  <CardActionArea href={`myvaxx/${bite._id}`}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 5,
                      }}
                    >
                      <CardContent>
                        <Typography component="div" variant="h4">
                          Exposure Case #: {bite.bite_case_no}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Location: {bite.history_of_exposure.place}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Date Registered: {moment(bite.history_of_exposure.date).format("MMMM DD, YYYY, h:mm A")}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Category: {bite.exposure_category}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Source: {bite.history_of_exposure.source_of_exposure}{" "}{bite.history_of_exposure.type_of_exposure}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Status: {bite.status_of_vaccination}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Clinic:{" "}
                          <Link
                            href={`https://www.google.com/maps/search/?api=1&query=${bite.clinic[0].location.coordinates[1]},${bite.clinic[0].location.coordinates[0]}`}
                            target="_blank"
                          >
                            {bite.clinic[0].name}
                          </Link>
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          ))
        ) : (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        )}
      </Container>
    </Box>
  );
};

export default MyVaccine;
