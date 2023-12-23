// Button rendering and interaction logic of delete user button

// React imports
import React from "react";
// Library imports
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";
// Local imports
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
