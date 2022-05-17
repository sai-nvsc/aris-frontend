import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  Chart,
  ArgumentAxis,
  AreaSeries,
  ValueAxis,
  LineSeries,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
//DOH data
import { confidence as dataa } from "../extra/demo-data";
import { incidence as data } from "../extra/demo-data";
//import { barangay as dataaa } from "../extra/demo-data";
import { bitecase as bite } from "../extra/demo-data";
import MapAnalytics from "../../data/Analytics/MapAnalytics";
import Legends from "../../data/Analytics/Legends";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/SuperSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getBarangayCount } from "../../redux/slices/AnalyticsSlice";

const PREFIX = "Demo";
const classes = {
  chart: `${PREFIX}-chart`,
};
const format = () => (tick) => tick;

const Root = (props) => (
  <Legend.Root
    {...props}
    sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
  />
);
const Label = (props) => (
  <Legend.Label sx={{ pt: 1, whiteSpace: "wrap" }} {...props} />
);
const Item = (props) => (
  <Legend.Item sx={{ flexDirection: "column" }} {...props} />
);

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
}));

const stacks = [
  {
    series: ["Dog", "Cat", "Others"],
  },
];

const Analytics = () => {
  const dispatch = useDispatch();
  const { loading, barangayCount } = useSelector((state) => state.analytics);
  useEffect(() => {
    dispatch(getBarangayCount());
    return () => {};
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 3,  
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="ARIS Statistics Reports" />
      <Container sx={{ py: 5 }} maxWidth="xl">
      <Divider light>
        <Chip label="Latest Statistics from ARIS" color="primary"></Chip>
      </Divider>

        <Grid container item xs={12} spacing={2}>
          {/* Total Bite Cases in Taguig City. Choropleth Map  */}
          <Grid item xl={12} md={12} lg={12} sm={12} xs={12}>
            <Paper elevation={12}>
              {!loading && barangayCount && (
                <>
                  <MapAnalytics
                    barangay={barangayCount}
                    title="Taguig Total Animal Bite Cases per Barangay"
                  />
                  <Legends />
                </>
              )}
            </Paper>
          </Grid>
          </Grid>
<br/>
          <Grid container item xs={12} spacing={2}>
          {/* Total Bite Cases Per clinic  */}
          <Grid item xl={12} md={12} lg={12} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tbc"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="1400"
                  height="720"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=627e309c-5476-491a-85df-a9e1846385ad&maxDataAge=60&theme=light&autoRefresh=true"
                ></iframe>
                </>
            </Paper>
          </Grid>

          {/* Total Bite Cases Per Category  */}
          <Grid item xl={3} md={6} sm={6} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tbcpc"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="800"
                  height="600"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6234e0e6-ceb9-4b03-8a49-ae864ed0b9ed&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Total Bite Cases Per Gender  */}
          <Grid item xl={3} md={6} sm={6} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tbcpg"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="800"
                  height="600"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6234d221-6ae5-4a31-8a64-830b77ea5baa&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Total Bite Cases by Source */}
          <Grid item xl={3} md={6} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tbcsource"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="800"
                  height="600"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6234d829-38ca-40ec-8644-4566dd5918bd&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Total Bite Cases by Type */}
          <Grid item xl={3} md={6} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tbctype"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="800"
                  height="600"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6234daf9-ceb9-4460-8bba-ae864ecb6a58&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Cases per Brgy by Source */}
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="cpbsorce"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="1400"
                  height="720"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6237e564-ceb9-4dcd-8187-ae864e112cf8&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Cases per Brgy by Type */}
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="cpbtype"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="1400"
                  height="720"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6237e7b7-ba30-423b-8bf7-3581ceb9f952&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
          {/* Total Exposures by Brgy per Year */}
          <Grid item xl={12} md={12} lg={12} sm={12} xs={12}>
            <Paper elevation={12}>
              <>
                <iframe
                  title="tebpy"
                  style={{
                    background: "#FFFFFF",
                    border: "none",
                    borderRadius: "2px",
                    maxWidth: "100%",
                  }}
                  width="1400"
                  height="720"
                  src="https://charts.mongodb.com/charts-project-0-cayrv/embed/charts?id=6238a131-e005-4e8c-8847-02cbb4e1a1f1&maxDataAge=300&theme=light&autoRefresh=true"
                ></iframe>
              </>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Divider light>
        <Chip label="Latest Statistics from DOH" color="primary"></Chip>
      </Divider>
      <Container sx={{ py: 5 }} maxWidth="xl">
        <Grid container item xs={12} spacing={2}>
          <Grid item xl={12} md={12} sm={12} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}
            >
              <Typography component="h2" align="center">
                Animal Bite Cases , Philippines, 2007–2018
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
{/*                    <Legend  position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />*/}{" "}
                <Animation />
              </StyledChart>
              <Typography m={2} component="h2" align="center">
                The number of Animal Bite Treatment Centers (ABTCs), where cases
                of rabies exposures are able to access human anti-rabies vaccine
                and immunoglobulin for PEP, increased in number from 256 in 2007
                to 616 centers in 2018. It can be observed based on the data
                that there is a corresponding increase in reported rabies
                exposures if the number of ABTCs is also increasing. In 2007,
                there were only 256 ABTCs and reported rabies exposures were
                177,000. Compared to 2018 where there were 613 ABTCs, reported
                rabies exposure increased to 1,165,822. Because of the increase
                in the number of ABTCs, animal bite cases were properly recorded
                and reported. Despite of the 279% increase in the reported
                rabies exposures from 2011, the incidence of human rabies cases,
                is fluctuating. This is due to the better access to PEP provided
                by the increasing number of ABTCs.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xl={12} md={12} sm={12} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}
            >
              <Typography component="h2" align="center">
                Human Rabies Exposures by Region per Category, Philippines, 2018
              </Typography>

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
                <Legend
                  position="bottom"
                  rootComponent={Root}
                  itemComponent={Item}
                  labelComponent={Label}
                />
                <Animation />
              </StyledChart>
              <Typography m={2} component="h2" align="center">
                In 2018 there were 1,156,377 animal bites, 99% of exposure,
                mostly through bites, 69% were from dogs, 28,98% from cats and
                1.3% from other animals. 9.3% were of Category I exposures which
                do not require PEP, while 74,68% were Category II and 26.72%
                were Category III exposures.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xl={12} md={12} sm={12} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}
            >
              <Typography component="h2" align="center">
                Total Human Rabies Incidence in Philippines(2007-2018)
              </Typography>
              <StyledChart data={dataa} rootComponent={ChartRoot}>
                <ArgumentAxis tickFormat={format} />
                <ValueAxis />
                <AreaSeries
                  name="Cat scratches"
                  valueField="mobile"
                  argumentField="year"
                />
                <Stack stacks={stacks} />
                <Animation />
              </StyledChart>
              <Typography m={2} component="h2" align="center">
                The number of human rabies cases in the past twelve years has
                been fluctuating. Statistics showed that human rabies cases
                fluctuate from 2007 to 2018 as shown above.{" "}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default Analytics;
