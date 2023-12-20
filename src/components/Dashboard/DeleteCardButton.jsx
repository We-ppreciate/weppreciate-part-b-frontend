import React from "react";
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";

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
      <Box className="deleteButton">
        <Delete color={"primary"} onClick={this.togglePop} />
        {this.state.seen ? (
          <DeleteCard nomination={nomination} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
