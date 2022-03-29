import { createTheme } from "@mui/material/styles";

// This will be the theme of the whole system in the web to make the color scheme consistent.
export const aris_theme = createTheme({
  palette: {
    primary: {
      main: "#f32727",
    },
    button: {
      main: "#ff8a80",
      contrastText: "#000",
    },
    secondary: {
      main: "#ef9a9a",
    },
    background: {
      default: "#cfd8dc",
    },
    divider: "#b71c1c",
  },

  spacing: 10,
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    button: {
      lineHeight: 2.23,
      letterSpacing: "0.32em",
      fontSize: "0.9rem",
    },
  },
});
