// Button rendering and interaction logic of send recognition button

// React imports
import React from "react";
// Library imports
import { AddReaction } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
// Local imports
import SendCard from "./SendCard";

export default class SendCardButton extends React.Component {
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
            <Button variant="contained" endIcon={<AddReaction />} onClick={this.togglePop}>
              Send recognition
            </Button>
            {this.state.seen ? <SendCard toggle={this.togglePop} /> : null}
          </Box>

    );
  }
}
