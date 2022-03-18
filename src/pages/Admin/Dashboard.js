import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import { StyledLink } from "../../assets/styles";
import { styled } from "@mui/material/styles";

//eslint-disable-next-line
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Popover,
  Typography,
  Divider,
} from "@mui/material";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
//DOH data
import { confidence as dataa } from "../extra/demo-data";
import { incidence as data } from "../extra/demo-data";
//import { barangay as dataaa } from "../extra/demo-data";
import { bitecase as bite } from "../extra/demo-data";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Layouts/Footer";
import {
  GetAllCasesThunk,
  GetCategoriesThunk,
  GetCatPerClinicThunk,
} from "../../redux/slices/BiteCaseSlice";
//icons
const bell = require("../../assets/8.svg").default;
const apt = require("../../assets/2.svg").default;
const inv = require("../../assets/3.svg").default;
const chart = require("../../assets/4.svg").default;
const px = require("../../assets/1.svg").default;

//Charts
const PREFIX = "ARIS";
const classes = {
  chart: `${PREFIX}-chart`,
};
const format = () => (tick) => tick;

const ChartRootBase = styled(Chart.Root)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: "20px",
  },
}));
const ChartRoot = (props) => (
  <ChartRootBase className={classes.chart} {...props} />
);

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: "20px",
  },
  "&:hover": {
    background: "#E9E9E9",
  },
}));
const stacks = [
  {
    series: ["Dog", "Cat", "Others"],
  },
];

//
const cards = [
  {
    title: "Bite Cases",
    desc: "View Bite Cases records...",
    image: px,
    alt: "Patients",
    to: "/admin/bitecases",
  },
  {
    title: "Appointments",
    desc: "View Active/Pending appointments...",
    image: apt,
    alt: "Appointments",
    to: "/admin/appointments",
  },
  {
    title: "Inventory",
    desc: "View clinic's inventory...",
    image: inv,
    alt: "Inventory",
    to: "/admin/inventory",
  },
  {
    title: "Analytics",
    desc: "View rabies reports and analytics...",
    image: chart,
    alt: "Analytics",
    to: "/admin/analytics",
  },
  {
    title: "Announcements",
    desc: "View latest announcements and updates...",
    image: bell,
    alt: "announcement",
    to: "/admin/announcements",
  },
];

