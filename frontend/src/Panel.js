import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DensityProgressBar from "./DensityProgressBar";
import {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Typography,
  Box,
  Avatar
} from "@material-ui/core";
import {FONT_FAMILY} from "./App";

export default function Panel (props) {
  const classes = useStyles();
  const panels = props.locations.map((location) =>
    <ExpansionPanel key={location.id.toString()} className={classes.panel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header" className={classes.panel}>
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
          <Typography noWrap className={classes.heading}>
            {location.name}
          </Typography>
        </Box>
        <Box className={classes.percentBox}>
          <div className={classes.percentTextBox}>
            <Typography className={classes.percent}>
              {location.devices[0].crowdedness}%
            </Typography>
            <Typography className={classes.busy} color="textSecondary">
              Not Busy
            </Typography>
          </div>
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
    <ul className={classes.mul}>{panels}</ul>
  );
}

const useStyles = makeStyles(theme => ({
  mul: {
    padding: 0,
  },
  avatar: {
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 5,
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    }
  },
  panel: {
    fontFamily: FONT_FAMILY,
    [theme.breakpoints.only('xs')]: {
      // overflowX: 'auto',
      paddingLeft: 5,
      paddingRight: 15,
    }
  },
  percent: {
    alignSelf: "flex-end",
    fontFamily: FONT_FAMILY,
    fontSize: theme.typography.pxToRem(32),
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(24),
    }
  },
  busy: {
    marginLeft: 24,
    marginBottom: 8,
    alignSelf: "flex-end",
    fontFamily: FONT_FAMILY,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    }
  },
  subHeading: {
    marginLeft: 30,
    fontFamily: FONT_FAMILY,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: "uppercase",
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(10),
      marginLeft: 0,
    }
  },
  heading: {
    marginLeft: 30,
    fontFamily: FONT_FAMILY,
    width: 'auto',
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      fontSize: theme.typography.pxToRem(18),
    }
  },
  summaryBox: {
    height: 120,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.only('xs')]: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: '50%',
      height: 80,
      paddingLeft: 5,
      marginRight: 10,
    }
  },
  percentBox: {
    height: 120,
    width: '30%',
    paddingBottom: 12,
    marginRight: 80,
    marginLeft: 'auto',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only('sm')]: {
      marginRight: 10,
    },
    [theme.breakpoints.only('xs')]: {
      height: 80,
      marginRight: 10,
    }
  },
  percentTextBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    verticalAlign: "baseline",
    marginBottom: 6,
    [theme.breakpoints.only('xs')]: {
      marginBottom: 0,
    }
  },
  detailBox: {
    height: 480,
    paddingBottom: 32,
    paddingTop: 6,
  },
}));
