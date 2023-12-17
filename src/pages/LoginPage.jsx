// This will be the page component to hold all other components specific to the Login page

import { useState } from "react";
import { Container } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoginLanding from "../components/Login/LoginLanding";
import SignIn from "../components/Login/SignIn";
import ForgotPassword from "../components/Login/ForgotPassword";
import GuestLogin from "../components/Login/GuestLogin";
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
      <CssBaseline />
      <Container >
        {renderView()}
      </Container>
    </ThemeProvider>
  );
}
