import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DensityProgressBar from "./DensityProgressBar";
import {ListItemAvatar} from "@material-ui/core";

const ListHeight = 420;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      height: 'auto',
    },
    height: ListHeight,
    flexGrow: 1,
    marginLeft: -16,
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    height: 16,
    minWidth: 0,
  },
  item: {
    minHeight: 0,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
  },
  progressText: {
    marginTop: 0,
    marginBottom: 0,
  },
  progress: {
    width: '100%',
    height: '10',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
    marginRight: 30,
  },
  progress2: {
    width: '100%',
    height: 30,
    display: 'none',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
    marginRight: 30,
  }
}));

export default function FloorList () {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const list = [0, 1];
  // const list = [0, 1,2,3,4,5,6,7,8,9];
  return (
    <List className={classes.root}>
      {list.map(value => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem classes={{ root: classes.item }} key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemAvatar>
              {value + 1} F
            </ListItemAvatar>
            <DensityProgressBar height={(ListHeight - 16)/list.length - 8} class={classes.progress} color={'primary'} density={59}/>
            <DensityProgressBar class={classes.progress2} color={'primary'} density={59}/>
            <ListItemIcon className={classes.icon}>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
            </ListItemIcon>
          </ListItem>
        );
      })}
    </List>
  );
}
