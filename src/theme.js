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
            color: "#72c965",
            fontWeight: 600,
            fontSize: "1rem",
            letterSpacing: "1.25px",
            "&::label": {
              color: "#46B36C",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#72c965",
          "&.Mui-focused": {
            color: "#72c965",
          },
        },
      },
    },
  },
});

export default theme;
