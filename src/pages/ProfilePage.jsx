import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { CircularProgress, CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";
import ProfileCard from "../components/Profile/ProfileCard";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
        <div className="profileLoader"><CircularProgress/></div>
      ) : (
        <ProfileCard apiData={profileData} />
      )}
    </ThemeProvider>
  );
}
