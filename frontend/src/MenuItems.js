import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
    </div>
  );
}
