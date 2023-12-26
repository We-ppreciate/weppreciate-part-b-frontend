// Purpose: for rendering the Profile page, by pulling in the different components that form it

// React imports
import React, { useState, useEffect } from "react";
// Library imports
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { Home } from "@mui/icons-material";
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
  const navigate = useNavigate();

  // Establishing states
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Importing user's details by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + `users/one/id/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        if (!response.ok) {
          // If invalid user id is entered, the user is redirected to the dashboard
          if (response.status === 500) {
            setErrorMessage(
              <Alert severity="error">
                Invalid profile - redirecting to dashboard
              </Alert>
            );
            navigate("/dashboard");
            return;
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        }
  
        const data = await response.json();
        setProfileData(data.User);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(
          <Alert severity="error">
            An error occurred - redirecting to dashboard
          </Alert>
        );
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id, navigate]);  

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      {/* Display any error message here */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
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
