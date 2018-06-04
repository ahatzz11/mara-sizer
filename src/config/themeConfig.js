import { createMuiTheme } from "@material-ui/core/styles";

export const mara = {
  light: "#8bf6ff",
  main: "#4FC3F7",
  dark: "#0093c4",
  contrastText: "#000",
  background: "#EEEEEE"
};

const maraTheme = createMuiTheme({
  palette: {
    primary: mara,
    secondary: mara
  }
});

export default maraTheme;
