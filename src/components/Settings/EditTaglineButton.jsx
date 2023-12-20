import React from "react";

import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
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
