// This will be the page component to hold all other components specific to the Login page

import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import appTheme from "../styles/Theme";
import MainSettings from "../components/Settings/MainSettings";
import Header from "../components/Header";
import ManageUsers from "../components/Settings/ManageUsers";

export default function SettingsPage() {
  const [view, setView] = useState("default");

  const renderView = () => {
    switch (view) {
      case "manageUsers":
        return <ManageUsers setView={setView} />;
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
