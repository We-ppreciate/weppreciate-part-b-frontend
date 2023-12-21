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

import AddUserButton from "./AddUserButton";
import { apiUrl } from "../../utils/ApiUrl";
import EditUserButton from "./EditUserButton";
import DeleteUserButton from "./DeleteUserButton";
import { jwtToken, userData } from "../../utils/LocalStorage";
import ResetPasswordButton from "./ResetPasswordButton";

const ManageUsers = ({ setView }) => {
  const handleGoBackClick = () => {
    setView("default");
  };

  // Establishing states
  const [fullUsers, setFullUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [selectedUser, setSelectedUser] = useState(null);

  // Importing full users list to render in form
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "users/all/fullusers", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const sortedUsers = response.data.Users.sort((a, b) =>
          `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`
          )
        );
        setFullUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extracts full name of managers based on id
  function getFullName(userId) {
    const fullUser = fullUsers.find((user) => user._id === userId);
    return fullUser ? `${fullUser.name.first} ${fullUser.name.last}` : "";
  }

  // Function to handle edit and delete button clicks
  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  // Checks for current user so that they can't edit their own user in this screen
  const isCurrentUser = (userId) => {
    return userData.id === userId;
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
          Manage users
        </Typography>
      </Box>
      <AddUserButton />
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
                  <TableCell className="tableHeaderRow">Name</TableCell>
                  <TableCell className="tableUnitHeaderRow">
                    Business unit
                  </TableCell>
                  <TableCell className="tableManagerHeaderRow">
                    Manager
                  </TableCell>
                  <TableCell className="tableHeaderRow">Edit</TableCell>
                  <TableCell className="tableHeaderRow">Reset</TableCell>
                  <TableCell className="tableHeaderRow">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fullUsers.map((user) => {
                  const userName = `${user.name.first} ${user.name.last}`;
                  const isCurrent = isCurrentUser(user._id);
                  return (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {userName}
                      </TableCell>
                      <TableCell className="tableUnitRow">
                        {user.businessUnit}
                      </TableCell>
                      <TableCell className="tableManagerRow">
                        {getFullName(user.lineManagerId)}
                      </TableCell>
                      <TableCell>
                        {!isCurrent && (
                          <EditUserButton user={user} onEdit={handleEditUser} />
                        )}
                      </TableCell>
                      <TableCell>
                        {!isCurrent && (
                          <ResetPasswordButton
                            user={user}
                            onEdit={handleEditUser}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!isCurrent && (
                          <DeleteUserButton
                            user={user}
                            onEdit={handleEditUser}
                          />
                        )}
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

export default ManageUsers;
