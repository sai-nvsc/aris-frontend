import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vh;
  min-height: 100vh;
  html {
    --e-global-color-text: #333333;
    --e-global-color-text-secondary: #4f4f4f;
    --e-global-color-button-text: #ffffff;
    --e-global-color-background: #ffffff;
    font-size: 16px;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body,
  input,
  button {
    font-family: "Space Mono", sans-serif;
    background: var(--e-global-color-background);
    color: var(--e-global-color-primary);
  }

  h1 {
    font-size: 3rem;
    letter-spacing: 0.84px;
    line-height: 71px;
    letter-spacing: -0.035em;
    color: var(--e-global-color-text);
    font-weight: 700;
  }

  p {
    font-size: 1.125rem;
    line-height: 27px;
    letter-spacing: -0.035em;
    color: var(--e-global-color-text-secondary);
  }

  button {
    cursor: pointer;
  }

  a,
  button {
    opacity: 1;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 4rem;
      line-height: 95px;
    }
    p {
      font-size: 1.5rem;
      line-height: 36px;
    }
  }
  header {
    margin-bottom: 9vh;
    color: blue;
  }
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-bottom: 8vh;

    img {
      width: 90%;
      min-width: 280px;
      margin-bottom: 8vh;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        margin-bottom: 3vh;
        color: #fb3357;
        margin-left: auto;
        margin-right: auto;
      }
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
      }
      p {
        margin-bottom: 7vh;
        align-self: flex-start;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 216px;
        height: 68px;
        background-color: var(--e-global-color-text);
        color: var(--e-global-color-button-text);
        text-decoration: none;
        font-size: 0.875rem;
        line-height: 21px;
        letter-spacing: -0.035em;
        transition: 0.4s ease-in-out opacity;
        text-transform: uppercase;
        font-weight: 700;
        align-self: flex-start;
        border-radius: 16px;
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    margin-bottom: 2vh;

    strong {
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      line-height: 17px;
      font-weight: 600;
      color: var(--e-global-color-text);
    }
  }

  @media (min-width: 850px) {
    padding: 4vh 5vw;

    section {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      img {
        max-width: 539px;
        max-height: 447px;
      }
      div {
        width: 50%;

        p {
          width: 58%;
        }
      }
    }
  }
`;
