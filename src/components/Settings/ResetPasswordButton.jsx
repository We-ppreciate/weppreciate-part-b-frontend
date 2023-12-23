// Button rendering and interaction logic of reset password button

// React imports
import React from "react";
// Library imports
import { Box } from "@mui/system";
import { Password } from "@mui/icons-material";
// Local imports
import ResetPassword from "./ResetPassword";

export default class ResetPasswordButton extends React.Component {
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
        <Password color={"primary"} onClick={this.togglePop} />
        {this.state.seen ? (
          <ResetPassword user={user} toggle={this.togglePop} />
        ) : null}
      </Box>
    );
  }
}
