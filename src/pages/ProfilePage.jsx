import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";

import Header from "../components/Header";
import appTheme from "../styles/Theme";
import ProfileCard from "../components/Profile/ProfileCard";

export default function ProfilePage() {
  const { id } = useParams();

  // Establishing states
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Importing user's details by id
  useEffect(() => {
    const fetchData = async () => {
      // TODO: convert this fetch to axios
      try {
        const response = await fetch(
          `https://weppreciate-api-05b8eaa3cdc2.herokuapp.com/users/one/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Error with network response");
        }
        const json = await response.json();
        setProfileData(json);
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
        <div className="loader"><CircularProgress/></div>
      ) : (
        <ProfileCard apiData={profileData} />
      )}
    </ThemeProvider>
  );
}
