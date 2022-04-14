import {
  Box,
  Container,
  CssBaseline,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Layouts/Footer";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import PropTypes from "prop-types";
import AppointmentsCompleted from "./AppointmentsCompleted";
import AppointmentsPending from "./AppointmentsPending";
import { useDispatch, useSelector } from "react-redux";
import { getMyAppointments } from "../../redux/slices/AppointmentSlice";
import CancelledAppointments from "./CancelledAppointments";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Appointments = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { appt_error, pending, completed, loading, ...rest } = useSelector(
    (state) => state.appointments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppointments());
    return () => {};
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="My Appointments" />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "white",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Pending/On-going" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
              <Tab label="Cancelled" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AppointmentsPending pending={loading ? "loading" : pending} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AppointmentsCompleted
              completed={loading ? "loading" : completed}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CancelledAppointments
              cancelled={loading ? "loading" : rest.cancelled}
            />
          </TabPanel>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Appointments;
