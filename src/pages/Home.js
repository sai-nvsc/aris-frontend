// import Grid from './Index/Grid';
import { useState, useEffect } from "react";
import { Navigation } from "../components/Layouts/navigation";
import { Header } from "../components/Layouts/header";
import { Features } from "../components/Layouts/features";
import { About } from "../components/Layouts/about";
import { Services } from "../components/Layouts/services";
import { Testimonials } from "../components/Layouts/testimonials";
import { Team } from "../components/Layouts/Team";
import { Contact } from "../components/Layouts/contact";
import Footer from "../components/Layouts/Footer";

import Policies from "../components/Layouts/PrivacyPolicy";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "../App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="shortcut icon"
            href="img/favicon.ico"
            type="image/x-icon"
          />
          <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="img/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="img/apple-touch-icon-114x114.png"
          />

          <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="fonts/font-awesome/css/font-awesome.css"
          />
          <link rel="stylesheet" type="text/css" href="css/style.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="css/nivo-lightbox/nivo-lightbox.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="css/nivo-lightbox/default.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
            rel="stylesheet"
          />
          <title>A.R.I.S</title>
          <meta name="description" content="" />
          <meta name="author" content="Group8" />
          <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
          <script type="text/javascript" src="js/bootstrap.js"></script>
        </Helmet>

        <Navigation />
        <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
        {/* <Gallery data={landingPageData.Gallery}/> */}
        <Testimonials data={landingPageData.Testimonials} />
        <Team data={landingPageData.Team} />
        <Policies />        
        <Contact data={landingPageData.Contact} />
        <Footer/>

      </div>
    </HelmetProvider>
  );
};

export default Home;
