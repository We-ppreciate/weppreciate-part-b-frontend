// TODO
// This will be the page component to hold all other components specific to the Dashboard

import Header from "../components/Header";
import {CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import DashboardHeader from "../components/DashboardElements/DashboardHeader";
import CardElement from "../components/DashboardElements/CardElement";
import PaginationElement from "../components/DashboardElements/PaginationElement";
import SendCardButton from "../components/DashboardElements/SendCardButton";
import appTheme from "../styles/Theme";


export default function DashboardPage() {
  return (
    <body>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <DashboardHeader />
        <SendCardButton/>
        {/* TODO: placeholder while building card design */}
        <CardElement/>
        <CardElement/>
        <PaginationElement/>
      </ThemeProvider>
    </body>
  );
}
