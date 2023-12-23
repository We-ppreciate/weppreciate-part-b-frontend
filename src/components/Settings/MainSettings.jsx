// The default state of the Settings page, with conditional views based on buttons clicked

// Library imports
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { Home, People, WorkspacePremium } from "@mui/icons-material";
// Local imports
import { userData } from "../../utils/LocalStorage";
import DashboardPage from "../../pages/DashboardPage";
import ChangePasswordButton from "./ChangePasswordButton";
import EditTaglineButton from "./EditTaglineButton";

const MainSettings = ({ setView }) => {
  const handleManageUsersClick = () => {
    setView("manageUsers");
  };
  const handleReleaseAwardsClick = () => {
    setView("releaseAwards");
  };

  return (
    <div>
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
        <Card className="settingsCard">
          <CardHeader
            title="Account settings"
            titleTypographyProps={{ variant: "h4" }}
          />
          <CardContent>
            <ChangePasswordButton />
            <EditTaglineButton />
          </CardContent>
        </Card>

        {/* Team settings only displayed to senior managers/admins: */}
        {(userData.isAdmin || userData.isSeniorManager) && (
          <Card className="settingsCard">
            <CardHeader
              title="Team settings"
              titleTypographyProps={{ variant: "h4" }}
            />

            <CardContent>
              {userData.isAdmin && (
                <div>
                  <Button
                    className="settingsButton"
                    startIcon={<People />}
                    onClick={handleManageUsersClick}
                  >
                    Manage users
                  </Button>
                </div>
              )}
              <div>
                <Button
                  className="settingsButton"
                  startIcon={<WorkspacePremium />}
                  onClick={handleReleaseAwardsClick}
                >
                  Release awards
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Grid>
    </div>
  );
};

export default MainSettings;
