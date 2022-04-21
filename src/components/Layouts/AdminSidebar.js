import { styled, useTheme } from "@mui/material/styles";
import { StyledLink } from "../../assets/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Notifications from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreVert from "@mui/icons-material/MoreVert";

import { AdminNavMenu } from "../../helpers/admin_nav";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const [open, setOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.user);

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Badge = Healtreports */}
      <MenuItem
        component={StyledLink}
        to="/admin/bitecases"
        onClick={handleMenuClose}
      >
        <IconButton
          size="large"
          aria-label="show new health reports"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Health Reports</p>
      </MenuItem>

      {/* Email */}
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          {/* <Badge badgeContent={17} color="error"> */}
          <MailIcon />
          {/* </Badge> */}
        </IconButton>
        <a
          href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          target="_blank"
          rel="noreferrer"
        >
          <p>Email</p>
        </a>
      </MenuItem>

      <MenuItem
        component={StyledLink}
        to="/admin/profile"
        onClick={handleMenuClose}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
          <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
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
            <ListItemButton component={StyledLink} to="/admin">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/admin/bitecases">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <MonitorHeartIcon />
              </ListItemIcon>
              <ListItemText primary="Bite Cases" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/admin/appointments">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <DateRangeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/admin/inventory">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <WarehouseIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={StyledLink} to="/admin/analytics">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={StyledLink} to="/admin/announcements">
              <ListItemIcon sx={{ color: "#f32727" }}>
                <CampaignIcon />
              </ListItemIcon>
              <ListItemText primary="Announcements" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />
        <List>
          <AdminNavMenu handleDrawerClose={handleDrawerClose} />
        </List>
      </Drawer>
    </Box>
  );
}
