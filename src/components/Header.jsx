// Purpose: logic and rendering for the header for the application once user is logged in
// Modelled from AppBar MUI component

import * as React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Settings,
  SearchIcon,
} from "@mui/icons-material";
import DashboardPage from "../pages/DashboardPage";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../styles/AppBarStyle";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      className="headerMenu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* TODO: need to update the styling on this menu and have other options show conditionally based on user role */}

      {/* Need to link to the own user's profile by fetching their id: */}
      <MenuItem onClick={handleMenuClose}>
        <AccountCircle />
        <Typography className="menuItem">Profile</Typography>
      </MenuItem>
      <Link to="/settings" className="menu">
        <MenuItem onClick={handleMenuClose}>
          <Settings />
          <Typography className="menuItem">Settings</Typography>
        </MenuItem>
      </Link>
      {/* Link this item to actually logging the user out: */}
      <MenuItem onClick={handleMenuClose}>
        <Logout />
        <Typography className="menuItem">Log out</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="headerBar">
        <Toolbar>
          <Link to="/dashboard" element={<DashboardPage />}>
            <IconButton>
              {/* Update this later to have better quality: */}
              <img
                src={require("../assets/weppreciate-logo.png")}
                alt={"We'ppreciate logo"}
              />
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* Need to adjust so this renders actual user photo and only uses base avatar if no photo is uploaded */}

              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
