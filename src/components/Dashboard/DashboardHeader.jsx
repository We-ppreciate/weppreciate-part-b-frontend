import { Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { fullUsersUrl } from "../../utils/ApiPaths";

export default function DashboardHeader() {
  const userEmail = localStorage.getItem("loggedInEmail");

  // Establishing states
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  // Importing full users info
  useEffect(() => {
    const fetchFullUsers = async () => {
      try {
        // Retrieve JWT token from local storage
        const jwtToken = localStorage.getItem("jwtToken");

        // Include the token in the GET request headers
        const response = await axios.get(fullUsersUrl, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        // TODO: convert userEmail to lowercase when comparing for edge cases
        const matchingUser = response.data.Users.find(
          (user) => user.email === userEmail
        );
        setUser(matchingUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullUsers();
  }, [userEmail]);

  // TODO: better loading experience
  return (
    <div>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Box className="pageHeading">
          <Typography component="h1" variant="h3">
            Hi there, {user.name.first}!
          </Typography>
          <Typography component="subtitle1" variant="h6">
            {/* TODO: have an assortments of greetings and render a random one each time */}
            It's a good day to We'ppreciate ☀️
          </Typography>
        </Box>
      )}
    </div>
  );
}
