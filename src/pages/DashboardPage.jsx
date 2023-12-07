// TODO
// This will be the page component to hold all other components specific to the Dashboard

import Header from "../components/Header";
import {CssBaseline } from "@mui/material";
import newTheme from "../styles/Theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DashboardHeader from "../components/DashboardElements/DashboardHeader";
import CardElement from "../components/DashboardElements/CardElement";
import PaginationElement from "../components/DashboardElements/PaginationElement";

const theme = createTheme(newTheme);

export default function DashboardPage() {
  return (
    <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <DashboardHeader />
        {/* TODO: placeholder while building card design */}
        <CardElement/>
        <CardElement/>
        <PaginationElement/>
      </ThemeProvider>
    </body>
  );
}
