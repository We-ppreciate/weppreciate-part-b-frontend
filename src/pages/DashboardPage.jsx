// Purpose: for rendering the Dashboard, by pulling in the different components that form it

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Header from "../components/Header";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import CardElement from "../components/Dashboard/CardElement";
import appTheme from "../styles/Theme";
import SendCardButton from "../components/Dashboard/SendCardButton";

export default function DashboardPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <DashboardHeader />
      <SendCardButton />
      <CardElement />
    </ThemeProvider>
  );
}
