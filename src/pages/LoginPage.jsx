// Purpose: for rendering the Login page, by pulling in the different components that form it

import { Container } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import SignIn from "../components/Login/SignIn";
import appTheme from "../styles/Theme";
import "../styles/login.css"

export default function LoginPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Container>
        <SignIn />
      </Container>
    </ThemeProvider>
  );
}