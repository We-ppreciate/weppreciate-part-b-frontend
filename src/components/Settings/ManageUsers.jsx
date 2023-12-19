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
} from "@mui/material";

import { Delete, Edit, Settings } from "@mui/icons-material";
import AddUserButton from "./AddUserButton";

const ManageUsers = ({ setView }) => {
  //   const userData = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleGoBackClick = () => {
    setView("default");
  };

  //   dummy data for table - to remove
  function createData(name, email, userRole, businessUnit, lineManager) {
    return { name, email, userRole, businessUnit, lineManager };
  }

  const rows = [
    createData("Katie Lock", "katie.lock@yourcompany.com", "Admin", "HR Business Partnership", "Jo Newton"),
    createData("Nate Picone", "nate.picone@yourcompany.com", "Standard", "Business Services", "Jo Newton"),
    createData("Hannah Sallows", "hannah.sallows@yourcompany.com", "Senior Manager", "Business Services", "Jo Newton"),
    createData("Alex Greatbeard", "alex.greatbeard@yourcompany.com", "Standard", "Stuff", "Jo Newton"),
    createData("Ed Dougherty", "ed.dougherty@yourcompany.com", "Standard", "Things", "Jo Newton"),
  ];

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
      {/* TODO: update styling on button, put into own component */}
      <AddUserButton/>
      <Grid className="cardGrid" container spacing={0}>
          <TableContainer className="usersTable">
            <Table aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell>User role</TableCell>
                  <TableCell>Business unit</TableCell>
                  <TableCell>Line manager</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.userRole}</TableCell>
                    <TableCell>{row.businessUnit}</TableCell>
                    <TableCell>{row.lineManager}</TableCell>
                    <TableCell align="right"><Edit/></TableCell>
                    <TableCell align="right"><Delete/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </div>
  );
};

export default ManageUsers;
