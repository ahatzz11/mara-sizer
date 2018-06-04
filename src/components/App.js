import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import SizeForm from "./SizeForm";
import { MuiThemeProvider } from "@material-ui/core/styles";
import muiTheme from "../config/themeConfig";

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <Helmet>
      <style>{"body { background-color: #EEEEEE;}"}</style>
    </Helmet>
    <Header />
    <SizeForm />
  </MuiThemeProvider>
);

export default App;
