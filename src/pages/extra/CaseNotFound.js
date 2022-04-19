import { useEffect } from "react";

import scarecrow from "../../assets/scarecrow.png";
import { StyledButton } from "../../assets/styles";

import { Container } from "./styles";

const CaseNotFound = () => {
  useEffect(() => {
    document.title = "A.R.I.S | 404 NOT FOUND";
    return () => {};
  });
  return (
    <>
      <Container data-testid="notfound-container">
        <section>
          <div>
            <img src={scarecrow} alt="straw man" />
            <h2>404 NOT FOUND</h2>
          </div>
          <div>
            <h1>I have bad news for you</h1>
            <p>The Bite Case id you entered do not belong to ARIS' Database.</p>
            <StyledButton
              variant="contained"
              onClick={(e) => {
                window.location.assign("/admin/bitecases");
              }}
            >
              BACK
            </StyledButton>
          </div>
        </section>
      </Container>
    </>
  );
};

export default CaseNotFound;
