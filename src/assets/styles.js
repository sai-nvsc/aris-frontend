import {
  Button,
  Card,
  TextField,
  TableCell,
  TableRow,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const StyledButton = styled(Button)({
  background: "#ff8a80", //button color
  color: "black", //text-color
  marginTop: 5,
  marginBottom: 2,
  marginRight: 5,
});

export const StyledTextField = styled(TextField)({
  background: "white",
  borderRadius: 3,
});

export const StyledListItem = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    color: "black",
    fontWeight: "bold",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "black",
});

export const StyledTableCell = styled(TableCell)({
  textAlign: "center",
});

export const DeleteButton = styled(Button)({
  background: "#ff8a80", //button color
  color: "black", //text-color
  margin: 2,
  paddingTop: 2,
  paddingBottom: 2,
  variant: "contained",
  size: "medium",

  "&:hover": {
    background: "red",
    borderColor: "black",
  },
});

export const EditButton = styled(Button)({
  background: "white", //button color
  color: "black", //text-color
  margin: 2,
  paddingTop: 4,
  paddingBottom: 4,
  size: "medium",
  borderColor: "#ff8a80",

  "&:hover": {
    background: "white",
    borderColor: "white",
  },
});

export const ViewButton = styled(Button)({
  background: "white", //button color
  color: "black", //text-color
  margin: 2,
  paddingTop: 4,
  paddingBottom: 4,
  size: "medium",
  borderColor: "#ff8a80",

  "&:hover": {
    background: "#ff8a80",
    borderColor: "white",
  },
});

export const StyledTableRow = styled(TableRow)({
  "&:hover": {
    background: "#E9E9E9",
  },
  background: "white",
});

export const BiteCaseLabel = styled(Typography)({
  fontSize: 18,
  fontWeight: 500,
  // fontFamily:
  //   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  marginLeft: 25,
});

export const PetProfileLabel = styled(Typography)({
  fontSize: 12,
  color: "gray",
  fontWeight: 500,
  // fontFamily:
  //   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  margin: 0,
});

export const PetProfileValue = styled(Typography)({
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 4,
  letterSpacing: "1px",
});

export const Subheader = styled(Typography)({
  fontSize: 18,
  color: "gray",
  marginBottom: "0.875em",
});

export const ProfileHeading = styled(Typography)({
  fontSize: 25,
  fontWeight: "bold",
  letterSpacing: "0.5px",
  marginTop: 8,
  marginBottom: 0,
});

export const ProfileCard = styled(Card)({
  marginTop: 40,
  transition: "0.3s",
  width: "100%",
  overflow: "initial",
  background: "#ffffff",
  borderRadius: 12,
  minWidth: 256,
  textAlign: "center",
});
