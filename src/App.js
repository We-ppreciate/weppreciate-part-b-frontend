import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./components/Authentication/AuthContext";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<DashboardPage />} />}
              />
              <Route
                path="/profile/:id"
                element={<PrivateRoute element={<ProfilePage />} />}
              />
              <Route
                path="/settings"
                element={<PrivateRoute element={<SettingsPage />} />}
              />
              {/* Redirects invalid paths to the homepage: */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </StyledEngineProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  }
}
