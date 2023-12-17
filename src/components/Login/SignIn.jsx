import * as React from "react";

import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { useState } from "react";
import { loginUrl } from "../../utils/ApiPaths";

const SignIn = ({ setView }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // rememberMe: false,
    // TODO: uncomment above when the backend of the route can handle this checkbox
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Takes login form data and converts into correct JSON format for POST request
    const jsonData = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });

    // Sending POST request for login
    fetch(loginUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (!response.ok) {
          // Add front-end validation when this occurs
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        // Stores the token and logged in user's email in local storage
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("loggedInEmail", formData.email);

        // Redirect to the Dashboard
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        // Add front-end validation when this occurs
        console.error("Error:", error);
      });
  };

  const handleForgotPasswordClick = () => {
    setView("forgotPasswordView");
  };

  const handleGoBackClick = () => {
    setView("default");
  };

  // TODO: take inline styling into css file where possible

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={formData.rememberMe}
                color="primary"
                name="rememberMe"
                onChange={handleChange}
              />
            }
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
          <Box className="buttonBox">
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
