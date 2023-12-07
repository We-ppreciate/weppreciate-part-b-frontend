// TODO
// This will be the page component to hold all other components specific to the Profile page

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import newTheme from "../styles/Theme";
import { CssBaseline } from "@mui/material";
// import { useParams } from "react-router-dom";

const theme = createTheme(newTheme);

export default function ProfilePage() {
//   const { id } = useParams();

  return (
    <body>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <h1>Profile Placeholder</h1>
      </ThemeProvider>
    </body>
  );
}
