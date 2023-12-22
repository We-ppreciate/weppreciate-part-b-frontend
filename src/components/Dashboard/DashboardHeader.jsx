import { Typography, Box } from "@mui/material";
import { userData } from "../../utils/LocalStorage";

export default function DashboardHeader() {

  return (
    <Box className="pageHeading">
      <Typography component="h1" variant="h3">
        Hi there, {userData.name.first}!
      </Typography>
      <Typography variant="h6">
        It's a good day to We'ppreciate ☀️
      </Typography>
    </Box>
  );
}
