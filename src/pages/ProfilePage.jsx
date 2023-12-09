// TODO
// This will be the page component to hold all other components specific to the Profile page

import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";
import ProfileCard from "../components/ProfileElements/ProfileCard";
import "../styles/index.css"

// import { useParams } from "react-router-dom";


export default function ProfilePage() {
//   const { id } = useParams();

  return (
    <body>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Header />
        <ProfileCard/>
      </ThemeProvider>
    </body>
  );
}
