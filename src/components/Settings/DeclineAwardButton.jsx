// Button rendering and interaction logic of decline award button

// React imports
import React from "react";
// Library imports
import { Box } from "@mui/system";
import { ThumbDownOffAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";
// Local imports
import DeclineAward from "./DeclineAward";


export default class DeclineAwardButton extends React.Component {
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
          <ThumbDownOffAlt/>
        </IconButton>
        {this.state.seen ? (
          <DeclineAward nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
