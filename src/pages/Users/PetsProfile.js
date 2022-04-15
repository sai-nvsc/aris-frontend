import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import { DataGrid } from "@mui/x-data-grid";
import Footer from "../../components/Layouts/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  GetPetDetailsThunk,
} from "../../redux/slices/PetSlice";
import EditPet from "./CRUD/EditPets";
import Delete from "../../components/Layouts/Dialogs/Delete";
import AddPetVaxxDetail from "./CRUD/AddPetVaxxDetail";
import EditPetVaxxDetail from "./CRUD/EditPetVaxxDetails";
const moment = require("moment");
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const handleCellClick = (param, e) => {
  e.stopPropagation();
};
const handleRowClick = (param, e) => {
  e.stopPropagation();
};

const PetsProfile = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { pets, loading, success, errors } = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns = [
    { field: "vaccine_name", headerName: "Vaccine Used", flex: 1 },
    {
      field: "date_of_vaccination",
      headerName: "Vaccination Date",
      flex: 1,
      renderCell: (cellValues) => {
        return moment(cellValues.row.date_of_vaccination).format(
          "MMMM DD, YYYY"
        );
      },
    },
    {
      field: "revaccination_schedule",
      headerName: "Revaccination Schedule",
      flex: 1,
      renderCell: (cellValues) => {
        return moment(cellValues.row.revaccination_schedule).format(
          "MMMM DD, YYYY"
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (cellValues) => {
        return <EditPetVaxxDetail id={params.id} data={cellValues.row} />;
      },
      sortable: false,
    },
    {
      field: "Delete",
      headerName: "Delete",
      flex: 1,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <Delete
            id={params.id}
            name={"this entry"}
            collection="pet_vaccine"
            data={cellValues.row}
          />
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(GetPetDetailsThunk({ id: params.id }));
    return () => {};
  }, [dispatch, params]);

  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title={pets ? pets[0].name : "Loading..."} />
      <Container component="main" sx={{ margin: "auto" }}>
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

        {/* <div className="app"> */}
        {!loading && pets && (
          <Card sx={{ display: "flex" }}>
            <Grid item xs sx={{ alignSelf: "center" }}>
              <CardMedia
                component="img"
                //width="85%"
                image={
                  pets[0].images
                    ? pets[0].images[0].url
                    : "https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2018/06/dog-breeds-of-famous-dogs-1600x1065.jpg"
                }
                alt="Pet Img"
              />
            </Grid>
            <Grid item xs container direction="column">
              <CardContent sx={{ flex: "auto" }}>
                <Grid item xs container direction="column">
                  <Typography>Name: {pets[0].name}</Typography>
                  <Typography>Breed: {pets[0].breed}</Typography>
                  <Typography>Color: {pets[0].color}</Typography>
                  <Typography>Age: {pets[0].age} mos.</Typography>
                  <Typography>Type: {pets[0].species}</Typography>
                  <Typography>
                    Date Registered:{" "}
                    {moment(pets[0].created_at).format(
                      "MMM. D, YYYY [at] h:mmA "
                    )}
                  </Typography>
                </Grid>
                <br />
                <Grid item xs container direction="column">
                  <Button variant="contained" onClick={handleOpen}>
                    Vaccine Status
                  </Button>
                  <br />
                  <EditPet petToEdit={pets[0]} />
                  <Delete
                    id={pets[0]._id}
                    name={pets[0].name}
                    collection="pets"
                  />
                </Grid>
              </CardContent>
            </Grid>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style2}>
                <>
                  <AddPetVaxxDetail />
                </>
                <div style={{ height: 350, width: "auto" }}>
                  <DataGrid
                    rows={pets[0].vaccine_history}
                    columns={columns}
                    getRowId={(row) => row._id}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                  />
                </div>
              </Box>
            </Modal>
          </Card>
        )}
        {/* </div> */}
      </Container>
      <Footer />
    </Box>
  );
};
export default PetsProfile;
