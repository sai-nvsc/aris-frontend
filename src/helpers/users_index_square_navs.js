import React, {useState} from "react";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { MdAnnouncement, MdPets } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button,Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemIcon, Paper, Typography } from "@mui/material";
import { LogoutUserThunk } from "../redux/slices/UserSlices";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import { StyledLink, StyledListItem } from "../assets/styles";
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      id="draggable-dialog-title"
    >
      <Paper {...props} />
    </Draggable>
  );
};

export const user_services = [
  {
    title: "Profile",
    path: "/user/myprofile",
    icon: <BsPersonFill size="10em" />,
    sub: "View my profile details...",
  },
  {
    title: "Anti-Rabies Vaccination",
    path: "/user/myvaxx",
    icon: <RiFolderHistoryFill size="10em" />,
    sub: "View vaccination History...",
  },
  {
    title: "Apppointments",
    path: "/user/schedules",
    icon: <BsFillCalendarCheckFill size="10em" />,
    sub: "View or Create appointments...",
  },
  {
    title: "Pets",
    path: "mypets",
    icon: <MdPets size="10em" />,
    sub: "View my pets vaccination history...",
  },
  {
    title: "Announcements",
    path: "/user/view/announcements",
    icon: <MdAnnouncement size="10em" />,
    sub: "View latest news and announcements...",
  },
  {
    title: "ARIS Reports",
    path: "/user/reports",
    icon: <HiDocumentReport size="10em" />,
    sub: "View latest anti rabies statistics and reports...",
  },
];

export const UserNavMenu = ({ handleDrawerClose }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Logout = (e) => {
    dispatch(LogoutUserThunk());
  };

  const user_nav = [
    {
      title: "Home",
      icon: <AiFillHome />,
      path: "/user/",
      onclick: handleDrawerClose,
    },
    {
      title: "My QR Code",
      icon: <QrCode2RoundedIcon sx={{fontSize:'large'}} />,
      path: "#",
      onclick: handleOpen,
    },
    {
      title: "ARIS",
      icon: <HdrAutoIcon sx={{fontSize:'large'}} />,
      path: "/user/ARIS",
      onclick: handleDrawerClose,
    },
    {
      title: "Logout",
      icon: <RiLogoutBoxFill />,
      path: "#",
      onclick: Logout,
    },
  ];

  return (
    <>
      <List sx={{ml:2}}>
        {user_nav.map((item) => (
          <StyledLink to={item.path} key={item.title}>
            <ListItem button key={item.title} onClick={item.onclick}>
              <ListItemIcon sx={{ color: "#f32727" }}>{item.icon}</ListItemIcon>

              <StyledListItem
                primary={item.title}
                sx={{ fontWeight: "bold" }}
              />
              <Typography>{item.sub}</Typography>
            </ListItem>
          </StyledLink>
        ))}
      </List>

  <Dialog 
    open={open} 
    onClose={handleClose} 
    maxWidth="sm"
    PaperComponent={PaperComponent}
>
    <DialogTitle sx={{ cursor: 'move' }} id="draggable-dialog-title">
      My QR Code
    </DialogTitle>
      <DialogContent >    
        <Box
            component="img"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user._id}`}
            alt="ARIS QR CODE"
            sx={{height: 275}}
                  />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ mt: 3, mb: 1 }}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
  </Dialog>
    </>
  );
};
