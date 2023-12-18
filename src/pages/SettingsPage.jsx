// TODO
// This will be the page component to hold all other components specific to the Settings page

import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  ThemeProvider,
  Box,
} from "@mui/material";

import {
  Diversity2,
  Home,
  Password,
  People,
  WorkspacePremium,
} from "@mui/icons-material";

import DashboardPage from "./DashboardPage";
import Header from "../components/Header";
import appTheme from "../styles/Theme";

// TODO: make page interactive and each button go to action, team settings only showing for admins

export default function SettingsPage() {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header />
      <Link to="/dashboard" element={<DashboardPage />}>
        <Button className="backButton" startIcon={<Home />}>
          Back to Dashboard
        </Button>
      </Link>
      <Box className="pageHeading">
        <Typography component="h1" variant="h3">
          Settings
        </Typography>
      </Box>
      <Grid className="cardGrid" container spacing={0}>
        <Card>
          <CardHeader
            title="Account settings"
            titleTypographyProps={{ variant: "h4" }}
          />
          <CardContent>
            <div>
              <Button className="settingsButton" startIcon={<Password />}>
                Change password
              </Button>
            </div>
            <div>
              <Typography variant="caption">
                Additional information can be updated on your profile.
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Team settings only displayed to admins: */}
        {userData.isAdmin && (
          <Card>
            <CardHeader
              title="Team settings"
              titleTypographyProps={{ variant: "h4" }}
            />
            <CardContent>
              <div>
                <Button className="settingsButton" startIcon={<People />}>
                  Manage users
                </Button>
              </div>
              <div>
                <Button className="settingsButton" startIcon={<Diversity2 />}>
                  Configure values
                </Button>
              </div>
              <div>
                <Button
                  className="settingsButton"
                  startIcon={<WorkspacePremium />}
                >
                  Configure awards
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Grid>
    </ThemeProvider>
  );
}
