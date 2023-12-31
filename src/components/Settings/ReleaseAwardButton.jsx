// Button rendering and interaction logic of release award button

// React imports
import React from "react";
// Library imports
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { PublishedWithChanges } from "@mui/icons-material";
// Local imports
import ReleaseAwardConfirmation from "./ReleaseAwardConfirmation";

export default class ReleaseAwardButton extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    const { nomination } = this.props;
    return (
      <Box>
        <IconButton color="primary" onClick={this.togglePop}>
          <PublishedWithChanges/>
        </IconButton>
        {this.state.seen ? (
          <ReleaseAwardConfirmation nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
