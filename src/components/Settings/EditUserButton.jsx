// Button rendering and interaction logic of edit user button

// React imports
import React from "react";
// Library imports
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
// Local imports
import EditUser from "./EditUser";

export default class EditUserButton extends React.Component {
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
        <Edit color={"primary"} onClick={this.togglePop} />
        {this.state.seen ? (
          <EditUser user={user} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
