import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        1 hour
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>1 hour</MenuItem>
        <MenuItem onClick={handleClose}>6 hours</MenuItem>
        <MenuItem onClick={handleClose}>12 hours</MenuItem>
        <MenuItem onClick={handleClose}>1 day</MenuItem>
      </Menu>
    </div>
  );
}
