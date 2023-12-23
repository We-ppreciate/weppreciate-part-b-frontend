// Button rendering and interaction logic of edit tagline button

// React imports
import React from "react";
// Library imports
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
// Local imports
import EditTagline from "./EditTagline";

export default class EditTaglineButton extends React.Component {
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
          startIcon={<Edit />}
          onClick={this.togglePop}
        >
          Edit profile tagline
        </Button>
        {this.state.seen ? (
          <EditTagline toggle={this.togglePop} />
        ) : null}
      </div>
    );
  }
}
