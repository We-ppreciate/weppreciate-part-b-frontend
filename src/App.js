import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ReportsPage from "./pages/ReportsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import { StyledEngineProvider } from "@mui/material/styles";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <Routes>
            {/* Route for homepage: */}
            <Route path="/" element={<HomePage />} />
            {/* Route for login page: */}
            <Route path="/login" element={<LoginPage />} />
            {/* Need to add some validation to redirect back to login page if trying to access other routes prior to being logged in: */}
            {/* ___ */}
            {/* Route for dashboard: */}
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Route for profile based on id: */}
            {/* TODO: uncomment to the param based path: */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route path="/profile/:id" element={<ProfilePage />} />
            {/* Route for reports: */}
            <Route path="/reports" element={<ReportsPage />} />
            {/* Route for settings: */}
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </StyledEngineProvider>
      </BrowserRouter>
    );
  }
}
