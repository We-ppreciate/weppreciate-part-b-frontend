// The rendering and logic for Release Awards, a view of the Settings page

// React imports
import { useEffect, useState } from "react";
// Library imports
import {
  Button,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
// Local imports
import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken, userData } from "../../utils/LocalStorage";
import FullUsers from "../../utils/FullUsers";
import ReleaseAwardButton from "./ReleaseAwardButton";
import DeclineAwardButton from "./DeclineAwardButton";

const ReleaseAwards = ({ setView }) => {
  const handleGoBackClick = () => {
    setView("default");
  };

  // Establishing states
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [selectedNom, setSelectedNom] = useState(null);

  // Importing nominations
  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await fetch(apiUrl + "nominations/all/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Filter nominations
        const filteredNominations = data.Nominations.filter((nomination) => {
          if (!nomination.isNominationInstant && !nomination.isReleased) {
            return true;
          }
          return false;
        });
  
        setNominations(filteredNominations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNominationData();
  }, []);  

  // Importing users data
  const { fullUsers } = FullUsers();

  // Extracts full name for cards based on id for nominations
  function getFullName(userId) {
    const fullUser = fullUsers.find((user) => user._id === userId);
    return fullUser ? `${fullUser.name.first} ${fullUser.name.last}` : "";
  }

  // Function to handle release nomination clicks
  const handleManageNomination = (nomination) => {
    setSelectedNom(nomination);
  };

  return (
    <div>
      <Button
        className="backButton"
        startIcon={<Settings />}
        onClick={handleGoBackClick}
      >
        Back to Settings
      </Button>
      <Box className="pageHeading">
        <Typography component="h1" variant="h3">
          Release awards
        </Typography>
      </Box>
      {loading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <Grid className="cardGrid" container spacing={0}>
          <TableContainer className="nomsTable">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="nomsTableHeader">Date</TableCell>
                  <TableCell className="nomsTableHeader">Nominator</TableCell>
                  <TableCell className="nomsTableHeader">Recipient</TableCell>
                  <TableCell className="nomsTableHeader">Contents</TableCell>
                  <TableCell className="nomsTableHeader">Value</TableCell>
                  <TableCell className="nomsTableHeader">Release</TableCell>
                  {userData.isAdmin && (
                    <TableCell className="nomsTableHeader">Decline</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {nominations.map((nomination) => {
                  return (
                    <TableRow
                      key={nomination._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="nomTableCell"
                      >
                        {nomination.nominationDate}
                      </TableCell>
                      <TableCell className="nomTableCell">
                        {nomination.isNominatorFullUser
                          ? `${
                              getFullName(nomination.nominatorFullUser) ||
                              "Deleted user"
                            }`
                          : `${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`}
                      </TableCell>
                      <TableCell className="nomTableCell">
                        {getFullName(nomination.recipientUser) ||
                          "Deleted user"}
                      </TableCell>
                      <TableCell className="nomTableCell">
                        {nomination.nominationBody}
                      </TableCell>
                      <TableCell className="nomTableCell">
                        {nomination.nominationValue}
                      </TableCell>
                      <TableCell className="nomTableCell">
                        <ReleaseAwardButton
                          nomination={nomination}
                          onEdit={handleManageNomination}
                        />
                      </TableCell>
                      {userData.isAdmin && (
                        <TableCell className="nomTableCell">
                          <DeclineAwardButton
                            nomination={nomination}
                            onEdit={handleManageNomination}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="info" className="smallScreenAlert">
            This table is simply too powerful for your little screen - come
            release an award on a bigger screen, please 😊
          </Alert>
        </Grid>
      )}
    </div>
  );
};

export default ReleaseAwards;
