// Button rendering and interaction logic of delete comment button

// React imports
import React from "react";
// Library imports
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
// Local imports
import DeleteComment from "./DeleteComment";

export default class DeleteCommentButton extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    const { comment } = this.props;

    return (
      <Box className="deleteComment">
        <IconButton onClick={this.togglePop}>
          <Delete />
        </IconButton>
        {this.state.seen ? (
          <DeleteComment comment={comment} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
