// Purpose: for rendering the Dashboard, by pulling in the different components that form it

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Header from "../components/Header";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import appTheme from "../styles/Theme";
import SendCardButton from "../components/Dashboard/SendCardButton";
import DashboardCards from "../components/Dashboard/DashboardCards";
import "../styles/dashboardprofile.css"

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
