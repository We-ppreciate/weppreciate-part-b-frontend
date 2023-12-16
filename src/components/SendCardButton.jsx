// Purpose: logic and rendering for the "Send recognition" button to display on Dashboard and Profiles

import React from "react";

import { AddReaction } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

import PopUp from "../components/CardPopup";

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
      <div>
        <div onClick={this.togglePop}>
          <Box className="buttonBox">
            <Button variant="contained" endIcon={<AddReaction />}>
              Send recognition
            </Button>
          </Box>
        </div>
        {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
      </div>
    );
  }
}
