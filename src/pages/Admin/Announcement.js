import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Alert,
  AlertTitle, 
    Box,
    Card,
    CardActions,
    CardContent, 
    Container,
    Divider,
    Grid,
    Modal,
    Snackbar,
    TextField,
    Typography 
} from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import {
  StyledTextField,
  StyledButton,
} from "../../assets/styles";
import { Edit } from "@mui/icons-material";
import Delete from "../../components/Layouts/Dialogs/Delete";
import PersistentDrawerLeft from "../../components/Layouts/AdminSidebar";
import Footer from "../../components/Layouts/Footer";
import EditAnn from "../Admin/AdminCRUD/EditAnn"
import moment from "moment";
import DateAdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { AddAnnThunk, GetAllAnnThunk, clearError, clearSuccess } from "../../redux/slices/AnnouncementSlice";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Announcement = () => {
  const { announcement, loading, errors, success } = useSelector((state) => state.announcement);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [values, setvalues] = useState({
    title: "",
    desc: "",
    date: new Date(),
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("date", values.date);
    formData.append("clinic", user.clinic);
    dispatch(AddAnnThunk({ data: formData }));    
  };

  useEffect(() => {
    //console.log(announcement);
    dispatch(GetAllAnnThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

  function refreshPage() {
    window.location.reload(false);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: "100vh",

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
        name="sucess"
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
              align="left"
              color="text.primary"
              gutterBottom
            >
              Announcements
            </Typography>
          </Grid>

          <Grid item>
            <StyledButton onClick={handleOpen} margin="10">
              New Announcement
            </StyledButton>
            <StyledButton onClick={refreshPage}>⟳</StyledButton>
          </Grid>
        </Grid>
      
        <Box sx={{ pt: 4, }}>     
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} spacing={2}>
      {!loading && 
        announcement && 
        announcement.map((ann) => (
            <>
            <Card
                sx={{
                  width:"100%",
                  display: "block",
                }}
              >    
            <CardContent sx={{ flexGrow: 1 }}>  
            <Typography gutterBottom variant="h5" component="h2">{ann.title}</Typography>        
          <Divider light></Divider><br/>
          <Typography color="text.secondary">{bull}{ann.desc}</Typography>            
          <br/>
          <Typography color="text.secondary">Posted: {moment(ann.date).format("MMM. D, YYYY")}</Typography>
        </CardContent>

        <CardActions>
        <EditAnn annEdit={ann} startIcon={<Edit />}/>

        <Delete
          id={ann._id}
        //name={ann.brand_name}
          collection="announcements"
          />
    </CardActions>
        </Card>
            </>
         ))}   
      </Masonry>      
    </Box>
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
        autoComplete="off"
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
              marginBottom={4}
            >
              Add New Announcement
            </Typography>

            <Grid container spacing={3}>
              <Grid item sm={12} md={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="desc"
                  label="Description"
                  name="desc"
                  multiline
                  maxRows={10}
                  size="small"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12} md={6}>
                <LocalizationProvider dateAdapter={DateAdapterMoment}>
                  <DatePicker
                    disabled="true"
                    label="Date"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={moment(values.date)}
                    name="exp_date"
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
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                alignItems: "center",
              }}
            > <br/>
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

export default Announcement;
