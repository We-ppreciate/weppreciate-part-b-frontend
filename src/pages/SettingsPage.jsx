// Purpose: for rendering the Settings page, by pulling in the different components that form it

// React imports
import { useState } from "react";
// Library imports
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Local imports
import "../styles/settings.css"
import appTheme from "../styles/Theme";
import Header from "../components/Header";
import MainSettings from "../components/Settings/MainSettings";
import ManageUsers from "../components/Settings/ManageUsers";
import ReleaseAwards from "../components/Settings/ReleaseAwards";

export default function SettingsPage() {
  const [view, setView] = useState("default");

  const renderView = () => {
    switch (view) {
      case "manageUsers":
        return <ManageUsers setView={setView} />;
      case "releaseAwards":
        return <ReleaseAwards setView={setView} />;
      default:
        return <MainSettings setView={setView} />;
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      {renderView()}
    </ThemeProvider>
  );
}
