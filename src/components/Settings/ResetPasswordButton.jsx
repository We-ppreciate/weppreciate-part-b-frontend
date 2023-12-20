import React from "react";
import { Box } from "@mui/system";
import { Password } from "@mui/icons-material";

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
