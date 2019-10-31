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
  Grid,
  Avatar,
} from "@material-ui/core";
import {FONT_FAMILY} from "./App";
import TrendChart from "./TrendChart";
import FloorChart from "./FloorChart";
import HoursTable from "./HoursTable";

export default function Panel (props) {
  const classes = useStyles();
  const panels = props.locations.map((location) =>
    <ExpansionPanel
      // expanded={true}
      key={location.id.toString()}
      className={classes.panel}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel1a-content"
        id="panel1a-header" className={classes.panel}>
        <Box className={classes.summaryBox}>
          <Avatar
            aria-label="recipe"
            style={{backgroundColor: stringToHslColor(location.name, 50, 50)}}
            className={classes.avatar}>
            {location.abbr}
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
              {location.devices.length > 0 ? location.devices[0].crowdedness : 'N/A'}%
            </Typography>
            <Typography className={classes.busy} color="textSecondary">
              Not Busy
            </Typography>
          </div>
          <DensityProgressBar
            // TODO Change Color
            color={"primary"}
            density={location.devices.length > 0 ? location.devices[0].crowdedness : 0}/>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.detailContainer}>
        <Box className={classes.detailBox}>
          <Grid style={{width: '100%'}} container direction={"row"}>
            <Box className={classes.infoBox}>
              <Typography className={classes.sectionTitle}>
                Open Hours
              </Typography>
              <HoursTable/>
            </Box>
            <Box className={classes.floorBox}>
              <Typography className={classes.sectionTitle}>
                Floors
              </Typography>
              <FloorChart/>
            </Box>
          </Grid>
          <Box className={classes.detailBottomContainer}>
            <Box className={classes.chartsBox}>
              <Typography className={classes.sectionTitle}>
                Trend
              </Typography>
              <TrendChart/>
            </Box>
          </Box>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
  return (
    <ul className={classes.mul}>{panels}</ul>
  );
}

function stringToHslColor(str, s, l) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  let h = hash % 360;
  return 'hsl('+h+', '+s+'%, '+l+'%)';
}

const useStyles = makeStyles(theme => ({
  mul: {
    padding: 0,
  },
  detailBottomContainer: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    flexGrow: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  dividerBox: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    width: 'auto',
    flexGrow: 1,
  },
  deviceCountBox: {
    display: 'flex',
    flexDirection: 'row',
    width: 'auto',
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
    },
  },
  infoBox: {
    flexGrow: 1,
    marginRight: 10,
    [theme.breakpoints.only('sm')]: {
      marginLeft: 5,
      width: 'auto',
    },
    [theme.breakpoints.only('xs')]: {
      flexGrow: 0,
      marginLeft: 0,
      marginRight: -34,
    }
  },
  floorBox: {
    width: '49%',
    marginRight: 0,
    marginLeft: 10,
    height: 130,
    [theme.breakpoints.only('sm')]: {
      marginLeft: 5,
    },
    [theme.breakpoints.only('xs')]: {
      flexGrow: 0,
      marginLeft: 0,
      marginRight: -34,
    }
  },
  chartsBox: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 30,
    [theme.breakpoints.only('xs')]: {
      marginTop: 30,
      height: 200,
    },
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  noiseCountBox: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.only('sm')]: {
      flexDirection: 'column',
    },
  },
  deviceNoiseBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  unit: {
    marginLeft: 10,
    marginBottom: 10,
    alignSelf: "flex-end",
    fontFamily: FONT_FAMILY,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
    [theme.breakpoints.only('sm')]: {
      alignSelf: "flex-start",
      marginLeft: 0,
      marginBottom: 0,
    },
    [theme.breakpoints.only('xs')]: {
      marginBottom: 5,
    }
  },
  detailBox: {
    height: 480,
    paddingBottom: 32,
    paddingTop: 0,
    marginTop: -8,
    marginRight: 40,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginLeft: 20,
    [theme.breakpoints.only('xs')]: {
      height: 'auto',
      padding: 0,
    }
  },
  detailContainer: {
    [theme.breakpoints.only('xs')]: {
      paddingRight: 20,
    }
  },
  avatar: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
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
    [theme.breakpoints.only('sm')]: {
      fontSize: theme.typography.pxToRem(20),
    },
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
    width: 330,
    paddingBottom: 12,
    marginRight: 60,
    marginLeft: 'auto',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only('sm')]: {
      width: '40%',
      marginRight: 10,
    },
    [theme.breakpoints.only('xs')]: {
      width: '30%',
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
}));
