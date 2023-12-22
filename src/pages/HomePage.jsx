// Purpose: for rendering the Home page, by pulling in the different components that form it

import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import HomeHeader from "../components/Home/HomeHeader";
import HomeContent from "../components/Home/HomeContent";
import appTheme from "../styles/Theme";
import "../styles/home.css"

export default function HomePage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
        <HomeHeader/>
        <HomeContent/>
    </ThemeProvider>
  );
}
