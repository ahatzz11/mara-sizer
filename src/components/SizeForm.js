import React from "react";
import { object } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex"
    // flex: 1,
  },
  container: {
    margin: "1em auto 1em auto",
    flexWrap: "wrap",
    // margin: "1em 2em 1em 2em",
    padding: "0em 2em 1em 2em",
    "font-family": "Roboto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250
  },
  header: {
    'font-weight': 'bold'
  }
});

class SizeForm extends React.Component {
  static propTypes = {
    classes: object
  };

  handleChange = name => event => {
    // change
    this.setState({
      [name]: parseInt(event.target.value, 10)
    });
  };

  state = {
    annulusPerimeter: 0,
    intertrigonalDistance: 0
  };

  render() {
    const { classes } = this.props;

    let sizeConstant = 19;
    let breakpointConstant = 9.9;
    let iL = this.state.annulusPerimeter - this.state.intertrigonalDistance;
    let anchorCount = iL / sizeConstant;
    let anchorCountFloor = Math.floor(anchorCount);
    let initialUnconstrainedTissue =
      (anchorCount - anchorCountFloor) * sizeConstant;

    let finalAnchorCount = 0;
    let finalUnconstrainedTissue = 0;

    if (initialUnconstrainedTissue > breakpointConstant) {
      finalAnchorCount = anchorCountFloor + 1;
    } else {
      finalAnchorCount = anchorCountFloor;
      finalUnconstrainedTissue = initialUnconstrainedTissue;
    }

    let finalPerimeter = 0;
    if (initialUnconstrainedTissue > breakpointConstant) {
      finalPerimeter =
        finalAnchorCount * 10 +
        finalUnconstrainedTissue +
        this.state.intertrigonalDistance;
    } else {
      finalPerimeter =
        anchorCountFloor * 10 +
        initialUnconstrainedTissue +
        this.state.intertrigonalDistance;
    }

    let averageThrowLength = 0;

    let perimeterDifference = this.state.annulusPerimeter - finalPerimeter;

    // what is 5?
    if (initialUnconstrainedTissue > breakpointConstant) {
      averageThrowLength = perimeterDifference / finalAnchorCount + 5;
    } else {
      averageThrowLength = perimeterDifference / anchorCountFloor + 5;
    }

    let equivalentBandLength =
      finalPerimeter - this.state.intertrigonalDistance;

    let perimeterReductionPercentage =
      perimeterDifference / this.state.annulusPerimeter * 100;

    return (
      <div className={classes.root}>
        <Paper className={classes.container}>
          <TextField
            id="annulusPerimeter"
            label="Annulus Perimeter in mm"
            value={this.state.annulusPerimeter}
            onChange={this.handleChange("annulusPerimeter")}
            placeholder="150"
            type="Number"
            margin="normal"
            className={classes.textField}
            required={true}
          />
          <br />

          <TextField
            id="intertrigonalDistance"
            label="Intertrigonal Distance in mm"
            value={this.state.intertrigonalDistance}
            onChange={this.handleChange("intertrigonalDistance")}
            placeholder="35"
            type="Number"
            margin="normal"
            className={classes.textField}
            required={true}
          />
          <br />
          <br />

          <Table>
            <TableBody>
              <TableRow align="right">
                <TableCell>
                  <Typography variant="header4">
                    Final Unconstrained Tissue
                  </Typography>
                </TableCell>
                <TableCell>
                  {finalUnconstrainedTissue.toFixed(0)}mm
                </TableCell>
              </TableRow>

              <TableRow align="right">
                <TableCell>
                  <Typography variant="header4">Final Anchor Count</Typography>
                </TableCell>
                <TableCell>
                  {finalAnchorCount}
                </TableCell>
              </TableRow>

              <TableRow align="right">
                <TableCell>
                  <Typography variant="header4">Final Perimeter</Typography>
                </TableCell>
                <TableCell>
                  {finalPerimeter}mm
                </TableCell>
              </TableRow>

              <TableRow align="right">
                <TableCell>
                  <Typography variant="header4">
                    Perimeter Reduction
                  </Typography>
                </TableCell>
                <TableCell>
                  {perimeterReductionPercentage.toFixed(0)}%
                </TableCell>
              </TableRow>

              <TableRow align="right">
                <TableCell>
                  <Typography variant="header4">
                    Average Throw Length:
                    </Typography>
                </TableCell>
                <TableCell>
                  {averageThrowLength}mm
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>

          <br />
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M12.44 6.44L9 9.88 5.56 6.44 4.5 7.5 9 12l4.5-4.5z" />
                </svg>
              }
            >
              <Typography className={classes.header}>Extra Information</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Anchor Count: {anchorCount.toFixed(2)}
                <br />
                Anchor Count Floor: {anchorCountFloor}
                <br />
                Initial Unconstrained Tissue:{" "}
                {initialUnconstrainedTissue.toFixed(0)}mm
                <br />
                IL: {iL}

                <br />
                IL* / Equivalent Band Length: {equivalentBandLength}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SizeForm);
