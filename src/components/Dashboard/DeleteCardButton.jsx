// Button rendering and interaction logic of delete card button

// React imports
import React from "react";
// Library imports
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
// Local imports
import DeleteCard from "./DeleteCard";

export default class DeleteCardButton extends React.Component {
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
        <IconButton onClick={this.togglePop}>
          <Delete />
        </IconButton>
        {this.state.seen ? (
          <DeleteCard nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
