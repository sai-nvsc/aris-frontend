import React from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Divider,
  Typography,
} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
// import Footer from "../../components/Layouts/Footer";
import tc from "../../assets/tc.jpg";

const Aris = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mt: 3,
        mb:5,
      }}
      id="policies"
    >
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs>
            <Card
              sx={{
                width: "100%",
              }}
            >
              <CardMedia
                height="auto"
                component="img"
                image={tc}
                alt="policies"
              />
            </Card>
          </Grid>
        </Grid>
        <br />
        <br />

        <Grid container xs>
          <Typography variant="h4">
            <b>ARIS Terms and Conditions</b>
          </Typography>
          <Divider width="100%"></Divider>
          <Typography variant="p" align="justify" sx={{ mt: 2 }}>
            I hereby authorize the Anti-Rabies Immunoinformatics System, to
            collect, process, and store the data indicated herein to conduct
            rabies vaccination monitoring & other relevant steps to combat
            rabies virus. I understand that my personal information is protected
            by RA 10173 or the Data Privacy Act of 2012.
          </Typography>
          <br />
          <Typography variant="p" align="justify" sx={{ mb: 8 }}>
            (Pinahihintulutan ko ang Anti-Rabies Immunoinformatics System upang
            mangolekta, iproseso, at iimbak ang datos na ipinahihiwatig dito
            upang maisagawa ang pamamahala ng rabies vaccination at iba pang
            hakbang para malabanan ang rabies virus. Naiintindihan ko na ang
            aking personal na impormasyon ay protektado ng RA 10173 o Data
            Privacy Act of 2012.)
          </Typography>
        </Grid>

        <Grid container xs>
          <Typography variant="h4">
            <b>ARIS Privacy Policy</b>
          </Typography>
          <Divider width="100%"></Divider>
          <Typography variant="p" align="justify" sx={{ mt: 2, mb: 1 }}>
            A.R.I.S (Anti-Rabies Immunoinformatics System) is a system that aims
            to provide anti-rabies immunization services to animal bite centers
            and other facilities that are legible to administer anti rabies
            vaccines in Taguig City. Animal Bite Centers and public or private
            clinics that is ARIS integrated can scan QR codes of the registered
            patients instead of manually filling out exposure forms and patient
            records. The web and mobile application enables you track your
            vaccination status from time to time, find and set an appointment
            with the nearest Animal Bite Clinics & Treatment Centers (ABCTC)
            that provides anti-rabies services, monitor your pets vaccination
            status and history, read and view the latest data and news related
            to rabies exposures.
          </Typography>
          <Typography variant="p" align="justify">
            The system, which is made available in desktop and mobile phones,
            aims to help the city to collect, manage, analyze and monitor
            individual’s information easier and more accurate. We ensure the
            confidentiality of data and user’s safety. Thus, we will only
            require what is completely necessary for the system to perform its
            functions. No information will be collected from our users until
            they have agreed to the terms and conditions along with our privacy
            policy and have given their consent. This page is used to inform the
            reader regarding our policies with the collection, use, and
            disclosure of Personal Information if anyone decided to use our
            Service.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>WHAT INFORMATION WE COLLECT FROM THE USER</b>
          </Typography>

          <Typography variant="p" align="justify">
            The personal information that is collected by ARIS will be handled,
            stored, and protected in accordance with the Republic Act 10173 or
            the Data Privacy Act of 2012. ARIS will collect, use, or disclose
            your personal information only in accordance with this policy and
            the Data Privacy Act of 2012.
          </Typography>
          <br />
          <Typography variant="p" align="justify">
            We only collect personal data for specified and legitimate purposes
            determined and declared before, or as soon as reasonably practicable
            after collection, and later processed in a way compatible with such
            declared, specified and legitimate purposes only.
          </Typography>

          <Typography variant="p" align="justify" sx={{ mt: 3, mb: 3 }}>
            These are the following data needed upon registering, with the
            corresponding purpose:
          </Typography>

          <Typography variant="p" align="justify">
            1. Avatar - so user can customize their profile. The image uploaded
            will not be monitored by the ABC's and the developers.
          </Typography>
          <Typography variant="p" align="justify">
            2. Name – so ABC's or Health Centers may properly identify the right
            person when vaccination is made.
          </Typography>
          <Typography variant="p" align="justify">
            3. Address – so location will be determined and record bite or
            scratch exposures properly.{" "}
          </Typography>
          <Typography variant="p" align="justify">
            4. Gender - so the ABC's or Health Centers may classify the users
            sexuality.
          </Typography>
          <Typography variant="p" align="justify">
            5. Birthdate – being used for proper identification and in case
            multiple persons have the same name.
          </Typography>
          <Typography variant="p" align="justify">
            6. Email – so the system can have a unique identification.{" "}
          </Typography>
          <Typography variant="p" align="justify">
            7. User Name - so the system can have an option for unique
            identification aside from the email.
          </Typography>
          <Typography variant="p" align="justify">
            8. Password – for security purpose of your account but take note
            that only the system can get this, even the developers couldn’t see
            your input.
          </Typography>
          <Typography variant="p" align="justify">
            9. Mobile Number (Optional) - so the ABC's or Health Centers may
            contact you regarding your vaccination or rabies-related health
            reports.
          </Typography>
          <Typography variant="p" align="justify" sx={{ mb: 4 }}>
            10. Consent for using ARIS - to know the user’s consent if they want
            to use the service.
          </Typography>

          <Typography variant="p" align="justify">
            While the ARIS does not require some other personal information when
            creating their profile upon registration, users have an option to
            update or complete their profile after.{" "}
          </Typography>

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>GRANTING DEVICE ACCESS</b>
          </Typography>
          <Typography variant="p" align="justify">
            Granting access to the gallery will give the system access to the
            device’s gallery file but will limit and only allow users to select
            one photo for uploading. The app will not be able to use nor access
            videos or any other type of file on the device.
          </Typography>
          <br />
          <Typography variant="p" align="justify">
            {" "}
            Granting access to the device's location will give the system access
            to your real-time location and will only be used when searching for
            nearest ABC or Health Center near you. The system can locate up to
            5km away clinics from your current location. Disabling this
            permission will affect the appointment scheduling feauture of the
            system.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>HOW WILL PERSONAL INFORMATION BE COLLECTED?</b>
          </Typography>

          <Typography variant="p" align="justify">
            1. After downloading the mobile app or accessing the ARIS website,
            you will be able to enter some required personal information stated
            above for registration.
          </Typography>
          <Typography variant="p" align="justify">
            2. You need to provide your valid email address for validation using
            an autogenerated email confirmation.
          </Typography>
          <Typography variant="p" align="justify">
            3. Once registration is completed, you now have your unique QR code
            which will be scanned every appointment or your vaccination.
          </Typography>
          <Typography variant="p" align="justify">
            4. During your active rabies vaccination, you can send health
            reports or update the clinic with your rabies-related concerns.
          </Typography>

         {/*  <Typography sx={{ mt: 4, mb: 4 }}>
            <b>LOG DATA</b>
          </Typography>
          <Typography variant="p" align="justify">
            We want to inform you that whenever you use our Service, in a case
            of an error in the app we collect data and information (through
            third party products) on your device called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing our Service, the time and date of your use of
            the Service, and other statistics. The Log Data are statistical and
            technical data that does not contain personal information and are
            merely collected to improve the application’s services.
          </Typography> */}

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>TOKENS</b>
          </Typography>
          <Typography variant="p" align="justify">
            Tokens, usually referring to JSON Web Tokens (JWTs), are signed
            credentials encoded into a long string of characters created by the
            server. At the sign-in request, an authentication token is assigned
            to the user. It will be used to authorize the user and authenticate
            subsequent interactions with the application. The authentication
            token assigned to the user is only valid for a specific period of
            time. If the token becomes invalid, the user needs to be
            re-authenticated before access can be granted.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>WHAT DO WE DO WITH THE COLLECTED DATA</b>
          </Typography>
          <Typography variant="p" align="justify">
            This data would only be retained and used specifically for the
            purpose of monitoring rabies exposure cases and rabies vaccination.
            The said data would only be used by the ARIS or Anti-Rabies
            Immunoinformatics Systems integrated clinics. The system is
            available both in web and mobile.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4 }}>
            <b>RETENTION OF PERSONAL DATA AND COLLECTED DATA</b>
          </Typography>
          <Typography variant="p" align="justify">
            We and/or our duly authorized third party shall retain the Personal
            Data and Collected Data for as long as necessary for the fulfillment
            and standards of the Department of Health and in any case provided
            by the law counted from the date you provide it to us or when they
            were collected, respectively.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4, textTransform: "uppercase" }}>
            <b>Disclosure and Sharing of Personal Data and Collected Data</b>
          </Typography>
          <Typography variant="p" align="justify">
            We may disclose and share the Personal Data and Collected Data,
            subject to compliance with applicable laws and regulations, on a
            need to know basis, and in all cases only for legitimate business
            purposes, as follows:
          </Typography>
          <Typography variant="p" align="justify" sx={{mt:2}}>
            <ul>
              <li>
                {" "}
                To contractors, service providers, and other third parties who
                We engage to support our business, and who are bound by
                contractual obligations to keep Customer Information and
                Collected Data confidential, and use it only for the purposes
                for which We disclose it to them;
              </li>
              <li>
                {" "}
                To government and law enforcement agencies and regulatory
                bodies;
              </li>
              <li>
                {" "}
                To comply with orders of courts, government agencies, regulatory
                bodies, stock exchanges and with applicable laws and
                regulations;
              </li>
              <li>
                {" "}
                If we believe disclosure is necessary or appropriate to protect
                our rights, property, or safety, and our employees, or other
                third parties; and
              </li>
              <li>
                {" "}
                To conduct investigations of breaches of our internal policies,
                laws and regulations, enforce appropriate sanctions and pursue
                legal actions, if necessary.
              </li>
            </ul>
          </Typography>

          <Typography sx={{ mt: 4, mb: 4, textTransform: "uppercase" }}>
            <b>Accessing and Correcting Your Personal Data</b>
          </Typography>
          <Typography variant="p" align="justify">
            You are entitled to certain rights in relation to the Personal Data
            collected from you, including the right to access and correct your
            Personal Data being processed, object to the processing, and to
            lodge a complaint before the National Privacy Commission in case of
            violation of your rights as data subject. You may send us an e-mail
            at <b>aris.developers1@gmail.com</b> to request access to, correct
            and/or delete any Personal Data that you have provided to us.
          </Typography>
          <br />
          <Typography variant="p" align="justify">
            Please be advised, however, that we cannot delete your Personal Data
            without restricting or removing our ability to effectively address
            your Concerns or process submitted resumes for employment purposes.
            We may not accommodate a request to correct and/or delete Personal
            Data if we believe the same would violate any law or legal
            requirement or cause the Personal Data to be incorrect.
          </Typography>

          <Typography sx={{ mt: 4, mb: 4, textTransform: "uppercase" }}>
            <b>Security of your Personal Data and the Collected Data</b>
          </Typography>
          <Typography variant="p" align="justify" sx={{ mb: 4 }}>
            {" "}
            We have implemented technical, organizational, and physical measures
            designed to protect the confidentiality, integrity, and availability
            of your Personal Data and Collected Data and secure such Data from
            destruction, unauthorized access, alteration, disclosure, fraudulent
            misuse and/or any other unlawful processing, as well as other
            natural and human dangers.
          </Typography>

          <Typography variant="p" color="text.secondary">
            <i>Last Updated: April 17, 2022</i>
          </Typography>
        </Grid>
      </Container>
      {/* <Footer /> */}
    </Box>
  );
};

export default Aris;
