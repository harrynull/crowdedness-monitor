import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DensityProgressBar from "./Progress";
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Typography,
  Box,
  Avatar
} from "@material-ui/core";

export default function Panel (props) {
  const classes = useStyles();
  const panels = props.locations.map((location) =>
    <ExpansionPanel key={location.id.toString()}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Box className={classes.summaryBox}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {location.name.toString().substr(0, 1)}
          </Avatar>
        </Box>
        <Box className={classes.summaryBox}>
          <Typography className={classes.subHeading} color="textSecondary">
            {/*{location.isOpen ? "OPEN" : "CLOSED"}*/}
            OPEN
          </Typography>
          <Typography className={classes.heading}>
            {location.name}
          </Typography>
        </Box>
        <Box className={classes.percentBox}>
          <Typography className={classes.percent}>
            {location.devices[0].crowdedness}%
          </Typography>
          <DensityProgressBar
            // TODO Change Color
            color={"primary"}
            density={location.devices[0].crowdedness}/>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box className={classes.detailBox}>
          {/*TODO*/}
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
  return (
    <ul>{panels}</ul>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  percent: {
    marginBottom: 6,
    fontSize: theme.typography.pxToRem(34),
    fontWeight: theme.typography.fontWeightRegular,
  },
  subHeading: {
    marginLeft: 30,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: "uppercase",
  },
  heading: {
    marginLeft: 30,
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
  },
  summaryBox: {
    height: 120,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  percentBox: {
    height: 120,
    width: '30%',
    paddingBottom: 12,
    marginRight: 80,
    marginLeft: 'auto',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  detailBox: {
    width: '100%',
    height: 480,
    paddingBottom: 32,
    paddingTop: 6,
  },
}));
