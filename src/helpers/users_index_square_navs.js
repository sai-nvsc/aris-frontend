import React from "react";
import { RiFolderHistoryFill } from "react-icons/ri";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { MdAnnouncement, MdPets } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { LogoutUserThunk } from "../redux/slices/UserSlices";

import { StyledLink, StyledListItem } from "../assets/styles";

export const user_services = [
  {
    title: "Anti-Rabies Vaccination",
    path: "/user/myvaxx",
    icon: <RiFolderHistoryFill size="10em" />,
  },
  {
    title: "My Profile",
    path: "/user/myprofile",
    icon: <BsPersonFill size="10em" />,
  },
  {
    title: "My Apppointments",
    path: "/user/schedules",
    icon: <BsFillCalendarCheckFill size="10em" />,
  },
  { title: "My Pets", path: "mypets", icon: <MdPets size="10em" /> },
  {
    title: "Announcements",
    path: "/user/view/announcements",
    icon: <MdAnnouncement size="10em" />,
  },
  {
    title: "ARIS Reports",
    path: "/stat/reports",
    icon: <HiDocumentReport size="10em" />,
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
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </>
  );
};
