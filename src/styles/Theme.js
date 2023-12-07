const newTheme = {
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
    MuiMenu: {
      styleOverrides: {
        root: {
          marginTop: "50px",
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
          width: "70vw",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        },
      },
    },
  },
};

export default newTheme;
