import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function DashboardHeader() {
  return (
    <Box className="pageHeading">
      <Typography component="h1" variant="h3">
        {/* TODO: have this render the logged in user's name instead of static text */}
        Hi there, Nate!
      </Typography>
      <Typography component="subtitle1" variant="h6">
        {/* TODO: have an assortments of greetings and render a random one each time */}
        It's a good day to We'ppreciate ☀️
      </Typography>
    </Box>
  );
}
