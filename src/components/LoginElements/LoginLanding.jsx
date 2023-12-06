// This file contains the "Sign in" template from MaterialUI with only a few small adjustments so far
// This will be a work in progress for testing using this CSS component framework :)

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { NoAccounts, VerifiedUser } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function LoginLanding() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            <Button fullWidth variant="contained" startIcon={<VerifiedUser />} sx={{ mt: 3, mb: 1 }}>
              Log in with existing account
            </Button>
            <Button fullWidth variant="contained" startIcon={<NoAccounts />} sx={{ mt: 1, mb: 1 }}>
              Send recognition as guest
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
