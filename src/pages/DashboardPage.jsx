// Purpose: for rendering the Dashboard, by pulling in the different components that form it

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import CardElement from "../components/Dashboard/CardElement";
// import PaginationElement from "../components/Dashboard/PaginationElement";
import SendCardButton from "../components/SendCardButton";
import appTheme from "../styles/Theme";

export default function DashboardPage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <DashboardHeader />
      <SendCardButton />
      <CardElement />
      {/* TODO: add back pagination once logic can be added */}
      {/* <PaginationElement/> */}
    </ThemeProvider>
  );
}
