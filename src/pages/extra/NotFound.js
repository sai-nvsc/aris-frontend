import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scarecrow from "../../assets/scarecrow.png";
import { StyledButton } from "../../assets/styles";
import Footer from "../../components/Layouts/Footer";
import { Container } from "./styles";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "A.R.I.S | 404 NOT FOUND";
    return () => {};
  });
  return (
    <Container data-testid="notfound-container">
      <section>
        <div>
          <img src={scarecrow} alt="straw man" />
          <h2>404 NOT FOUND</h2>
        </div>
        <div>
          <h1>I have bad news for you</h1>
          <p>
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <StyledButton
            variant="contained"
            onClick={(e) => {
              navigate(-1);
            }}
          >
            Back to homepage
          </StyledButton>
        </div>
      </section>
      <Footer />
    </Container>
  );
};

export default NotFound;
