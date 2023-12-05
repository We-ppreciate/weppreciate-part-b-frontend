import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ReportsPage from "./pages/ReportsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
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
      <Route path="profile/:id" element={<ProfilePage />} />
      {/* Route for reports: */}
      <Route path="/reports" element={<ReportsPage />} />
      {/* Route for settings: */}
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
