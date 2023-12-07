// TODO
// This will be the page component to hold all other components specific to the Settings page

import Header from "../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import newTheme from "../styles/Theme";
import { CssBaseline } from "@mui/material";

const theme = createTheme(newTheme);

export default function SettingsPage() {
    return(
        <body>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <h1>Settings Placeholder</h1>
      </ThemeProvider>
        </body>
    )
}