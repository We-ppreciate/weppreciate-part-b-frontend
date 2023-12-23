// Button rendering and interaction logic of add comment button

// React imports
import React from "react";
// Library imports
import { AddComment } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
// Local imports
import AddCommentAction from "./AddComment";

export default class AddCommentButton extends React.Component {
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
          <AddComment />
        </IconButton>
        {this.state.seen ? (
          <AddCommentAction nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
