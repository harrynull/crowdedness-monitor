import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {ranges} from "./Panel";

const options = [
  '1 Hour',
  '6 Hours',
  '12 Hours',
  '1 Day',
];

export default function TimeSelect(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  // CHANGE HERE FOR DEFAULT OPTION
  const [selectedIndex, setSelectedIndex] = React.useState(3);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    props.callback(index, props.id);
    setAnchorEl(null);
  };

  const handleClose = (range) => {
    setAnchorEl(null);
  };

  return (
    <div style={props.style}>
      <Button
        variant="contained"
        color="primary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        {options[selectedIndex]}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
