import { styled, useTheme } from "@mui/material/styles";
import { StyledLink } from "../../assets/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LogoutIcon from "@mui/icons-material/Logout";
import { AccountBox, MedicalServices } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogoutUserThunk } from "../../redux/slices/UserSlices";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ title }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const AdminLogout = (e) => {
    dispatch(LogoutUserThunk());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        handleDrawerClose={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <i>{user.username}</i>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton component={StyledLink} to="/s-admin">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/s-admin/exposures">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <MonitorHeartIcon />
              </ListItemIcon>
              <ListItemText primary="Exposures" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/s-admin/clinics">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <MedicalServices />
              </ListItemIcon>
              <ListItemText primary="Clinics" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/s-admin/admins">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Admins" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/s-admin/users">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>

        <ListItem>
          <ListItemButton component={StyledLink} to="/s-admin/analytics">
            <ListItemIcon sx={{ color: "#f32727" }}>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton onClick={AdminLogout}>
            <ListItemIcon sx={{ color: "#f32727" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}
