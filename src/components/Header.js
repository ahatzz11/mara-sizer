import React from "react";
import { object } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  header: {
    height: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      height: 48
    },
    [theme.breakpoints.up("sm")]: {
      height: 64
    }
  }
});

class Header extends React.Component {
  static propTypes = {
    classes: object
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <AppBar color="primary" className={classes.header}>
          <Toolbar>
            <Typography variant="title">Mara Sizer</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
