// TODO
// This will be the page component to hold all other components specific to the Settings page

import Header from "../components/Header";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";

export default function SettingsPage() {
  return (
    <body>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <h1>Settings Placeholder</h1>
      </ThemeProvider>
    </body>
  );
}
