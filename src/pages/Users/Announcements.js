import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";

import Footer from "../../components/Layouts/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewAllAnnouncement } from "../../redux/slices/AnnouncementSlice";
import Masonry from "@mui/lab/Masonry";
import moment from "moment";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";

const Announcements = () => {
  const dispatch = useDispatch();
  const { announcement, loading } = useSelector((state) => state.announcement);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  useEffect(() => {
    dispatch(ViewAllAnnouncement());
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
      <PersistentDrawerLeft title="Announcements" />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="xl">
        <Box sx={{ width: "100%" }}>
          <Typography variant="h4">Announcements of the Month</Typography>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2}>
            {!loading &&
              announcement &&
              announcement.map((ann) => (
                <>
                  <Card
                    sx={{
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {ann.title}
                      </Typography>
                      <Divider light></Divider>
                      <br />
                      <Typography color="text.secondary">
                        {bull}
                        {ann.desc}
                      </Typography>
                      <br />
                      <Typography color="text.secondary">
                        Posted: {moment(ann.date).format("MMM. D, YYYY")}
                      </Typography>
                      <Typography color="text.secondary">
                        Posted By: {ann.clinic[0].name}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              ))}
          </Masonry>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Announcements;
