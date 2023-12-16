import * as React from "react";

import { Button, Box, Container } from "@mui/material";
import { NoAccounts, VerifiedUser } from "@mui/icons-material";

import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";

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
