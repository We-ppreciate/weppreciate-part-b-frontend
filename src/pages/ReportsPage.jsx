// TODO
// This will be the page component to hold all other components specific to the Reports page

import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { Button, CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";
import { Link } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import { Home } from "@mui/icons-material";

export default function ReportsPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Link to="/dashboard" element={<DashboardPage />}>
        <Button className="backButton" startIcon={<Home />}>
          Back to Dashboard
        </Button>
      </Link>
      <h1>Reports placeholder</h1>
    </ThemeProvider>
  );
}
