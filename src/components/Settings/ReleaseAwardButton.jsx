// Button rendering and interaction logic of release award button

// React imports
import React from "react";
// Library imports
import { Box } from "@mui/system";
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
        <PublishedWithChanges color={"primary"} onClick={this.togglePop} />
        {this.state.seen ? (
          <ReleaseAwardConfirmation nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
