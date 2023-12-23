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
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";
import { Settings } from "@mui/icons-material";

import { apiUrl } from "../../utils/ApiUrl";
import { jwtToken } from "../../utils/LocalStorage";
import ReleaseAwardButton from "./ReleaseAwardButton";
import FullUsers from "../../utils/FullUsers";

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
        const response = await axios.get(apiUrl + "nominations/all/", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        // Filter nominations
        const filteredNominations = response.data.Nominations.filter(
          (nomination) => {
            if (!nomination.isNominationInstant && !nomination.isReleased) {
              return true;
            }
            return false;
          }
        );

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
  const handleReleaseNomination = (nomination) => {
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
          <TableContainer className="usersTable">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableHeaderRow">Date</TableCell>
                  <TableCell className="tableHeaderRow">Nominator</TableCell>
                  <TableCell className="tableHeaderRow">Recipient</TableCell>
                  <TableCell className="tableHeaderRow">Contents</TableCell>
                  <TableCell className="tableHeaderRow">Value</TableCell>
                  <TableCell className="tableHeaderRow">Release</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nominations.map((nomination) => {
                  return (
                    <TableRow
                      key={nomination._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {nomination.nominationDate}
                      </TableCell>
                      <TableCell>
                        {nomination.isNominatorFullUser
                          ? getFullName(nomination.nominatorFullUser)
                          : `${nomination.nominatorBasicUser.basicName.first} ${nomination.nominatorBasicUser.basicName.last}`}
                      </TableCell>
                      <TableCell>
                        {getFullName(nomination.recipientUser)}
                      </TableCell>
                      <TableCell>{nomination.nominationBody}</TableCell>
                      <TableCell>{nomination.nominationValue}</TableCell>
                      <TableCell>
                        <ReleaseAwardButton
                          nomination={nomination}
                          onEdit={handleReleaseNomination}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </div>
  );
};

export default ReleaseAwards;
