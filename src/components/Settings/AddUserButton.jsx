// Button rendering and interaction logic of add user button

// React imports
import React from "react";
// Library imports
import { PersonAdd } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
// Local imports
import AddUser from "./AddUser";

export default class AddUserButton extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    return (
          <Box className="buttonBox">
            <Button variant="contained" startIcon={<PersonAdd />} onClick={this.togglePop}>
              Add user
            </Button>
            {this.state.seen ? <AddUser toggle={this.togglePop} /> : null}
          </Box>
    );
  }
}
