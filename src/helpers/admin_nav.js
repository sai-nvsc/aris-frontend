import React from "react";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { LogoutUserThunk } from "../redux/slices/UserSlices";
import { StyledLink, StyledListItem } from "../assets/styles";
import { AccountCircleOutlined } from "@mui/icons-material";
import HdrAutoIcon from '@mui/icons-material/HdrAuto';

export const AdminNavMenu = ({ handleDrawerClose }) => {
  const dispatch = useDispatch();

  const AdminLogout = (e) => {
    dispatch(LogoutUserThunk());
  };

  const admin_nav = [
    {
      title: "My Account",
      icon: <AccountCircleOutlined />,
      path: "/admin/profile",
    },
    {
      title: "Admin",
      icon: <SupervisedUserCircleIcon />,
      path: "/admin/auth",
    }, 
    {
      title: "ARIS",
      icon: <HdrAutoIcon />,
      path: "/admin/ARIS",
    },
    {
      title: "Logout",
      icon: <LogoutIcon />,
      path: "#",
      onclick: AdminLogout,
    },
   
  ];

  return (
    <>
      <List>
        {admin_nav.map((item) => (
          <StyledLink to={item.path} key={item.title}>
            <ListItem button key={item.title} onClick={item.onclick}>
              <ListItemIcon sx={{color:"#f32727"}}>{item.icon}</ListItemIcon>

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