const Dashboard = () => {
  const { bitecase } = useSelector((state) => state.bitecase);
  const { cases } = useSelector((state) => state.cases);
  const { category1, category2, category3, cat1, cat2, cat3 } = useSelector(
    (state) => state.category
  );

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "A.R.I.S | Admin";
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(GetAllCasesThunk());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetCategoriesThunk());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetCatPerClinicThunk({ id: user.clinic }));
    return () => {};
  }, [dispatch, user]);

  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 6,
        pb: 5,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft />

      <Container sx={{ py: 5 }} maxWidth="xl">
        <Grid container item xs={12} spacing={2}>
          <Grid item xl={3} md={4} sm={6} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
              <StyledLink to="/admin/analytics">
                <Typography component="h2" align="center">
                  Animal Bite Cases in the Philippines 2007–2018
                </Typography>

                <StyledChart data={bite} className={classes.chart}>
                  <ArgumentAxis tickFormat={format} />
                  <ValueAxis
                  //max={50}
                  //labelComponent={ValueLabel}
                  />
                  <LineSeries
                    name="Bite Cases"
                    valueField="bites"
                    argumentField="year"
                  />
                  {/*              <Legend  position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />*/}
                  <Animation />
                </StyledChart>
              </StyledLink>
            </Paper>
          </Grid>

          <Grid item xl={3} md={4} sm={6} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
              <StyledLink to="/admin/analytics">
                <Typography
                  component="h2"
                  align="center"
                  aria-owns={openPop ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  Human Rabies Exposures by Region per category, Philippines,
                  2018
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
                  <Typography
                    sx={{ p: 1, display: "inline-block", color: "skyblue" }}
                  >
                    {" "}
                    Cat. I
                  </Typography>
                  <Typography
                    sx={{ p: 1, display: "inline-block", color: "darkgreen" }}
                  >
                    {" "}
                    Cat. II
                  </Typography>
                  <Typography
                    sx={{ p: 1, display: "inline-block", color: "orangered" }}
                  >
                    {" "}
                    Cat. III
                  </Typography>
                </Popover>

                <StyledChart data={data} className={classes.chart}>
                  <ArgumentAxis tickFormat={format} />
                  <ValueAxis
                  //max={50}
                  //labelComponent={ValueLabel}
                  />
                  <LineSeries
                    name="CAT1"
                    valueField="cat1"
                    argumentField="year"
                  />
                  <LineSeries
                    name="CAT2"
                    valueField="cat2"
                    argumentField="year"
                  />
                  <LineSeries
                    name="CAT3"
                    valueField="cat3"
                    argumentField="year"
                  />
                  {/* <Legend  position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} /> */}
                  <Animation />
                </StyledChart>
              </StyledLink>
            </Paper>
          </Grid>

          {/**   <Grid item  xl={3} md={4} sm={6}xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
             <StyledLink to="/admin/analytics">
                <Typography component="h2" align="center">
                  Total Rabies Cases in Taguig City (2012 - 2018)
                </Typography>
                <StyledChart data={dataaa} className={classes.chart}>
                  <PieSeries
                    valueField="val"
                    argumentField="barangay"
                    innerRadius={0.5}
                  />
                  <Animation />
                </StyledChart>
              </StyledLink>
            </Paper>
          </Grid>
    */}

          <Grid item xl={3} md={4} sm={6} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
              <StyledLink to="/admin/analytics">
                <Typography component="h2" align="center">
                  Total Human Rabies Incidence in Philippines (2007-2018)
                </Typography>
                <StyledChart data={dataa} rootComponent={ChartRoot}>
                  <ArgumentAxis tickFormat={format} />
                  <ValueAxis />
                  <AreaSeries
                    name="Cat scratches"
                    valueField="mobile"
                    argumentField="year"
                  />
                  {/*   <AreaSeries
                    name="Dog bites"
                    valueField="pc"
                    argumentField="year"
                  />
                  <AreaSeries
                    name="Others"
                    valueField="console"
                    argumentField="year"
                  /> */}
                  {/* <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} /> */}
                  <Stack stacks={stacks} />
                  <Animation />
                </StyledChart>
              </StyledLink>
            </Paper>
          </Grid>

          <Grid item xl={3} md={4} sm={6} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
              <StyledLink to="/admin/bitecases">
                <Typography component="h2" align="center">
                  Total Bite Cases
                </Typography>
                <Typography align="center" variant="h1">
                  {bitecase ? bitecase.length : 0}
                </Typography>

                <Typography align="center" variant="h4">
                  C1: {category1 ? category1.length : 0}
                </Typography>
                <Typography align="center" variant="h4">
                  C2: {category2 ? category2.length : 0}
                </Typography>
                <Typography align="center" variant="h4">
                  C3: {category3 ? category3.length : 0}
                </Typography>
              </StyledLink>
            </Paper>

            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "2px solid #ff8a80" }}
            >
              <StyledLink to="/admin/bitecases">
                <Typography component="h2" align="center">
                  Total Bite Cases in Taguig City
                </Typography>
                <Typography align="center" variant="h1">
                  {cases ? cases.length : 0}
                </Typography>

                <Typography align="center" variant="h4">
                  C1: {cat1 ? cat1.length : 0}
                </Typography>
                <Typography align="center" variant="h4">
                  C2: {cat2 ? cat2.length : 0}
                </Typography>
                <Typography align="center" variant="h4">
                  C3: {cat3 ? cat3.length : 0}
                </Typography>
              </StyledLink>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Divider light></Divider>

      <Container sx={{ py: 7 }} maxWidth="xl">
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={2.4} xl={2.4}>
              <Card
                sx={{
                  height: "100%",
                  width: "108%",
                  display: "flex",
                  position: "sticky",
                  flexDirection: "column",
                }}
              >
                <CardActionArea>
                  <StyledLink to={card.to}>
                    <CardMedia
                      sx={{
                        pt: "100%",
                      }}
                      image={card.image}
                      alt={card.alt}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {card.desc}
                      </Typography>
                    </CardContent>
                  </StyledLink>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Dashboard;
