import React from "react";
import { Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
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
        <Edit onClick={this.togglePop} />
        {this.state.seen ? (
          <EditUser user={user} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
