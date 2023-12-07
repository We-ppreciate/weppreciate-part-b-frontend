import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function DashboardHeader() {
  return (
    <Box
      sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h3">
        Hi there, Nate!
      </Typography>
      <Typography component="subtitle1" variant="h6">
        It's a good day to We'ppreciate ☀️
      </Typography>
    </Box>
  );
}
