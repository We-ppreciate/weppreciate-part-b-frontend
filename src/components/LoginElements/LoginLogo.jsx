import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";

export default function LoginLogo() {
  return (
    <Box
      sx={{
        marginBottom: 3,
      }}
    >
      {/* TODO: add a link here later to the homepage */}
      <IconButton>
        <img
          src={require("../../assets/weppreciate-logo.png")}
          alt={"We'ppreciate logo"}
        />
      </IconButton>
    </Box>
  );
}
