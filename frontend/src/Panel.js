import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
} from "@material-ui/core";
import {FONT_FAMILY} from "./App";
import TrendChart from "./TrendChart";
import TimeSelect from "./TimeSelect";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "./moment-round";

export const ranges = {
  HOUR: 0,
  HOUR6: 1,
  HOUR12: 2,
  DAY: 3,
};

// export const intervals = [
//   0,
//   2,
//   5,
//   5
// ];

class Panel extends Component {
  render () {
    const {classes} = this.props;
    const panels = this.props.locations.map((location) =>
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
                {location.devices[0].crowdedness >= 80 ? "Very Busy" : location.devices[0].crowdedness >= 50 ? "Busy" : "Not Busy"}
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
            <Box className={classes.detailBottomContainer}>
              <Box className={classes.chartsBox}>
                <TimeSelect
                  style={{marginLeft: 20}}
                  id={location.id}
                  callback={(range, id) => {
                    this.state.range[id-1] = range;
                    this.forceUpdate();
                  }}
                  selected={this.state.range}
                />
                <TrendChart
                  // interval={this.state.range[location.id - 1] !== undefined ?
                  //   intervals[this.state.range[location.id - 1]] : intervals[ranges.DAY]}
                  data={
                  createRange(
                    this.state.range[location.id - 1] !== undefined ?
                      this.state.range[location.id - 1] : ranges.DAY,
                    this.props.details[location.id - 1]
                  )}/>
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

  state = {
    range: [],
  };
}

function aggregate_data(raw, hours, roundMins) {
  let data = [];
  let aggregation = {};
  let cnt = {};
  for (let key of Object.keys(raw).slice(-12*hours)) {
    let k = moment.unix(key).round(roundMins,'minutes').format('HH:mm');
    if (!aggregation[k]) aggregation[k]=cnt[k]=0;
    aggregation[k] += raw[key];
    cnt[k] += 1;
  }
  for (let key of Object.keys(aggregation)){
    data.push(createData(key, Math.round(aggregation[key]/cnt[key])));
  }
  return data;
}

function createData (time, Density) {
  return {time, Density: Density};
}

function createRange (range, raw) {
  if (!raw) return;
  switch (range) {
    case ranges.HOUR:
      return aggregate_data(raw, 1, 5);
    case ranges.HOUR6:
      return aggregate_data(raw, 6, 10);
    case ranges.HOUR12:
      return aggregate_data(raw, 12, 20);
    case ranges.DAY:
      return aggregate_data(raw, 24, 30);
    default: return [];
  }
}

function stringToHslColor (str, s, l) {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  let h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

const styles = theme => ({
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
    marginLeft: -20,
    // marginTop: 30,
    [theme.breakpoints.only('xs')]: {
      // marginTop: 30,
      marginLeft: -40,
      marginRight: -30,
      height: 300,
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
    height: 450,
    paddingBottom: 8,
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
});

Panel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Panel);
