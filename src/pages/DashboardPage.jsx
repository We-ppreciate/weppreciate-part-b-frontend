// TODO
// This will be the page component to hold all other components specific to the Dashboard

import Header from "../components/Header";
import {CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import CardElement from "../components/Dashboard/CardElement";
// import PaginationElement from "../components/Dashboard/PaginationElement";
import SendCardButton from "../components/SendCardButton";
import appTheme from "../styles/Theme";


export default function DashboardPage() {
  return (
    <body>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <DashboardHeader />
        <SendCardButton/>
        <CardElement/>
        {/* TODO: add back pagination once logic can be added */}
        {/* <PaginationElement/> */}
      </ThemeProvider>
    </body>
  );
}