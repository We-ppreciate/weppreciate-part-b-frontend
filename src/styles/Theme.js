const newTheme = {
    typography: {
      fontFamily: "'Atkinson Hyperlegible', sans-serif",
    },
    palette: {
      primary: {
        main: "#0B4EA2",
        light: "#88b9f7",
        dark: "#083977"
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "none",
          },
        },
      },
    },
  };

  export default newTheme;