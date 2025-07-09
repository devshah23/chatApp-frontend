import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    button: {
      main: "#46B36C",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#72c965",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#46B36C",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#46B36C",
          },
          input: {
            color: "#355E3B",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "1.25px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#46B36C",
          },
        },
      },
    },
  },
});

export default theme;
