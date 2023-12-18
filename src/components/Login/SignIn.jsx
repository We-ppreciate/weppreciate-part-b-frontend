import * as React from "react";

import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { useState } from "react";
import { loginUrl } from "../../utils/ApiPaths";

const SignIn = ({ setView }) => {
  // Establishing states
  const [errorMessage, setErrorMessage] = useState("");
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
          if (response.status === 400) {
            setErrorMessage(
              <Alert severity="error">
                Incorrect email or password, please try again.
              </Alert>
            );
          } else {
            setErrorMessage(
              <Alert severity="error">
                Uh oh, we couldn't log you in! Please try again.
              </Alert>
            );
          }

          // Clear the error message after 5 seconds
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
          
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        // Stores the token and logged in user's details in local storage
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data));

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
    <div>
      {/* Display any error message here */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
    </div>
  );
};

export default SignIn;
