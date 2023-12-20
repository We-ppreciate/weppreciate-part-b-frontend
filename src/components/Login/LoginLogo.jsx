import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginLogo() {
  return (
    <Link to="/">
      <Box className="loginLogo" 
      >
        <IconButton>
          <img
            src={require("../../assets/weppreciate-logo.png")}
            alt={"We'ppreciate logo"}
          />
        </IconButton>
      </Box>
    </Link>
  );
}
