import {
  Button,
  Card,
  TextField,
  TableCell,
  TableRow,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const StyledButton = styled(Button)({
  background: "#f32727", //button color
  color: "white", //text-color
  marginTop: 5,
  marginBottom: 2,
  marginRight: 4,
  borderRadius:4,

  "&:hover": {
    background: "#ffb8b2",
    borderColor: "black",
    color:"black"  },
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
  fontSize: 20,
  color: "gray",
  fontWeight: 500,
  // fontFamily:
  //   '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  margin: 0,
});

export const PetProfileValue = styled(Typography)({
  fontSize: 30,
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
  fontSize: 50,
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
  boxShadow: "-1px 1px 3px 2px lightgray"
});


export const AdminProfileCard = styled(Card)({
  marginTop: 40,
  transition: "0.3s",
  width: "100%",
  overflow: "initial",
  background: "#ffffff",
  borderRadius: 12,
  minWidth: 256,
  textAlign: "center",
  boxShadow: "-1px 1px 3px 2px lightgray",
  
});

export const AdminHeading = styled(Typography)({
  fontSize: 100,
  fontWeight: "bold",
  letterSpacing: "0.5px",
  marginTop: 8,
  marginBottom: 1,
});

export const LogButton = styled(Button)({
  background: "#ff8a80", //button color
  color: "black", //text-color
  marginTop: 5,
  marginBottom: 2,
  marginRight: 4,
  borderRadius:4,

  "&:hover": {
    background: "#f32727",
    borderColor: "black",
    color:"white", //text-color
  },
});

export const LogLink = styled(Link)({
  textDecoration: "none",
  //background: "white",
  color: "black",
  fontSize:"20px",
  textShadow: "-2px 2px 10px #ff8a80",

  "&:hover": {
    //background: "#FFBFB9",
    borderColor: "black",
    color:"#f32727", //text-color
    textDecoration:"underline",
    textShadow: "-2px 2px 10px #fff",
  },
});