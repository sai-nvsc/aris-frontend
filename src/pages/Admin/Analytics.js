import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
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
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Stack, Animation } from "@devexpress/dx-react-chart";
//demo-data only, check line 278 and 106 pages/extra/demo-data.js
import { confidence as dataa } from "../extra/demo-data";
import { incidence as data } from "../extra/demo-data";

import { barangay as dataaa } from "../extra/demo-data";
import { bitecase as bite } from "../extra/demo-data";

import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";

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

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};
const ChartRootBase = styled(Chart.Root)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: "20px",
  },
}));
const ChartRoot = (props) => (
  <ChartRootBase className={classes.chart} {...props} />
);

const TitleText = (props) => (
  <Title.Text {...props} sx={{ whiteSpace: "pre" }} />
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
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 7,
        pb: 12,
        minHeight: "100vh",

      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft />

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
                  valueField="tvNews"
                  argumentField="year"
                />
                <LineSeries
                  name="CAT2"
                  valueField="church"
                  argumentField="year"
                />
                <LineSeries
                  name="CAT3"
                  valueField="military"
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

          {/**   <Grid item  xl={12} md={12} sm={12} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}
            >
                <Typography component="h2" align="center">
                  Rabies Cases in Taguig City (2012-2018)
                </Typography>
                <StyledChart data={dataaa} className={classes.chart}>
                  <PieSeries
                    valueField="val"
                    argumentField="barangay"
                    innerRadius={0.5}
                  />
                  <Animation />
                </StyledChart>
            </Paper>
          </Grid>

          <Grid item xl={12} md={12} sm={12} xs={12}>
            <Paper
              elevation={12}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid black" }}
            >
              <Typography component="h2" align="center">
                Rabies Cases in Taguig City (2012-2018)
              </Typography>
              <StyledChart data={dataaa} className={classes.chart}>
                <PieSeries valueField="val" argumentField="barangay" />
                <Animation />
              </StyledChart>
            </Paper>
          </Grid>    */}

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
                  name="Human Rabies"
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
