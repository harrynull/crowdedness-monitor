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
  Avatar,
  Divider
} from "@material-ui/core";
import {FONT_FAMILY} from "./App";
import FloorList from "./FloorList";

export default function Panel (props) {
  const classes = useStyles();
  const panels = props.locations.map((location) =>
    <ExpansionPanel expanded={true} key={location.id.toString()} className={classes.panel}>
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
      <ExpansionPanelDetails className={classes.detailContainer}>
        <Box className={classes.detailBox}>
          <Box className={classes.floorBox}>
            <Typography className={classes.sectionTitle}>
              Floors
            </Typography>
            <FloorList/>
          </Box>
          <Box className={classes.detailRightContainer}>
            <Box className={classes.deviceNoiseBox}>
              <Box className={classes.deviceCountBox}>
                <Typography className={classes.percent}>
                  5370
                </Typography>
                <Typography className={classes.unit} color="textSecondary">
                  Devices
                </Typography>
              </Box>
              <Box className={classes.dividerBox}>
                <Divider orientation="vertical"/>
              </Box>
              <Box className={classes.noiseCountBox}>
                <Typography className={classes.percent}>
                  72dB
                </Typography>
                <Typography className={classes.unit} color="textSecondary">
                  Noise
                </Typography>
              </Box>
            </Box>
            <Box className={classes.chartsBox}>
              <Typography className={classes.sectionTitle}>
                Past
              </Typography>
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

const useStyles = makeStyles(theme => ({
    mul: {
      padding: 0,
    },
    detailRightContainer: {
      alignSelf: 'flex-end',
      marginLeft: 'auto',
      height: '100%',
      width: 330,
      marginRight: 60 + 25.5 + 12,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.only('sm')]: {
        width: '38%',
        marginRight: 6 + 25.5 + 12,
      },
      [theme.breakpoints.only('xs')]:{
        marginLeft: 0,
        width: '100%',
        marginRight: 0,
        marginTop: 30,
      }
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
    floorBox: {
      flexGrow: 1,
      marginLeft: 20,
      marginRight: 40,
      [theme.breakpoints.only('sm')]: {
        marginLeft: 5,
        width: 'auto',
      },
      [theme.breakpoints.only('xs')]:{
        flexGrow: 0,
        marginLeft: 0,
        marginRight: -34,
      }
    },
    chartsBox: {
      display: 'flex',
      flexDirection: 'column',
      height: 500,
      marginTop: 50,
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
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      [theme.breakpoints.only('xs')]: {
        height: 'auto',
        flexDirection: 'column',
        padding: 0,
      }
    },detailContainer:{
    [theme.breakpoints.only('xs')]: {
      paddingRight: 20,
    }
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
  }))
;
