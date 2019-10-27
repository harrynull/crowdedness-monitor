import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './index.css'

const text = {
  fontFamily: "Rubik",
};

export function MainListItems () {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" primaryTypographyProps={{style: text}}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon/>
        </ListItemIcon>
        <ListItemText primary="Reports" primaryTypographyProps={{style: text}}/>
      </ListItem>
    </div>
  );
}

export function SecondaryListItems () {
  return (
    <div>
      <ListSubheader inset style={text}>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon/>
        </ListItemIcon>
        <ListItemText primary="Current month" primaryTypographyProps={{style: text}}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon/>
        </ListItemIcon>
        <ListItemText primary="Last quarter" primaryTypographyProps={{style: text}}/>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon/>
        </ListItemIcon>
        <ListItemText primary="Year-end sale" primaryTypographyProps={{style: text}}/>
      </ListItem>
    </div>
  );
}
