// Purpose: for rendering the Login page, by pulling in the different components that form it

// Library imports
import { Container } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Local imports
import appTheme from "../styles/Theme";
import "../styles/login.css"
import SignIn from "../components/Login/SignIn";

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