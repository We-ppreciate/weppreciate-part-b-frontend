// This file contains the "Sign in" template from MaterialUI with only a few small adjustments so far
// This will be a work in progress for testing using this CSS component framework :)

import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { NoAccounts, VerifiedUser } from "@mui/icons-material";
import { Container } from "@mui/system";

const LoginLanding = ({ setView }) => {
  const handleExistingAccountClick = () => {
    setView("existingAccount");
  };

  const handleGuestRecognitionClick = () => {
    setView("guestRecognition");
  };

  return (
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginLogo />
          <LoginText />
          <Box sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<VerifiedUser />}
              sx={{ mt: 3, mb: 1 }}
              onClick={handleExistingAccountClick}
            >
              Log in with existing account
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<NoAccounts />}
              sx={{ mt: 1, mb: 1 }}
              onClick={handleGuestRecognitionClick}
            >
              Send recognition as guest
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default LoginLanding;
