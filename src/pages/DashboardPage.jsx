// Purpose: for rendering the Dashboard, by pulling in the different components that form it

// Library imports
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Local imports
import appTheme from "../styles/Theme";
import "../styles/dashboardprofile.css"
import Header from "../components/Header";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import SendCardButton from "../components/Dashboard/SendCardButton";
import DashboardCards from "../components/Dashboard/DashboardCards";

export default function DashboardPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <DashboardHeader />
      <SendCardButton />
      <DashboardCards />
    </ThemeProvider>
  );
}
