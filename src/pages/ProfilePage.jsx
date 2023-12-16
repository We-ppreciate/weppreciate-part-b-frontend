import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";
import ProfileCard from "../components/Profile/ProfileCard";
import LoadingSpinner from "../utils/Loading";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const [apiData, setApiData] = useState(null);
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
        setApiData(json);
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
        <LoadingSpinner />
      ) : (
        <ProfileCard apiData={apiData} />
      )}
    </ThemeProvider>
  );
}
