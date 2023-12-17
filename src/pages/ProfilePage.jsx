import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  CircularProgress,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";

import Header from "../components/Header";
import appTheme from "../styles/Theme";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileRecognition from "../components/Profile/ProfileRecognition";
import axios from "axios";

export default function ProfilePage() {
  const { id } = useParams();

  // Establishing states
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: add error handling if id doesn't match one in DB
  // Importing user's details by id
  useEffect(() => {
    const fetchData = async () => {
      // TODO: convert this fetch to axios
      try {
        // Retrieve JWT from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Include the token in the GET request header
        const response = await axios.get(
          `https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/users/one/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
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
