import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginLogo from "./LoginLogo";
import { Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function ResetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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

          <Typography component="h1" variant="h5">
            Reset your We'ppreciate password
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
              id="password"
              label="New password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            {/* TODO: add some validation that these two fields match in frontend */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Confirm new password"
              name="password"
              autoComplete="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              endIcon={<ArrowForward/>}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit change
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              {/* TODO: update this link later */}
              <div>
                <Button size="medium" startIcon={<ArrowBack />}>
                  Go back
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
