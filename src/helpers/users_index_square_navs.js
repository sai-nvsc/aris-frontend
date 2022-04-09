import React from "react";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { MdAnnouncement, MdPets } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { LogoutUserThunk } from "../redux/slices/UserSlices";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";

import { StyledLink, StyledListItem } from "../assets/styles";

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
      title: "ARIS",
      icon: <HdrAutoIcon />,
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
      <List>
        {user_nav.map((item) => (
          <StyledLink to={item.path} key={item.title}>
            <ListItem button key={item.title} onClick={item.onclick}>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <StyledListItem
                primary={item.title}
                sx={{ fontWeight: "bold" }}
              />
              <Typography>{item.sub}</Typography>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </>
  );
};
