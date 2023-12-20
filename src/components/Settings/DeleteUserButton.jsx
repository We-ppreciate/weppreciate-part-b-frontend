import React from "react";
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";

import DeleteUser from "./DeleteUser";

export default class DeleteUserButton extends React.Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    const { user } = this.props;

    return (
      <Box>
        <Delete color={"primary"} onClick={this.togglePop} />
        {this.state.seen ? (
          <DeleteUser user={user} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
