// Purpose: for rendering the Profile page, by pulling in the different components that form it

// React imports
import React, { useState, useEffect } from "react";
// Library imports
import { Link, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import axios from "axios";
// Local imports
import appTheme from "../styles/Theme";
import "../styles/dashboardprofile.css";
import Header from "../components/Header";
import { apiUrl } from "../utils/ApiUrl";
import { jwtToken } from "../utils/LocalStorage";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileRecognition from "../components/Profile/ProfileRecognition";
import DashboardPage from "./DashboardPage";

export default function ProfilePage() {
  const { id } = useParams();

  // Establishing states
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: add error handling if id doesn't match one in DB
  // Importing user's details by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + `users/one/id/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log(response);

        setProfileData(response.data.User);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Link to="/dashboard" element={<DashboardPage />}>
        <Button className="backButton" startIcon={<Home />}>
          Back to Dashboard
        </Button>
      </Link>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Grid className="cardGrid" container spacing={0}>
          <ProfileCard apiData={profileData} />
          <ProfileRecognition apiData={profileData} />
        </Grid>
      )}
    </ThemeProvider>
  );
}
