import React from "react";
import PersistentDrawerLeft from "../../components/Layouts/UserSidebar";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "../../components/Layouts/Footer";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
//icons
// const ash = require("../../assets/01.jpg").default;
// const jen = require("../../assets/03.jpg").default;
// const mat = require("../../assets/02.jpg").default;
// const sai = require("../../assets/04.jpg").default;
const person = require("../../assets/person.svg").default;

const Aris = () => {
  const cards = [
    {
      title: "Sairyl H. Navasca",
      desc: "Lead Developer",
      image: person,
      alt: "Sai",
      fb: "https://www.facebook.com/saipot0620",
      mail: "mailto:sairyl.navasca@tup.edu.ph",
      no: "09669922375",
    },
    {
      title: "Jenny Gel Castor",
      desc: "Mobile Developer",
      image: person,
      alt: "Jen",
      fb: "https://www.facebook.com/jenny.castor.5454",
      mail: "mailto:jenny.castor@tup.edu.ph",
      no: "09657218242",
    },
    {
      title: "Mathew Jose Matanguihan",
      desc: "Mobile Developer",
      image: person,
      alt: "Mat",
      fb: "https://www.facebook.com/mathewmatanguihan01",
      mail: "mailto:mathewjose.matanguihan@tup.edu.ph",
      no: "09773932863",
    },
    {
      title: "Ashley Jullien Supnet",
      desc: "Web Developer",
      image: person,
      alt: "Ash",
      fb: "https://www.facebook.com/aj.supnet/",
      mail: "mailto:ashleyjullien.supnet@tup.edu.ph",
      no: "09755895101",
    },
  ];

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
      <PersistentDrawerLeft title="ARIS" />

      <Container sx={{ py: 5 }} maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ textTransform: "capitalize" }}
          align="center"
        >
          <b>
            <i>Meet the ARIS Team</i>
          </b>
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          For Questions, Concerns, and Reports related to ARIS, you may contact
          us!
        </Typography>

        <br />

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={3} lg={3}>
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
                  <CardMedia
                    sx={{
                      pt: "100%",
                    }}
                    image={card.image}
                    alt={card.alt}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ alignSelf: "center" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography color="text.secondary">{card.desc}</Typography>
                  </CardContent>

                  <IconButton>
                    <a href={card.fb} target="_blank" rel="noreferrer">
                      <FacebookRoundedIcon />
                    </a>
                  </IconButton>
                  <IconButton>
                    <address>
                      <a href={card.mail} target="_blank" rel="noreferrer">
                        <EmailRoundedIcon />
                      </a>
                    </address>
                  </IconButton>

                  <IconButton>
                    <PermPhoneMsgRoundedIcon />
                    <Typography>{card.no}</Typography>
                  </IconButton>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <br />

        <Grid container xs>
          <Typography variant="h5">ARIS Terms and Conditions</Typography>
          <Divider width="100%"></Divider>
          <Typography variant="p">[]</Typography>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Aris;
