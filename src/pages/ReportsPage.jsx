// TODO
// This will be the page component to hold all other components specific to the Reports page

import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";



export default function ReportsPage() {
  return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <h1>Reports placeholder</h1>
      </ThemeProvider>
  );
}
