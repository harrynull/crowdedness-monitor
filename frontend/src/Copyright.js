import React from "react";
import {Link, Typography} from "@material-ui/core";

export default function Copyright () {
  return (
    <Typography style={{marginBottom: '5em'}} variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Crowdedness Monitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
