import { Typography, Box } from "@mui/material";

export default function DashboardHeader() {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <Box className="pageHeading">
      <Typography component="h1" variant="h3">
        Hi there, {userData.name.first}!
      </Typography>
      <Typography component="subtitle1" variant="h6">
        It's a good day to We'ppreciate ☀️
      </Typography>
    </Box>
  );
}
