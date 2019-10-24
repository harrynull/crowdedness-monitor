import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Progress from "./Progress";
import {Box, Avatar} from "@material-ui/core";

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
    autoCapitalize: true,
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

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Box className={classes.summaryBox}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            D
          </Avatar>
          </Box>
          <Box className={classes.summaryBox}>
            <Typography className={classes.subHeading} color="textSecondary">
              OPEN
            </Typography>
            <Typography className={classes.heading}>
              Davis Center
            </Typography>
          </Box>
          <Box className={classes.percentBox}>
            <Typography className={classes.percent}>
              53%
            </Typography>
            <Progress/>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box className={classes.detailBox}>
            //TODO
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
