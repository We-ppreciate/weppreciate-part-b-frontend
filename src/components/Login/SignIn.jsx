// This file contains the "Sign in" template from MaterialUI with only a few small adjustments so far
// This will be a work in progress for testing using this CSS component framework :)

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { ArrowBack, ArrowForward } from "@mui/icons-material";


const SignIn = ({ setView }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleForgotPasswordClick = () => {
    setView("forgotPasswordView");
  };

  const handleGoBackClick = () => {
    setView("default");
  };

  return (
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginLogo />

          <LoginText />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <div>
                <Button size="medium" onClick={handleForgotPasswordClick}>
                  Forgot password?
                </Button>
              </div>
              <div>
                <Button
                  size="medium"
                  onClick={handleGoBackClick}
                  startIcon={<ArrowBack />}
                >
                  Go back
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
  );
};

export default SignIn;