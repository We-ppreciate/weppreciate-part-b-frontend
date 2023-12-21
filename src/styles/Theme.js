// This file is to create a theme using MUI's ThemeProvider to override the default MUI theming
// Changes for specific components will be done via CSS selectors in index.css

import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  typography: {
    fontFamily: "'Atkinson Hyperlegible', sans-serif",
  },
  palette: {
    primary: {
      main: "#0B4EA2",
      light: "#88b9f7",
      dark: "#083977",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          boxShadow: "none",
          borderRadius: "5px",
          border: "2px solid #0B4EA2",
          margin: "10px",
          marginLeft: "0",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          width: "200px",
          fontSize: "1.2rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "3px solid #0B4EA2",
          width: "80vw",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "0",
        },
        title: {
          marginTop: "10px",
        },
        action: {
          marginTop: "10px",
          marginRight: "10px",
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          padding: "8px",
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B4EA2",
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          border: "2px solid #0B4EA2",
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#0B4EA2",
        },
      },
    },
  },
});

export default appTheme;
