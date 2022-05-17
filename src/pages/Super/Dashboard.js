import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersistentDrawerLeft from "../../components/Layouts/SuperSidebar";
import { StyledLink } from "../../assets/styles";
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
  Typography,
  Divider,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Layouts/Footer";
import {
  GetAllCasesThunk,
} from "../../redux/slices/BiteCaseSlice";
import moment from "moment";

//icons
const acc = require("../../assets/9.svg").default;
const chart = require("../../assets/4.svg").default;
const clinic = require("../../assets/10.svg").default;


const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { bitecase } = useSelector((state) => state.bitecase);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "A.R.I.S | Super Admin";
    return () => {};
  }, []);

   useEffect(() => {
    dispatch(GetAllCasesThunk());
    return () => {};
  }, [dispatch]);

  const cards = [   
    {
      title: "Clinics",
      desc: "Manage ARIS partner clinics...",
      image: clinic,
      alt: "Clinics",
      to: "/s-admin/clinics",
    }, 
    {
      title: "Admins",
      desc: "Manage ARIS clinic admins...",
      image: acc,
      alt: "admins",
      to: "/s-admin/admins",
    },
   {
      title: "Analytics",
      desc: "View rabies reports and analytics...",
      image: chart,
      alt: "Analytics",
      to: "/s-admin/analytics",
    }, 
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 5,
        pb: 5,
      }}
    >
      <CssBaseline />
      <PersistentDrawerLeft title="Superadmin Dashboard" />
      <Container sx={{ py: 5 }} maxWidth="xl">
        <Typography
          variant="h3"
          sx={{ textTransform: "capitalize" }}
          align="center"
        >
          <b>
            <i>Welcome,</i> {user.role} {user.admin_name}
          </b>
        </Typography>
        <br />
        <Grid container item xs={12} spacing={2}>
           <Grid item xl={12} l={12} md={12} sm={12} xs={12}>
            <Paper elevation={14}
              style={{ margin: "0px 0px 8px 0px", border: "1px solid #e6e6e6" }}
            >   
              <StyledLink to="/s-admin/exposures">
                <Typography variant="h6" align="center">
                  Total Rabies Exposures Recorder
                </Typography>                
                  <Typography align="center" variant="h1">
                  {bitecase ? bitecase.length : 0}
                </Typography>                                      
                           
                 <Typography align="center" variant="subtitle2" color="text.secondary">
                  <i>As of {moment().format("MMMM DD, YYYY")}, Click for more details...</i>
                </Typography>
              </StyledLink>          
            </Paper>
          </Grid>
        
        </Grid>
      </Container>

      <Divider light />
      <Container sx={{}} maxWidth="xl">
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={4} md={4} lg={4} xl={4}>
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
                        <Typography gutterBottom variant="h5">
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
