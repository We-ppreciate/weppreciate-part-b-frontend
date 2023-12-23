// Rendering and form submission logic for login page

// React imports
import { useState } from "react";
// Library imports
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Container, Alert } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
// Local imports
import LoginLogo from "./LoginLogo";
import LoginText from "./LoginText";
import { apiUrl } from "../../utils/ApiUrl";

const SignIn = () => {
  const navigate = useNavigate();

  // Establishing states
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Takes login form data and converts into the correct JSON format for the POST request
      const jsonData = JSON.stringify({
        email: formData.email,
        password: formData.password,
      });

      // Sending POST request for login
      const response = await fetch(apiUrl + "auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

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

      const data = await response.json();

      // Stores the token and logged in user's details in local storage
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data));

      // Navigate to the Dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
        // Force a page refresh to render content
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* Display any error message here */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Container>
        <Box className="loginBox">
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
