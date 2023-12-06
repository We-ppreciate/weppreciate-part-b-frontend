import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginLogo from "./LoginLogo";
import { Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ArrowBack } from "@mui/icons-material";
import newTheme from "../../styles/Theme";

const theme = createTheme(newTheme);

const ForgotPassword = ({ setView }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
  };

  const handleGoBackClick = () => {
    setView("default");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginLogo />

          <Typography component="h1" variant="h4">
            Forgot your password?
          </Typography>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<SendIcon />}
            >
              Request reset link
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
    </ThemeProvider>
  );
};
export default ForgotPassword;
