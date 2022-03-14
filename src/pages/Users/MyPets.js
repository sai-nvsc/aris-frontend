import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Pagination,
  Snackbar,
  Typography,
} from "@mui/material";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearSuccess, GetAllPetsThunk } from "../../redux/slices/PetSlice";
import CreatePet from "./CRUD/CreatePets";
import { Link } from "react-router-dom";
import { StyledLink } from "../../assets/styles";
import { clearError } from "../../redux/slices/UserSlices";
import Footer from "../../components/Layouts/Footer";

const MyPets = () => {
  /**
   * Initialize variables.
   */
  const { user } = useSelector((state) => state.user); //retrieve the user state (found in redux store)
  const { pets, loading, errors, success } = useSelector((state) => state.pets); //retrieve pets state (found in redux store)
  const dispatch = useDispatch(); //a variable used to call a redux action (reduxThunks/actions)
  const useStyles = makeStyles((theme) => ({
    //Front-end designing
    appBar: {
      backgroundColor: "#fff",
    },
    hero: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i1.wp.com/www.drchemdry.com/wp-content/uploads/2016/11/pet-header.jpg')`,
      height: "500px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: "4rem",
      [theme.breakpoints.down("sm")]: {
        height: 300,
        fontSize: "3em",
      },
    },
    blogsContainer: {
      paddingTop: theme.spacing(3),
    },
    blogTitle: {
      fontWeight: 800,
      paddingBottom: theme.spacing(3),
    },
    card: {
      maxWidth: "100%",
    },
    media: {
      height: 240,
    },
    cardActions: {
      display: "flex",
      margin: "0 10px",
      justifyContent: "space-between",
    },
    author: {
      display: "flex",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  /**
   * UseEffect will be called when the component loads. This function will dispatch the getAllPets thunk
   * under the PetSlices which will get the list of pets. It accepts an object as its first parameter.
   * user id is being passed in order to query all pets whose owner is the current logged in user.
   */
  useEffect(() => {
    console.log(user._id);
    dispatch(GetAllPetsThunk({ id: user._id }));
    return () => {};
  }, [dispatch, user]);

  const onClose = (e) => {
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  /**
   * The rendering of component block
   */
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="My Pets" />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
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

        <Typography variant="h4" className={classes.blogTitle}>
          My Pets
        </Typography>
        <CreatePet />
        <Grid container spacing={3}>
          {!loading &&
            pets &&
            pets.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card className={classes.card} to="petsprofile">
                  <CardActionArea
                    LinkComponent={StyledLink}
                    to={`/user/mypets/${pet._id}`}
                  >
                    <CardMedia
                      className={classes.media}
                      image={
                        pet.images
                          ? pet.images[0].url
                          : "https://news.cgtn.com/news/77416a4e3145544d326b544d354d444d3355444f31457a6333566d54/img/37d598e5a04344da81c76621ba273915/37d598e5a04344da81c76621ba273915.jpg"
                      }
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {pet.name}
                      </Typography>
                    </CardContent>
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

export default MyPets;
