// This will be the page component to hold all other components specific to the Login page

import LoginLanding from "../components/LoginElements/LoginLanding";
import { Container } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import SignIn from "../components/LoginElements/SignIn";
import { useState } from "react";
import ForgotPassword from "../components/LoginElements/ForgotPassword";
import GuestLogin from "../components/LoginElements/GuestLogin";
import appTheme from "../styles/Theme";

export default function LoginPage() {
  const [view, setView] = useState("default");

  const renderView = () => {
    switch (view) {
      case "existingAccount":
        return <SignIn setView={setView} />;
      case "guestRecognition":
        return <GuestLogin setView={setView} />;
      case "forgotPasswordView":
        return <ForgotPassword setView={setView} />;
      default:
        return <LoginLanding setView={setView} />;
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {renderView()}
      </Container>
    </ThemeProvider>
  );
}
