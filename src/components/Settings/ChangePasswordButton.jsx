// Button rendering and interaction logic of change password button

// React imports
import React from "react";
// Library imports
import { Password } from "@mui/icons-material";
import { Button } from "@mui/material";
// Local imports
import ChangePassword from "./ChangePassword";

export default class ChangePasswordButton extends React.Component {
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
      <div>
        <Button
          className="settingsButton"
          startIcon={<Password />}
          onClick={this.togglePop}
        >
          Change password
        </Button>
        {this.state.seen ? <ChangePassword toggle={this.togglePop} /> : null}
      </div>
    );
  }
}
