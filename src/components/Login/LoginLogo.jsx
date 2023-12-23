// Logo rendering for login page

// Library imports
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginLogo() {
  return (
    <Link to="/">
      <Box className="loginLogo" 
      >
        <IconButton>
          <img className="logoSmall"
            src={"https://storage.googleapis.com/weppreciate-store/logo/weppreciate-logo-v1.png"}
            alt={"We'ppreciate logo"}
          />
        </IconButton>
      </Box>
    </Link>
  );
}
