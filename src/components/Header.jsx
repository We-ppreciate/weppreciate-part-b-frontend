// TODO
// This will be the header component to be displayed on all pages once logged in

// Have added MUI component "app bar with search" and working on customising:

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";
import DashboardPage from "../pages/DashboardPage";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";

// TODO: refactor the MUI component here to use ThemeProvider/css instead of styled

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
      <MenuItem onClick={handleMenuClose}><AccountCircle/><Typography>Profile</Typography></MenuItem>
      <Link to="/settings">
        <MenuItem onClick={handleMenuClose}><Settings/><Typography>Settings</Typography></MenuItem>
      </Link>
      {/* Link this item to actually logging the user out: */}
      <MenuItem onClick={handleMenuClose}><Logout/><Typography>Log out</Typography></MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
      position="static" className="headerBar"> 
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
