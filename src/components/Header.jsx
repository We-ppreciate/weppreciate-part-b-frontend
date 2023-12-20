// Purpose: logic and rendering for the header for the application once user is logged in

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Typography,
  InputBase,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";

import DashboardPage from "../pages/DashboardPage";
import { userData } from "../utils/LocalStorage";

// Styling for Appbar
// TODO - see if this can work in a separate file

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  // Logic for clicking on log out button
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("jwtToken", "");
    localStorage.setItem("loggedInUser", "");
    navigate("/login", { state: { from: window.location.pathname } });
  };

  // Establishing menu logic
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
      <Link to={"/profile/" + userData.id} className="menu">
        <MenuItem onClick={handleMenuClose}>
          <AccountCircle />
          <Typography className="menuItem">Profile</Typography>
        </MenuItem>
      </Link>
      <Link to="/settings" className="menu">
        <MenuItem onClick={handleMenuClose}>
          <Settings />
          <Typography className="menuItem">Settings</Typography>
        </MenuItem>
      </Link>
      <div onClick={handleLogout}>
        <MenuItem onClick={handleMenuClose}>
          <Logout />
          <Typography className="menuItem">Log out</Typography>
        </MenuItem>
      </div>
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
              <Avatar
                alt={`${userData.name.first} ${userData.name.last}`}
                src={userData.userPhotoKey}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
