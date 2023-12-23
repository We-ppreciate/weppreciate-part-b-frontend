// Logic and rendering for the header, displayed on all pages of the application once user is logged in

// React imports
import React from "react";
// Library imports
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
  alpha
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle, Logout, Settings } from "@mui/icons-material";

// Local imports
import { jwtToken, userData } from "../utils/LocalStorage";
import { useState } from "react";
import { apiUrl } from "../utils/ApiUrl";
import DashboardPage from "../pages/DashboardPage";

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

const SearchResultsContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "100%",
  width: "100%",
  zIndex: theme.zIndex.appBar,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  marginTop: theme.spacing(1),
  overflow: "hidden",
}));

export default function Header() {
  // Establishing states
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Don't make the API request for blank search
    if (query === "") {
      setSearchResults([]);
      return;
    }

    try {
      // Fetch data from the API using the search query
      const response = await fetch(apiUrl + `users/search/${query}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.Users) {
        setSearchResults(data.Users);
      } else {
        console.error("API response is missing expected structure:", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Logic for clicking on log out button
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");

    // Navigate to the login page
    navigate("/login");
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
              <img
                className="logoSmall"
                src={
                  "https://storage.googleapis.com/weppreciate-store/logo/weppreciate-logo-v1.png"
                }
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
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {/* Display search results dropdown */}
            {searchResults && searchResults.length > 0 && (
              <SearchResultsContainer>
                {searchResults.map((user) => (
                  <Link
                    to={`/profile/${user._id}`}
                    key={user._id}
                    className="searchResult"
                  >
                    {user.name.first} {user.name.last}
                  </Link>
                ))}
              </SearchResultsContainer>
            )}
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
