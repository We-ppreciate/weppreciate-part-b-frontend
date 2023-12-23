// Purpose: for rendering the Home page, by pulling in the different components that form it

// Library imports
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
// Local imports
import appTheme from "../styles/Theme";
import "../styles/home.css"
import HomeHeader from "../components/Home/HomeHeader";
import HomeContent from "../components/Home/HomeContent";

export default function HomePage() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
        <HomeHeader/>
        <HomeContent/>
    </ThemeProvider>
  );
}
